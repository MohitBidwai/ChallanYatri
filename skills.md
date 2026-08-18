# ChallanYatri — Development Skills & Rules

## 1. Product Identity

- **Product:** ChallanYatri
- **Purpose:** A citizen-friendly prototype that makes it easier to challenge an incorrect traffic challan and understand what happens to the dispute afterward.
- ChallanYatri is an **independent prototype** and is **not an official government service**.
- The product must never imply affiliation with, authorization by, or direct integration with any government department or traffic authority.

## 2. Core User Problem

When a citizen believes a traffic challan is incorrect, the process to understand the challan, identify the appropriate way to challenge it, submit a dispute successfully, and track what happens afterward can be fragmented and difficult to navigate.

The core user question is:

> **“I believe this challan is wrong. Now what?”**

## 3. MVP User Journey

The MVP focuses on one complete journey:

1. Find a challan.
2. Understand the challan and violation details.
3. Review available evidence.
4. Decide whether to pay or dispute.
5. If disputing, select a reason.
6. Provide supporting information/evidence.
7. Submit the dispute.
8. Receive a dispute ID/confirmation.
9. Track the dispute status and history.

Do not expand the MVP into a complete replacement for the government e-Challan ecosystem.

## 4. Scope Discipline

- Do not add features merely because they are technically interesting.
- Every feature must support the core citizen journey or materially improve usability, trust, accessibility, or the hackathon judging criteria.
- Do not build real government integrations unless explicitly approved later.
- Do not build real payment processing.
- Do not submit real grievances to government authorities.
- Do not attempt to reproduce every state/authority workflow in the MVP.
- Prefer a polished, complete journey over a large collection of incomplete features.

## 5. Honesty & Mock Data

This project must be transparent about what is real and what is simulated.

- Challan records used in the prototype are mock/simulated unless a future implementation explicitly establishes a legitimate data source.
- Payment is simulated.
- Government/authority review is simulated.
- Dispute resolution is simulated.
- Evidence analysis, if implemented with AI or rules, must be clearly labelled as prototype assistance and must not be presented as an official determination.
- Use visible disclosures where appropriate, such as:
  - `Independent prototype — Not an official government service.`
  - `Demo data — This challan is simulated.`
  - `Mock payment — No real transaction will be processed.`
- Never fabricate successful communication with a government authority.

## 6. Technology Stack

### Frontend

- React.js
- Tailwind CSS
- React Router where routing is required
- Axios for API communication where appropriate

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA / Hibernate
- Bean Validation
- MySQL
- Lombok only where it improves readability and maintainability

### Architecture

- Use a **modular monolith**, not microservices, for the MVP.
- Backend follows clear separation of concerns:
  - Controller
  - Service
  - Repository
  - Entity
  - DTO
- Keep domain modules logically separated, e.g. challan, dispute, evidence, and common functionality.
- Do not put business logic in controllers.
- Do not expose JPA entities directly as API contracts when a DTO is appropriate.

## 7. Backend Rules

- Use RESTful API conventions.
- Validate incoming request data.
- Use meaningful HTTP status codes.
- Implement centralized/global exception handling.
- Return consistent API error responses.
- Keep business rules in services/domain logic.
- Use transactions deliberately for operations that must be atomic.
- Avoid premature abstractions.
- Avoid unnecessary design patterns or frameworks.
- Never hardcode secrets, credentials, API keys, or environment-specific configuration.

## 8. Database Rules

- MySQL is the primary relational database for the MVP.
- Design the domain model before finalizing the schema.
- Avoid creating tables/entities solely because they might be useful later.
- Use appropriate primary keys, foreign keys, constraints, and indexes.
- Preserve dispute status history rather than overwriting important lifecycle information.
- Database design must support the demonstrated user journey and remain simple enough to maintain during the hackathon.

## 9. Frontend & UX Rules

- Mobile-first design is strongly preferred because the citizen journey should work well on phones.
- Prioritize clarity over visual complexity.
- The interface should feel like a modern citizen-service product, not a reskin of an existing government portal.
- Make the primary action obvious at every step.
- Use plain language instead of unnecessary technical/legal terminology.
- Clearly distinguish:
  - Pay
  - Dispute
  - Understand
  - Track status
- Provide useful loading, empty, validation, error, and success states.
- Do not hide important information behind unnecessary navigation.
- Maintain accessible contrast, readable typography, keyboard-friendly interactions, and sensible form labels.
- Avoid excessive animations or decorative UI that does not improve the journey.

## 10. Product & Design Principles

The product should consistently answer four questions for the citizen:

1. **What happened?**
2. **What are my options?**
3. **What do I need to do?**
4. **What happens next?**

The design should reduce uncertainty, not merely reduce the number of clicks.

## 11. AI / Intelligent Features

AI may be used only where it provides meaningful user value.

Potential examples include:

- explaining a violation in simpler language,
- helping a citizen understand dispute reasons,
- summarizing evidence supplied by the citizen,
- identifying possible inconsistencies as a prototype aid.

AI must not:

- claim to make an official legal determination,
- claim that a challan is definitively invalid,
- fabricate evidence,
- fabricate government responses,
- replace the citizen's decision.

If AI is used, its role and limitations must be clear in the UI and documentation.

## 12. Codex / AI-Assisted Development Rules

- **Do not start implementation until the product scope, user journey, architecture, and API/domain decisions have been reviewed and approved.**
- Before making large changes, inspect the existing repository structure and relevant files.
- Do not overwrite or delete existing work without explicit justification.
- Make small, coherent changes that can be reviewed and tested.
- Do not introduce new dependencies without explaining why they are needed.
- Do not silently change the agreed architecture or technology stack.
- Do not expand scope without approval.
- When requirements are ambiguous, stop and ask rather than inventing major product behavior.
- After implementation, explain what changed and how it was tested.

## 13. Testing & Quality

At minimum, important backend business rules should have tests.

Prioritize tests around:

- challan lookup,
- dispute creation,
- dispute validation,
- dispute status transitions,
- evidence handling,
- invalid requests,
- error handling.

Frontend should be manually tested through the complete demo journey, including failure states.

## 14. Security & Privacy

- Never commit secrets or credentials.
- Do not use real citizens' personal information in demo data.
- Use synthetic/mock vehicle numbers, challan numbers, names, phone numbers, and evidence.
- Treat uploaded evidence as potentially sensitive even in the prototype.
- Do not store unnecessary personal information.
- Validate uploaded files and restrict file types/size where file upload is implemented.

## 15. Git & Repository Rules

- Keep commits focused and meaningful.
- Use clear commit messages.
- Do not commit generated build artifacts, IDE metadata, secrets, or local environment files.
- Keep documentation updated when major product or architecture decisions change.
- `main` should remain in a runnable/credible state.

## 16. Definition of Done for the MVP

The MVP is considered complete only when a user can successfully demonstrate:

`Find Challan → Understand → Review Evidence → Choose Dispute → Provide Reason/Evidence → Submit → Receive Dispute ID → Track Status`

The journey should work end-to-end using clearly disclosed mock data, with polished UX and appropriate error/success states.

## 17. Decision Priority

When making implementation decisions, prioritize in this order:

1. Citizen problem and user value
2. Complete working journey
3. Usability and accessibility
4. Trust and transparency
5. Maintainable architecture
6. Security and correctness
7. Visual polish
8. Technical sophistication

**Do not optimize for complexity. Optimize for a convincing, trustworthy, end-to-end citizen experience.**
