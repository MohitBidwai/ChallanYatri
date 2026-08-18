# ChallanYatri — API Contract

## Status

**Finalized for MVP implementation.**

This contract defines the REST boundary between the React frontend and Spring Boot backend. It is derived from the approved UX, product scope, domain model, and database schema.

## Base URL

```text
/api
```

Authentication uses JWT.

Protected endpoints require:

```http
Authorization: Bearer <JWT>
```

## API Conventions

- JSON for request/response bodies unless otherwise stated.
- RESTful resource naming.
- DTOs are used as API contracts; JPA entities are not exposed directly.
- Validation errors use a consistent error response.
- Authentication/authorization failures are handled centrally by Spring Security.
- IDs are internal numeric identifiers where appropriate; citizen-facing challan/dispute references use `challanNumber` and `disputeNumber`.

---

# 1. Authentication

## 1.1 Register

```http
POST /api/auth/register
```

### Public

No JWT required.

### Request

```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "StrongPassword123"
}
```

### Validation

- `name`: required, 2–100 characters.
- `email`: required, valid email format, unique.
- `password`: required, minimum length defined by backend security policy.

### Success

```http
201 Created
```

```json
{
  "message": "Registration successful"
}
```

Do not return the password or password hash.

### Errors

```text
400 Bad Request — validation failure
409 Conflict — email already registered
```

---

## 1.2 Login

```http
POST /api/auth/login
```

### Public

No JWT required.

### Request

```json
{
  "email": "demo@example.com",
  "password": "StrongPassword123"
}
```

### Success

```http
200 OK
```

```json
{
  "token": "<JWT>",
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@example.com",
    "role": "ROLE_USER"
  }
}
```

### Errors

```text
400 Bad Request — malformed request
401 Unauthorized — invalid credentials
```

---

# 2. Current User

## 2.1 Get Current User

```http
GET /api/users/me
```

### Protected

Requires JWT.

### Success

```http
200 OK
```

```json
{
  "id": 1,
  "name": "Demo User",
  "email": "demo@example.com",
  "role": "ROLE_USER"
}
```

---

# 3. Vehicles

Vehicle APIs are intentionally small in the MVP.

## 3.1 Get My Vehicles

```http
GET /api/vehicles/me
```

### Protected

Requires JWT.

### Success

```http
200 OK
```

```json
[
  {
    "id": 1,
    "registrationNumber": "MP09AB1234",
    "vehicleType": "CAR"
  }
]
```

## 3.2 Add Vehicle

```http
POST /api/vehicles
```

### Protected

Requires JWT.

### Request

```json
{
  "registrationNumber": "MP09AB1234",
  "vehicleType": "CAR"
}
```

### Success

```http
201 Created
```

### Errors

```text
400 Bad Request — validation failure
409 Conflict — registration number already exists
```

---

# 4. Challans

## 4.1 Find Challan by Challan Number

```http
GET /api/challans/{challanNumber}
```

### Protected

Requires JWT.

### Example

```http
GET /api/challans/CY-CH-10001
```

### Success

```http
200 OK
```

```json
{
  "challanNumber": "CY-CH-10001",
  "vehicle": {
    "registrationNumber": "MP09AB1234",
    "vehicleType": "CAR"
  },
  "violationDescription": "Speeding — 60 km/h in a 40 km/h zone",
  "fineAmount": 500.00,
  "issuedAt": "2026-08-18T10:42:00",
  "location": "MG Road, Indore",
  "status": "PENDING"
}
```

### Errors

```text
404 Not Found — challan does not exist
```

---

## 4.2 Find Challans by Vehicle Number

```http
GET /api/challans?vehicleNumber=MP09AB1234
```

### Protected

Requires JWT.

### Success

```http
200 OK
```

```json
[
  {
    "challanNumber": "CY-CH-10001",
    "violationDescription": "Speeding — 60 km/h in a 40 km/h zone",
    "fineAmount": 500.00,
    "issuedAt": "2026-08-18T10:42:00",
    "location": "MG Road, Indore",
    "status": "PENDING"
  }
]
```

### Errors

```text
400 Bad Request — invalid vehicle number
404 Not Found — no matching challans
```

