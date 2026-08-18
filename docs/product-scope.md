# ChallanYatri — Product Scope

## Product

**ChallanYatri** is an independent, citizen-friendly prototype focused on making the traffic challan dispute journey clearer and easier to complete.

### Product promise

> **Understand. Decide. Challenge. Track.**

The product is designed around one question:

> **“I believe this challan is wrong. Now what?”**

## MVP Goal

Demonstrate one complete, believable citizen journey from finding a traffic challan to submitting and tracking a simulated dispute.

The MVP should be small enough to finish and polish, while being complete enough to demonstrate the hackathon's end-to-end and usability expectations.

## Primary User Journey

```text
Find Challan
     ↓
Understand Challan
     ↓
Review Evidence
     ↓
Choose What To Do
   ↙             ↘
Pay             Dispute
                  ↓
             Select Reason
                  ↓
          Add Supporting Evidence
                  ↓
           Review Submission
                  ↓
            Submit Dispute
                  ↓
          Receive Dispute ID
                  ↓
            Track Status
```

The **dispute path is the hero journey** for the demo. A simple mock payment path may be included to demonstrate the alternative decision, but it must not distract from dispute resolution.

## MVP Features

### 1. Challan Lookup

Allow the user to find a simulated challan using a simple identifier such as:

- Challan number; or
- Vehicle number.

The lookup must use clearly labelled demo data.

### 2. Challan Details

Show enough information for the citizen to understand what they are being asked to resolve:

- Challan number
- Vehicle number (mock)
- Violation
- Fine amount
- Date and time
- Location
- Evidence availability
- Current challan status

### 3. Evidence Review

Allow the user to view the simulated evidence/details associated with the challan.

The UI should make it easy to compare the displayed evidence with the challan details.

If the prototype provides any automated analysis, it must be clearly presented as an assistive prototype feature and not an official determination.

### 4. Decision Point

The user should be presented with a clear choice:

- **Pay Challan**
- **Dispute Challan**

The interface should explain the choices in plain language.

### 5. Dispute Creation

Allow the user to select a dispute reason, for example:

- Wrong vehicle
- Wrong violation
- Incorrect date/time or location
- Evidence does not match
- Duplicate challan
- Other

The exact final list will be validated during UX/design work.

### 6. Supporting Evidence

Allow the user to provide:

- a written explanation; and
- optional simulated supporting evidence such as an image/document.

The prototype should validate basic file type and size requirements if upload functionality is implemented.

### 7. Dispute Submission

Before submission, show a concise review screen so the citizen can confirm what they are submitting.

On submission, generate a unique prototype dispute ID.

### 8. Dispute Tracking

Show a clear status lifecycle such as:

```text
Submitted → Under Review → Decision
```

The tracking page should communicate:

- Dispute ID
- Current status
- Submission time/date
- Status history
- Last update
- Next expected step

All authority actions and outcomes are simulated.

### 9. Mock Payment

A simple payment branch may be included for completeness:

```text
Pay Challan → Mock Payment → Confirmation
```

No real payment gateway or transaction must be used in the MVP.

## Out of Scope for MVP

The following are deliberately excluded unless the scope is later changed:

- Real government APIs
- Real e-Challan account integration
- Real payment gateway
- Real grievance submission
- Real OTP/SMS/email integration
- Full state-by-state grievance workflows
- Government authority authentication
- Legal advice or legal outcome prediction
- Production-grade identity verification
- Complete traffic-management functionality
- Microservices

## Core Screens — Initial Information Architecture

The exact visual design will be finalized separately, but the initial screen structure is:

1. **Landing / Find Challan**
2. **Challan Details**
3. **Evidence Review**
4. **Choose: Pay or Dispute**
5. **Dispute Reason**
6. **Supporting Evidence / Explanation**
7. **Review & Submit**
8. **Dispute Confirmation**
9. **Dispute Tracking**
10. **Mock Payment Confirmation** (secondary path)

The final UI may combine or split screens where this improves the user experience without changing the core journey.

## Key UX Principles

### Clarity

At every step the user should know what is happening and what action is expected.

### Trust

Never imply that simulated information or outcomes are official.

### Progressive disclosure

Show the most important information first and reveal supporting details when needed.

### Decision support

The product should help the citizen understand the consequences and next step of choosing **Pay** or **Dispute**.

### Status transparency

A submitted dispute should not feel like a black box. The prototype should show a meaningful lifecycle and explain the current state.

### Mobile-first

The primary journey should work comfortably on a mobile viewport.

## Success Criteria for the Prototype

A reviewer should be able to complete the hero journey without external explanation:

> Find a mock challan → understand why it exists → inspect evidence → decide it is incorrect → select a reason → add supporting information → submit → receive a dispute ID → track the simulated status.

The reviewer should also understand within seconds that:

- ChallanYatri is **not an official government service**;
- the displayed challan and resolution data are simulated;
- the prototype is solving the **citizen dispute/resolution journey**, not rebuilding the entire e-Challan platform.

## Future Possibilities — Not MVP Commitments

Potential future directions include:

- state-specific guidance;
- multilingual explanations;
- smarter evidence assistance;
- accessibility improvements;
- notifications;
- additional citizen traffic services;
- integrations with authorized government services if legitimate APIs become available.

These ideas should not be implemented during the MVP unless they directly improve the core demo and time permits.
