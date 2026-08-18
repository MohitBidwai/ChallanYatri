# ChallanYatri — Final Domain Model

## Status

**Finalized for MVP architecture.**

The domain model supports the approved end-to-end journey: authenticated citizen → find challan → understand/review evidence → dispute → submit supporting information → receive dispute ID → track dispute lifecycle.

The project remains a **modular Spring Boot monolith**. The model is intentionally limited to entities required for the MVP.

## Domain Overview

```text
User
 │
 │ 1
 │
 │ *
Vehicle
 │
 │ 1
 │
 │ *
Challan
 │
 ├────────────── * Evidence
 │
 └────────────── * Dispute
                         │
                         ├──────── * DisputeEvidence
                         │
                         └──────── * DisputeStatusHistory
```

## 1. User

Represents an authenticated ChallanYatri citizen account.

```text
User
----
id
name
email
password
role
createdAt
updatedAt
```

### Purpose

- Registration/login
- JWT-based authentication
- Associate disputes with the authenticated citizen
- Provide a personalized “My Disputes” experience

### Rules

- Password is never stored in plaintext.
- Passwords are stored using BCrypt hashing.
- Email must be unique.
- MVP role: `ROLE_USER`.
- Admin functionality is intentionally excluded unless explicitly added later.

## 2. Vehicle

Represents a vehicle associated with a citizen and/or simulated challan records.

```text
Vehicle
-------
id
registrationNumber
vehicleType
user
```

### Rules

- Registration number should be unique where appropriate for the prototype.
- A user may have multiple vehicles.
- Vehicle data in the demo must be synthetic/mock data.

## 3. Challan

The central object representing a traffic challan shown in the prototype.

```text
Challan
-------
id
challanNumber
vehicle
violationDescription
fineAmount
issuedAt
location
status
```

### Purpose

- Challan lookup
- Challan details
- Evidence review
- Pay/dispute decision

### Rules

- `challanNumber` must be unique.
- Fine amount must not be negative.
- Challan data is simulated unless a legitimate authorized integration is explicitly introduced later.

## 4. Evidence

Represents evidence/details associated with the original challan.

```text
Evidence
--------
id
challan
type
fileUrl
description
capturedAt
```

### Examples

- Simulated traffic-camera image
- Other evidence supplied as part of the original challan record

### Rules

- Evidence belongs to a challan.
- Demo evidence must be clearly identified as simulated where appropriate.

## 5. Dispute

The primary business entity for ChallanYatri.

```text
Dispute
-------
id
disputeNumber
challan
user
reason
explanation
status
submittedAt
updatedAt
```

### Purpose

Represents the citizen's attempt to challenge a challan through the ChallanYatri prototype.

### Rules

- A dispute belongs to one authenticated user.
- A dispute belongs to one challan.
- `disputeNumber` must be unique.
- A dispute must have a reason.
- A dispute must have an explanation before submission.
- The current status represents the latest state; historical states are stored separately in `DisputeStatusHistory`.

## 6. DisputeEvidence

Represents supporting evidence submitted by the citizen as part of a dispute.

```text
DisputeEvidence
---------------
id
dispute
fileUrl
fileType
description
uploadedAt
```

### Important distinction

`Evidence` and `DisputeEvidence` are intentionally separate:

- `Evidence` = evidence associated with the original challan.
- `DisputeEvidence` = evidence supplied by the citizen to support the dispute.

### Rules

- Supporting evidence is optional.
- Uploaded files must be validated for supported type and size.
- Demo uploads must not contain real sensitive personal information.

## 7. DisputeStatusHistory

Preserves the lifecycle of a dispute instead of overwriting previous states.

```text
DisputeStatusHistory
--------------------
id
dispute
status
comment
changedAt
```

### Purpose

Supports the Track Dispute timeline.

Example:

```text
SUBMITTED
    ↓
UNDER_REVIEW
    ↓
MORE_INFORMATION_NEEDED
    ↓
APPROVED / REJECTED
```

Not every dispute must pass through every state.

## Enums

### ChallanStatus

```text
PENDING
PAID
DISPUTED
```

### DisputeReason

```text
WRONG_VEHICLE
WRONG_VIOLATION
EVIDENCE_MISMATCH
WRONG_DATE_OR_LOCATION
DUPLICATE_CHALLAN
OTHER
```

### DisputeStatus

```text
SUBMITTED
UNDER_REVIEW
MORE_INFORMATION_NEEDED
APPROVED
REJECTED
```

### EvidenceType

```text
IMAGE
DOCUMENT
```

## Relationships

### User → Vehicle

```text
User 1 ───── * Vehicle
```

A user may have multiple vehicles.

### Vehicle → Challan

```text
Vehicle 1 ───── * Challan
```

A vehicle can have multiple challans.

### Challan → Evidence

```text
Challan 1 ───── * Evidence
```

A challan can have zero or more evidence records.

### User → Dispute

```text
User 1 ───── * Dispute
```

A user can create multiple disputes over time.

### Challan → Dispute

```text
Challan 1 ───── * Dispute
```

The model permits multiple dispute records against a challan, but the service layer should enforce the MVP's intended business rule around whether a user may create another active dispute for the same challan.

### Dispute → DisputeEvidence

```text
Dispute 1 ───── * DisputeEvidence
```

Supporting evidence is optional.

### Dispute → DisputeStatusHistory

```text
Dispute 1 ───── * DisputeStatusHistory
```

Every meaningful status transition creates a history record.

## Deliberately Excluded Entities

The following are **not** part of the finalized MVP domain model:

- Payment
- GovernmentAuthority
- StateWorkflow
- OTP
- Notification
- GovernmentAPI
- Admin
- RefreshToken
- LegalCase

### Why

The MVP's payment flow is explicitly mock, and government/authority actions are simulated. Adding persistence and infrastructure for those concepts would increase complexity without improving the hero dispute journey.

Authentication is included because ChallanYatri is intended to be a complete end-to-end application and authenticated users benefit from personalized dispute tracking.

## Authentication Boundary

Spring Security/JWT is part of the application architecture but is not itself a business-domain entity.

Authentication components will include concepts such as:

```text
SecurityConfig
JwtService
JwtAuthenticationFilter
PasswordEncoder
AuthenticationManager
```

These belong to the security/configuration layer, not the domain model.

## Domain-to-UX Mapping

| UX capability | Domain objects |
|---|---|
| Register/Login | User |
| Find challan | Vehicle, Challan |
| Understand challan | Challan |
| Review evidence | Evidence |
| Pay/dispute decision | Challan, User |
| Create dispute | User, Challan, Dispute |
| Select reason | DisputeReason |
| Add supporting evidence | DisputeEvidence |
| Submit | Dispute |
| Generate dispute ID | Dispute.disputeNumber |
| Track status | Dispute, DisputeStatusHistory |

## Domain Design Principle

> **Model only what the approved citizen journey needs, while keeping the boundaries clean enough to evolve later.**

The model intentionally supports an end-to-end application without turning the hackathon MVP into an oversized government-service platform.