---

## 4.3 Get Challan Evidence

```http
GET /api/challans/{challanNumber}/evidence
```

### Protected

Requires JWT.

### Success

```http
200 OK
```

```json
[
  {
    "id": 1,
    "type": "IMAGE",
    "fileUrl": "/demo/evidence/challan-10001.jpg",
    "description": "Simulated traffic-camera image",
    "capturedAt": "2026-08-18T10:42:00"
  }
]
```

The UI must clearly identify demo/simulated evidence.

---

# 5. Disputes

## 5.1 Create Dispute

```http
POST /api/disputes
```

### Protected

Requires JWT.

### Request

```json
{
  "challanNumber": "CY-CH-10001",
  "reason": "EVIDENCE_MISMATCH",
  "explanation": "The vehicle shown in the evidence does not match my vehicle."
}
```

### Validation

- `challanNumber`: required.
- `reason`: required and must be a supported `DisputeReason`.
- `explanation`: required and non-blank.
- Authenticated user is derived from JWT; the client must not submit `userId`.

### Success

```http
201 Created
```

```json
{
  "disputeNumber": "CY-2026-000001",
  "challanNumber": "CY-CH-10001",
  "reason": "EVIDENCE_MISMATCH",
  "explanation": "The vehicle shown in the evidence does not match my vehicle.",
  "status": "SUBMITTED",
  "submittedAt": "2026-08-19T10:42:00"
}
```

Creating the dispute must also create the initial `SUBMITTED` status-history record in the same transaction.

### Errors

```text
400 Bad Request — validation failure
404 Not Found — challan does not exist
409 Conflict — active dispute already exists when business rule prevents another one
```

---

## 5.2 Get Dispute

```http
GET /api/disputes/{disputeNumber}
```

### Protected

Requires JWT.

### Authorization

A user may retrieve only their own dispute.

### Success

```http
200 OK
```

```json
{
  "disputeNumber": "CY-2026-000001",
  "challanNumber": "CY-CH-10001",
  "reason": "EVIDENCE_MISMATCH",
  "explanation": "The vehicle shown in the evidence does not match my vehicle.",
  "status": "UNDER_REVIEW",
  "submittedAt": "2026-08-19T10:42:00",
  "updatedAt": "2026-08-19T11:10:00",
  "statusHistory": [
    {
      "status": "SUBMITTED",
      "comment": "Dispute submitted",
      "changedAt": "2026-08-19T10:42:00"
    },
    {
      "status": "UNDER_REVIEW",
      "comment": "Prototype review started",
      "changedAt": "2026-08-19T11:10:00"
    }
  ]
}
```

### Errors

```text
401 Unauthorized — missing/invalid JWT
403 Forbidden — dispute belongs to another user
404 Not Found — dispute does not exist
```

---

## 5.3 Get My Disputes

```http
GET /api/disputes/me
```

### Protected

Requires JWT.

### Success

```http
200 OK
```

```json
[
  {
    "disputeNumber": "CY-2026-000001",
    "challanNumber": "CY-CH-10001",
    "status": "UNDER_REVIEW",
    "submittedAt": "2026-08-19T10:42:00",
    "updatedAt": "2026-08-19T11:10:00"
  }
]
```

The endpoint must return only the authenticated user's disputes.

---

# 6. Dispute Evidence

## 6.1 Upload Supporting Evidence

```http
POST /api/disputes/{disputeNumber}/evidence
```

### Protected

Requires JWT.

### Content Type

```http
multipart/form-data
```

### Form fields

```text
file: <image/document>
description: "Photo showing the actual vehicle location"
```

### Rules

- Evidence is optional.
- Validate file type.
- Validate file size.
- Only the dispute owner can upload evidence.
- Do not accept executable files.
- Store only the required metadata in MySQL; actual file storage can be local/object storage for the prototype.

### Success

```http
201 Created
```

```json
{
  "id": 10,
  "disputeNumber": "CY-2026-000001",
  "fileType": "IMAGE",
  "description": "Photo showing the actual vehicle location",
  "uploadedAt": "2026-08-19T10:45:00"
}
```

### Errors

