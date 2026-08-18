# ChallanYatri — Database Schema & ER Design

## Status

**Finalized for MVP.**

This schema is derived from the finalized domain model and approved UX/product scope. It supports authentication, challan lookup, evidence review, dispute creation, supporting evidence, and dispute status tracking without introducing unnecessary persistence.

## 1. ER Diagram

```text
┌──────────────┐
│    users     │
├──────────────┤
│ PK id        │
│    name      │
│ UQ email     │
│    password  │
│    role      │
│    created_at│
│    updated_at│
└──────┬───────┘
       │ 1
       │
       │ *
┌──────▼───────┐
│   vehicles   │
├──────────────┤
│ PK id        │
│ FK user_id   │
│ UQ reg_no    │
│    type      │
└──────┬───────┘
       │ 1
       │
       │ *
┌──────▼───────┐
│   challans   │
├──────────────┤
│ PK id        │
│ UQ number    │
│ FK vehicle_id│
│    violation │
│    fine_amt  │
│    issued_at │
│    location  │
│    status    │
└───┬──────┬───┘
    │      │
    │ 1    │ 1
    │      │
    │ *    │ *
┌───▼──────┐ ┌─▼─────────────┐
│ evidence │ │   disputes    │
├──────────┤ ├───────────────┤
│ PK id    │ │ PK id         │
│ FK challan││ UQ number      │
│ type     │ │ FK challan_id  │
│ file_url │ │ FK user_id     │
│ descript.│ │ reason         │
│ captured │ │ explanation    │
└──────────┘ │ status        │
             │ submitted_at  │
             │ updated_at    │
             └───┬───────┬───┘
                 │       │
                 │ 1     │ 1
                 │       │
                 │ *     │ *
        ┌────────▼───┐ ┌─▼──────────────────┐
        │ dispute_   │ │ dispute_status_    │
        │ evidence   │ │ history            │
        ├────────────┤ ├────────────────────┤
        │ PK id      │ │ PK id              │
        │ FK dispute │ │ FK dispute_id      │
        │ file_url   │ │ status             │
        │ file_type  │ │ comment            │
        │ description│ │ changed_at         │
        │ uploaded_at│ └────────────────────┘
        └────────────┘
```

## 2. Tables

### `users`

| Column | Type | Null | Key / Constraint | Description |
|---|---|---:|---|---|
| `id` | BIGINT | NO | PK | Internal user ID |
| `name` | VARCHAR(100) | NO | | Display name |
| `email` | VARCHAR(150) | NO | UNIQUE | Login identifier |
| `password` | VARCHAR(255) | NO | | BCrypt password hash |
| `role` | VARCHAR(30) | NO | | MVP role, e.g. `ROLE_USER` |
| `created_at` | DATETIME | NO | | Account creation time |
| `updated_at` | DATETIME | NO | | Last account update |

### `vehicles`

| Column | Type | Null | Key / Constraint | Description |
|---|---|---:|---|---|
| `id` | BIGINT | NO | PK | Internal vehicle ID |
| `user_id` | BIGINT | NO | FK → users.id | Vehicle owner/account |
| `registration_number` | VARCHAR(20) | NO | UNIQUE | Vehicle registration number |
| `vehicle_type` | VARCHAR(50) | YES | | Car, bike, etc. |

### `challans`

| Column | Type | Null | Key / Constraint | Description |
|---|---|---:|---|---|
| `id` | BIGINT | NO | PK | Internal challan ID |
| `challan_number` | VARCHAR(50) | NO | UNIQUE | Public/demo challan reference |
| `vehicle_id` | BIGINT | NO | FK → vehicles.id | Vehicle associated with challan |
| `violation_description` | VARCHAR(255) | NO | | Plain-language violation |
| `fine_amount` | DECIMAL(10,2) | NO | | Simulated fine amount |
| `issued_at` | DATETIME | NO | | Challan issue timestamp |
| `location` | VARCHAR(255) | NO | | Recorded location |
| `status` | VARCHAR(30) | NO | | `PENDING`, `PAID`, `DISPUTED` |

### `evidence`

| Column | Type | Null | Key / Constraint | Description |
|---|---|---:|---|---|
| `id` | BIGINT | NO | PK | Evidence ID |
| `challan_id` | BIGINT | NO | FK → challans.id | Source challan |
| `type` | VARCHAR(30) | NO | | `IMAGE` / `DOCUMENT` |
| `file_url` | VARCHAR(500) | NO | | Storage/reference location |
| `description` | VARCHAR(500) | YES | | Evidence description |
| `captured_at` | DATETIME | YES | | Evidence capture timestamp |

### `disputes`

| Column | Type | Null | Key / Constraint | Description |
|---|---|---:|---|---|
| `id` | BIGINT | NO | PK | Internal dispute ID |
| `dispute_number` | VARCHAR(50) | NO | UNIQUE | Citizen-facing dispute ID |
| `challan_id` | BIGINT | NO | FK → challans.id | Challan being disputed |
| `user_id` | BIGINT | NO | FK → users.id | Authenticated citizen |
| `reason` | VARCHAR(50) | NO | | `DisputeReason` enum value |
| `explanation` | TEXT | NO | | Citizen's explanation |
| `status` | VARCHAR(50) | NO | | Latest `DisputeStatus` |
| `submitted_at` | DATETIME | NO | | Submission timestamp |
| `updated_at` | DATETIME | NO | | Last dispute update |

