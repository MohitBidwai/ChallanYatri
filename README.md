# ChallanYatri

ChallanYatri is an independent prototype for a clear, citizen-first traffic challan dispute journey. It is not an official government service; all future demonstration data and workflows are simulated.

## Phase 1 status

This repository currently contains project initialization only: a Spring Boot backend health endpoint and a React landing page that verifies backend connectivity. Authentication, business entities, challan APIs, dispute APIs, and the complete product UX are intentionally deferred to later approved phases.

## Prerequisites

- Java 21
- Maven 3.9+
- Node.js 22+ and npm
- MySQL 8.x when running with the `mysql` Spring profile

## Configuration

Copy the appropriate example file before customizing local values. Do not commit `.env` files or real credentials.

- Root environment reference: `.env.example`
- Backend profile reference: `backend/.env.example`
- Frontend environment reference: `frontend/.env.example`

The backend starts without a database by default because Phase 1 contains no persistent domain model. To enable its MySQL configuration, supply the `DB_*` variables and run with the `mysql` profile.

## Run locally

In one terminal:

```powershell
cd backend
mvn spring-boot:run
```

In another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The landing page calls `GET http://localhost:8080/api/health`.

To run the backend with MySQL configuration:

```powershell
$env:SPRING_PROFILES_ACTIVE = "mysql"
$env:DB_URL = "jdbc:mysql://localhost:3306/challanyatri"
$env:DB_USERNAME = "your_mysql_user"
$env:DB_PASSWORD = "your_mysql_password"
cd backend
mvn spring-boot:run
```
