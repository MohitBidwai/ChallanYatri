# ChallanYatri — Implementation Decisions

## Status

**Finalized before implementation.**

This document locks the implementation baseline for the first coding phase. Changes should be deliberate and documented rather than introduced ad hoc during development.

## 1. Repository Structure

Use a single repository with two application folders:

```text
ChallanYatri/
├── backend/
├── frontend/
├── docs/
├── skills.md
└── README.md
```

The backend and frontend remain independently runnable while sharing one repository and one product documentation set.

## 2. Backend Stack

### Language

- Java 21 LTS

### Framework

- Spring Boot **4.1.0**
- Spring Framework 7.x through Spring Boot dependency management

Spring Boot 4.1.0 is the current stable Spring Boot release at the time this document is finalized. It requires Java 17+ and supports Java 21. citeturn0search0turn0search11

### Build tool

- Maven

Use the Spring Boot parent/BOM for dependency version management. Do not manually version Spring-managed dependencies unless there is an explicit reason.

### Database

- MySQL 8.x-compatible relational database
- Spring Data JPA
- Hibernate through Spring Boot

### Web/API

- Spring Web MVC
- REST/JSON APIs
- Bean Validation

### Security

- Spring Security 7.x through Spring Boot 4.1 dependency management
- JWT-based stateless authentication
- BCrypt password hashing
- Nimbus JWT support through the Spring Security ecosystem rather than adding a second JWT stack unless implementation requirements prove otherwise

Spring Security 7.x is the current stable generation, and Spring Boot provides the standard `spring-boot-starter-security` integration. citeturn1search3turn1search0

### Utilities

- Lombok: allowed, but use it selectively
- Spring Boot Actuator: include only if health/observability is useful for deployment/demo; it is not part of the core domain

## 3. Backend Dependencies

Initial dependency set:

```text
spring-boot-starter-webmvc
spring-boot-starter-validation
spring-boot-starter-data-jpa
spring-boot-starter-security
mysql-connector-j
lombok
spring-boot-starter-test
spring-security-test
```

JWT support should use the Spring Security/Nimbus stack available through the selected Spring Boot/Security versions.

Do not add Redis, Kafka, Docker orchestration, Elasticsearch, MapStruct, ModelMapper, or cloud SDKs during project initialization. Add infrastructure only when an approved feature actually requires it.

## 4. Backend Package Structure

Base package:

```text
com.challanyatri
```

Recommended modular-monolith structure:

```text
com.challanyatri
├── ChallanYatriApplication.java
│
├── common
│   ├── exception
│   ├── response
│   └── validation
│
├── security
│   ├── config
│   ├── jwt
│   └── service
│
├── auth
│   ├── controller
│   ├── dto
│   └── service
│
├── user
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
├── vehicle
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
├── challan
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
└── dispute
    ├── controller
    ├── dto
    ├── entity
    ├── repository
    └── service
```

### Why feature-oriented modules?

The project is a modular monolith. Keeping each business capability together makes the boundaries clear while avoiding microservice complexity.

## 5. Entity Rules

Entities must map to the finalized database model:

```text
User
Vehicle
Challan
Evidence
Dispute
DisputeEvidence
DisputeStatusHistory
```

Rules:

- Use `@Entity` classes only for persistence.
- Use DTOs at API boundaries.
- Use `@Enumerated(EnumType.STRING)` for enums.
- Prefer `Long`/`BIGINT` IDs.
- Use `BigDecimal` for money.
- Use `Instant`/appropriate Java time types for timestamps rather than `java.util.Date`.
- Avoid bidirectional relationships unless they are actually needed by the service/query layer; unnecessary bidirectional mappings can complicate serialization and persistence.
- Do not expose entity graphs directly through controllers.

## 6. DTO Strategy

Use explicit request/response DTOs.

Examples:

```text
RegisterRequest
LoginRequest
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

No generic `DTO` classes that mix request and response concerns.

## 7. Service Layer

Controllers should be thin.

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Business rules belong in services/domain logic.

Examples:

- dispute ownership checks
- duplicate active-dispute checks
- status transition validation
- dispute history creation
- challan/user association
- validation beyond simple field constraints

## 8. Transactions

Use `@Transactional` at service boundaries where an operation changes multiple related records atomically.

The following must be atomic:

```text
Create dispute
    → save dispute
    → save SUBMITTED history
```

and:

```text
Change dispute status
    → update dispute status
    → update updatedAt
    → save status-history record