### `dispute_evidence`

| Column | Type | Null | Key / Constraint | Description |
|---|---|---:|---|---|
| `id` | BIGINT | NO | PK | Supporting evidence ID |
| `dispute_id` | BIGINT | NO | FK → disputes.id | Parent dispute |
| `file_url` | VARCHAR(500) | NO | | Storage/reference location |
| `file_type` | VARCHAR(30) | NO | | Image/document type |
| `description` | VARCHAR(500) | YES | | Citizen-provided description |
| `uploaded_at` | DATETIME | NO | | Upload timestamp |

### `dispute_status_history`

| Column | Type | Null | Key / Constraint | Description |
|---|---|---:|---|---|
| `id` | BIGINT | NO | PK | History record ID |
| `dispute_id` | BIGINT | NO | FK → disputes.id | Parent dispute |
| `status` | VARCHAR(50) | NO | | Status after transition |
| `comment` | VARCHAR(500) | YES | | Explanation of status change |
| `changed_at` | DATETIME | NO | | Transition timestamp |

## 3. Relationships & Cardinality

```text
users 1 ───── * vehicles
vehicles 1 ───── * challans
challans 1 ───── * evidence
users 1 ───── * disputes
challans 1 ───── * disputes
disputes 1 ───── * dispute_evidence
disputes 1 ───── * dispute_status_history
```

## 4. Important Constraints

### User

- `users.email` must be unique.
- Email should be normalized consistently by the application.
- Password must be a BCrypt hash.

### Vehicle

- `registration_number` must be unique in the MVP.
- `user_id` is mandatory.

### Challan

- `challan_number` must be unique.
- `vehicle_id` is mandatory.
- `fine_amount >= 0`.

### Evidence

- `challan_id` is mandatory.
- File type must be one of the supported enum values.

### Dispute

- `dispute_number` must be unique.
- `user_id` and `challan_id` are mandatory.
- `reason` and `explanation` are mandatory for submission.
- `status` must use the defined enum values.

### Dispute Evidence

- `dispute_id` is mandatory.
- Supporting evidence is optional at the dispute level, so a dispute can exist without child records here.

### Status History

- Every meaningful dispute status transition should create a history record.
- The current `disputes.status` should always correspond to the latest meaningful state.

## 5. Indexing Strategy

Primary lookup and tracking paths should be indexed.

### Unique indexes

- `users.email`
- `vehicles.registration_number`
- `challans.challan_number`
- `disputes.dispute_number`

### Foreign-key / query indexes

- `vehicles.user_id`
- `challans.vehicle_id`
- `evidence.challan_id`
- `disputes.user_id`
- `disputes.challan_id`
- `dispute_evidence.dispute_id`
- `dispute_status_history.dispute_id`

For status-history retrieval, a composite index such as `(dispute_id, changed_at)` is appropriate if needed by the chosen JPA/database implementation.

## 6. Enum Storage

For the MVP, Java enums may be persisted as strings using JPA `@Enumerated(EnumType.STRING)`.

Do **not** store ordinal enum values because changing enum order can corrupt the meaning of existing records.

## 7. Delete / Update Behavior

The MVP should avoid accidental cascade deletion of important dispute history.

Recommended application behavior:

- A challan with a dispute should not be casually deleted.
- Dispute status history should be retained for the lifetime of the dispute.
- Evidence deletion should be deliberate and validated.
- Use service-layer business rules rather than relying solely on database cascades.

## 8. Mock Data Boundary

All demo challans, vehicles, evidence, users, and simulated dispute outcomes should use synthetic data.

The schema does not imply a live connection to government systems.

## 9. Authentication Boundary

Spring Security/JWT does not require a separate database entity for JWT access tokens in this MVP.

Authentication uses:

```text
users.email
users.password (BCrypt hash)
users.role
```

The JWT is stateless and contains the claims required by the application, such as user identity and role.

## 10. Mock Payment Boundary

There is deliberately **no `payments` table** in the MVP schema.

The payment branch is a simulated UI/application flow. A persistent payment domain should only be introduced if the product scope later requires transaction history.

## 11. Schema-to-UX Mapping

| User action | Tables used |
|---|---|
| Register | `users` |
| Login | `users` |
| View user's vehicles | `users`, `vehicles` |
| Find challan | `challans`, `vehicles` |
| View challan | `challans`, `vehicles` |
| Review original evidence | `evidence`, `challans` |
| Create dispute | `disputes`, `users`, `challans` |
| Add supporting evidence | `dispute_evidence` |
| Submit dispute | `disputes`, `dispute_status_history` |
| Generate dispute ID | `disputes.dispute_number` |
| Track dispute | `disputes`, `dispute_status_history` |
| My disputes | `disputes`, `challans` |

## 12. Database Design Principle

> **Keep the schema relational, explicit, and small enough to support the complete demo without creating infrastructure for features that are outside the MVP.**