```text
400 Bad Request — invalid file/type/size
403 Forbidden — dispute belongs to another user
404 Not Found — dispute does not exist
```

---

# 7. Mock Payment

The payment path is deliberately not a real payment API.

No payment table or external payment gateway is part of the MVP.

The frontend may call a lightweight simulated action if persistence is needed later, but the initial implementation can complete the payment journey entirely as a mock flow.

No endpoint should imply that a real financial transaction has occurred.

---

# 8. Status Transition Rules

The prototype supports:

```text
SUBMITTED
    ↓
UNDER_REVIEW
    ↓
┌───────────────────────────────┐
│ MORE_INFORMATION_NEEDED       │
│ APPROVED                      │
│ REJECTED                      │
└───────────────────────────────┘
```

`MORE_INFORMATION_NEEDED` may return to `UNDER_REVIEW` after additional simulated information is supplied.

Final transition rules should be enforced in the service layer, not the controller.

Every meaningful transition must:

1. Update `disputes.status`.
2. Update `disputes.updated_at`.
3. Insert a `dispute_status_history` record.
4. Execute atomically in a transaction.

---

# 9. Error Response Contract

Use a consistent error structure across the backend.

Example:

```json
{
  "timestamp": "2026-08-19T10:42:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "One or more fields are invalid",
  "path": "/api/disputes",
  "fieldErrors": {
    "explanation": "Explanation is required"
  }
}
```

For errors without field-level validation:

```json
{
  "timestamp": "2026-08-19T10:42:00",
  "status": 404,
  "error": "Not Found",
  "message": "Challan not found",
  "path": "/api/challans/CY-CH-10001"
}
```

The exact response class can be implemented as a common DTO.

---

# 10. HTTP Status Code Policy

| Situation | Status |
|---|---:|
| Successful GET | `200 OK` |
| Successful registration | `201 Created` |
| Successful resource creation | `201 Created` |
| Invalid request | `400 Bad Request` |
| Missing/invalid authentication | `401 Unauthorized` |
| Authenticated but not allowed | `403 Forbidden` |
| Resource not found | `404 Not Found` |
| Duplicate/conflicting resource | `409 Conflict` |
| Unexpected server failure | `500 Internal Server Error` |

---

# 11. Authentication Matrix

| Endpoint | Auth |
|---|---|
| `POST /api/auth/register` | Public |
| `POST /api/auth/login` | Public |
| `GET /api/users/me` | JWT |
| `GET /api/vehicles/me` | JWT |
| `POST /api/vehicles` | JWT |
| `GET /api/challans/{challanNumber}` | JWT |
| `GET /api/challans?vehicleNumber=...` | JWT |
| `GET /api/challans/{challanNumber}/evidence` | JWT |
| `POST /api/disputes` | JWT |
| `GET /api/disputes/{disputeNumber}` | JWT + owner |
| `GET /api/disputes/me` | JWT |
| `POST /api/disputes/{disputeNumber}/evidence` | JWT + owner |

---

# 12. DTO Naming Convention

Use explicit request/response DTOs.

Suggested structure:

```text
AuthRegisterRequest
AuthLoginRequest
AuthResponse
UserResponse
VehicleRequest
VehicleResponse
ChallanResponse
EvidenceResponse
CreateDisputeRequest
DisputeResponse
DisputeSummaryResponse
DisputeEvidenceResponse
ErrorResponse
```

Avoid generic names such as `DataDTO` or exposing entity classes directly.

---

# 13. API-to-UX Mapping

```text
Find My Challan
    → GET /challans/{challanNumber}
    → GET /challans?vehicleNumber=...

Understand Challan
    → ChallanResponse

Review Evidence
    → GET /challans/{challanNumber}/evidence

Explain Dispute
    → POST /disputes

Add Supporting Evidence
    → POST /disputes/{disputeNumber}/evidence

Dispute Recorded
    → DisputeResponse

Track Dispute
    → GET /disputes/{disputeNumber}

My Disputes
    → GET /disputes/me
```

## API Design Principle

> **The API should expose exactly the capabilities needed by the approved citizen journey, with strong ownership checks, predictable errors, and no hidden government integration.**