```

Do not use `@Transactional` indiscriminately on every method.

## 9. Global Exception Handling

Use one centralized `@RestControllerAdvice`.

Handle at least:

- validation errors
- resource not found
- duplicate/conflict errors
- authentication/authorization errors where appropriate
- invalid status transitions
- unexpected exceptions

Return the error structure defined in `docs/api-contract.md`.

## 10. Frontend Stack

### Framework

- React **19.2**

React 19.2 is the current documented latest major version. citeturn0search13

### Build tool

- Vite **8.1**

Vite 8.1 is the current stable release documented by the Vite project as of June 2026. citeturn1search6

### Styling

- Tailwind CSS **4.3.x**

Tailwind CSS 4.3 is the current documented release line as of May 2026. citeturn1search12

### Routing

- React Router

Use routing only where it maps to actual application screens.

### HTTP

- Axios

Use a single configured Axios instance for API communication and authentication headers.

### Icons

- `lucide-react`

Use icons sparingly and consistently.

## 11. Frontend Structure

Recommended:

```text
frontend/src/
├── api/
│   ├── axios.js
│   ├── authApi.js
│   ├── challanApi.js
│   └── disputeApi.js
│
├── assets/
├── components/
│   ├── common/
│   ├── challan/
│   ├── dispute/
│   └── layout/
│
├── pages/
│   ├── auth/
│   ├── challan/
│   └── dispute/
│
├── routes/
├── hooks/
├── context/
├── utils/
├── App.jsx
└── main.jsx
```

Keep components reusable where there is actual reuse. Do not create a component for every tiny `<div>`.

## 12. Frontend State Management

Do **not** add Redux for the MVP.

Use:

- React Context for authentication/session state where needed.
- Local component state for form/UI state.
- API calls through Axios.

If server-state complexity becomes significant, a dedicated data-fetching library can be considered later, but it is not part of initialization.

## 13. Authentication Architecture

```text
React Login
    ↓
POST /api/auth/login
    ↓
Spring Security authenticates credentials
    ↓
JWT issued
    ↓
Frontend stores session/token according to implementation security decision
    ↓
Axios sends Authorization header
    ↓
Spring Security validates JWT
    ↓
Protected controller
```

For the initial browser implementation, do not store tokens in insecure long-lived global variables. The exact storage mechanism should be chosen during authentication implementation with XSS/CSRF implications documented.

## 14. CORS

During local development:

```text
Frontend: Vite development server
Backend: Spring Boot server
```

Configure a narrow allowed origin for the frontend development URL rather than `*` when credentials/authentication are involved.

Do not commit environment-specific origins as scattered string literals across the codebase.

## 15. Configuration

Use environment variables / external configuration for:

- database URL
- database username
- database password
- JWT signing secret/key material
- allowed frontend origin

Provide a safe example configuration such as:

```text
.env.example
```

Never commit real credentials.

## 16. Local Ports

Initial development defaults:

```text
Backend: 8080
Frontend: 5173
MySQL: 3306
```

If a port conflict occurs, change it deliberately and document the change.

## 17. Development Phases

### Phase 1 — Project initialization

Create only:

- Spring Boot backend
- React/Vite frontend
- Maven/npm configuration
- base packages/folders
- environment examples
- README setup instructions
- health/root endpoint

**Do not implement the complete business domain in this phase.**

### Phase 2 — Authentication

- User entity/repository
- register
- login
- BCrypt
- JWT
- Spring Security
- current-user endpoint
- protected test endpoint

### Phase 3 — Challan

- Vehicle
- Challan
- Evidence
- lookup APIs
- details/evidence UI

### Phase 4 — Dispute

- Dispute
- DisputeEvidence
- create dispute
- upload evidence
- validation
- ownership

### Phase 5 — Tracking

- DisputeStatusHistory
- status transitions
- timeline UI
- mock outcomes

### Phase 6 — Polish & demo

- responsive UX
- error/empty states
- loading states
- accessibility
- seed/demo data
- testing
- deployment

## 18. Explicit Non-Decisions

Do not introduce the following during initialization:

- Microservices
- API Gateway
- Kafka
- Redis
- Kubernetes
- Docker Compose requirement
- Service discovery
- Config server
- OAuth/social login
- Admin dashboard
- Real government APIs
- Real payment gateway
- AI integration

These can be considered later only if a concrete product requirement justifies them.

## 19. Coding Standard

- Prefer clear Java over clever Java.
- Use meaningful names.
- Keep controllers thin.
- Avoid giant service classes.
- Avoid duplicated validation/business rules.
- Keep API contracts aligned with `docs/api-contract.md`.
- Keep database mappings aligned with `docs/database-schema.md`.
- Keep product behavior aligned with `docs/product-scope.md` and `docs/ux-spec.md`.
- Do not change architecture silently.

## 20. Initialization Acceptance Criteria

The first implementation phase is complete when:

- Backend starts successfully.
- Frontend starts successfully.
- Backend can connect to MySQL using environment configuration.
- Frontend can reach a backend health/root endpoint.
- CORS is configured for local development.
- No secrets are committed.
- Project structure matches this document.
- No business feature has been implemented prematurely.

## Decision Summary

| Area | Decision |
|---|---|
| Architecture | Modular monolith |
| Backend | Spring Boot 4.1.0 |
| Java | 21 LTS |
| Build | Maven |
| Database | MySQL |
| Persistence | Spring Data JPA / Hibernate |
| Security | Spring Security 7.x + JWT + BCrypt |
| JWT implementation | Spring Security/Nimbus |
| Frontend | React 19.2 |
| Bundler | Vite 8.1 |
| CSS | Tailwind CSS 4.3.x |
| Routing | React Router |
| HTTP client | Axios |
| Icons | lucide-react |
| State | React Context + local state |
| Global state library | None initially |
| API style | REST/JSON |
| Auth role | ROLE_USER |
| Payment | Mock only |
| Government integration | None |
