# ChallanYatri — UX Specification

## Status

**Approved direction:** Direction 2 — Bold & Empowering, refined for ChallanYatri's actual product problem.

This specification is the bridge between the product scope and implementation. It defines the core screens, interaction model, content hierarchy, and UX rules before frontend development begins.

## 1. UX Goal

ChallanYatri should make the citizen's next step obvious when they believe a traffic challan is incorrect.

The interface should answer four questions at every stage:

1. **What happened?**
2. **What can I do?**
3. **What do you need from me?**
4. **What happens next?**

The experience should feel like a modern civic-tech product, not a visual reskin of an existing government portal.

## 2. Hero Journey

```text
Find Challan
     ↓
Understand Challan
     ↓
Review Evidence
     ↓
Choose: Pay or Dispute
     ↓
Explain Dispute
     ↓
Add Optional Evidence
     ↓
Review Submission
     ↓
Submit
     ↓
Dispute ID
     ↓
Track Status
```

The dispute path is the primary demo journey. Payment is a secondary branch.

## 3. Visual Direction

Use **Direction 2: Bold & Empowering** as the visual starting point, but avoid excessive SaaS-style decoration.

### Character

- Modern
- Confident
- Trustworthy
- Clear
- Civic-tech oriented
- Mobile-first

### Avoid

- Copying the official e-Challan portal
- Dense service directories
- Large notice-board sections
- Excessive gradients
- Excessive shadows
- Decorative UI that competes with the primary action
- Government-looking banners that could imply official affiliation

## 4. Color System

### Primary

- Deep green: `#0D5E47`
- Secondary green: `#137D5F`

Use for primary actions, active navigation, key headings, and brand elements.

### Supporting colors

- Off-white / warm neutral backgrounds
- Amber for pending/action-needed states
- Blue for informational states
- Red only for errors/rejections
- Green for successful/completed states

Do not rely on color alone to communicate status; always pair status color with text and/or an icon.

## 5. Typography & Layout

- Mobile-first
- Maximum content width approximately 380–420px for the primary mobile experience
- Minimum interactive target: 44px
- Generous spacing between sections
- Card radius around 10–14px
- Clear visual hierarchy
- Body text around 16px for important content
- Avoid very small text for critical information

Desktop layouts may use additional horizontal space, but the primary journey must remain excellent on mobile.

# 6. Screen Specifications

## Screen 1 — Find My Challan

### Goal

Give the citizen one obvious way to start without forcing them to understand the underlying government service structure.

### Hero copy

**Got a challan? Let's figure out what to do next.**

Supporting copy:

> Find your challan to understand what happened, review the details, and choose what to do next.

### Inputs

Primary lookup options:

- Challan number
- Vehicle registration number

Use a simple toggle/tab or clearly separated option. Do not require both.

### Primary CTA

**Find my challan**

### Helper content

> Don't have the challan number? Search using your vehicle registration number.

### Important

Do **not** require a phone number in the MVP unless a later product decision establishes a clear user-value reason.

### Prototype disclosure

Visible but unobtrusive:

> Independent prototype · Demo data only

### States

- Empty
- Valid input
- Invalid format
- No challan found
- Loading
- Server error

---

## Screen 2 — Understand Your Challan

### Goal

Give the citizen enough context to make an informed decision.

### Top section

Show:

- Challan status
- Challan/reference number
- Fine amount

### Main information

- Violation in plain language
- Date and time
- Location
- Vehicle registration
- Issuing authority/department when available in the mock data

Example:

> **Speeding — 60 km/h in a 40 km/h zone**

Avoid technical violation codes as the primary description.

### Evidence entry point

A prominent section:

**Evidence**

> Review the evidence associated with this challan.

CTA:

**View evidence**

### Decision section

Headline:

**What do you want to do?**

Primary:

**I think this is incorrect**

Secondary:

**Pay challan**

The dispute action should be visually stronger because dispute resolution is the hero journey.

---

## Screen 3 — Review Evidence & Decide

### Goal

Let the citizen inspect the evidence before deciding whether to dispute.

### Evidence section

Show simulated evidence such as:

- Image
- Recorded vehicle number
- Recorded violation
- Date/time
- Location

Clearly label simulated/demo evidence where appropriate.

### Decision prompt

**Does something look wrong?**

Actions:

- **Everything looks correct**
- **I think this is incorrect**

Optional assistive action:

**Explain this violation**

If AI is used here, it must be clearly labelled as prototype assistance and must not claim an official or legal determination.

### Important

This screen is especially important because ChallanYatri is not merely a complaint form. It helps the citizen make an informed decision before starting the dispute.

---

## Screen 4 — Explain & Submit Dispute

### Goal

Turn a citizen's disagreement into a structured, understandable dispute without creating a long government-style form.

### Step 1 — Reason

Headline:

**Why do you think this challan is incorrect?**

Suggested selectable reasons:

- Wrong vehicle
- Wrong violation
- Evidence does not match
- Wrong date/time or location
- Duplicate challan
- Other

The final reason list can be refined after UX testing.

### Step 2 — Explanation

Label:

**Tell us what happened**

Helper text:

> Explain what you believe is incorrect. Include the details that could help someone review your dispute.

Large text area.

### Step 3 — Optional evidence

**Add supporting evidence (optional)**

Allow simulated image/document upload.

The user should never be blocked from starting a dispute merely because they do not have an attachment.

### Step 4 — Review

Before submission, show:

- Selected reason
- Citizen explanation
- Attachments
- Challan reference

Actions:

**Submit dispute**

**Edit**

### Progress indicator

For the dispute flow, use:

`1 Review → 2 Reason → 3 Evidence → 4 Submit`

Show the current step, e.g. **Step 2 of 4**.

---

## Screen 5 — Dispute Recorded

### Goal

Remove uncertainty after submission and give the citizen something they can use to return to the case.

### Main message

**Your dispute has been recorded**

Reference:

**CY-2026-XXXXXX**

Provide a copy action.

### What happens next

Use neutral prototype language:

> Your dispute is now in the prototype review workflow. You can use your reference number to check its status.

Do **not** claim that a real authority received or reviewed the dispute.

### Prototype disclosure

Prominent enough to be understood:

> **Prototype only:** This submission does not contact a government authority or create a real grievance.

### CTA

**Track my dispute**

No additional form or information request on this screen.

---

## Screen 6 — Track Dispute

### Goal

Make the post-submission state understandable instead of leaving the citizen in a black box.

### Header

**Dispute CY-2026-XXXXXX**

### Current status card

Example:

**Under review**

> Your dispute is currently in the review stage of this prototype.

### Timeline

```text
● Dispute submitted
│  19 Aug 2026 · 10:42 AM
│
● Review started
│  19 Aug 2026 · 11:10 AM
│
○ Decision
   Pending
```

Use icons + labels + color. Do not rely on color alone.

### Next-step explanation

**What happens next?**

> The next step in this prototype is a simulated review of the information you submitted.

### Simulated outcomes

The tracker should support prototype states for demo purposes:

- Under Review
- Decision — Approved
- Decision — Rejected
- More Information Needed

If an outcome is shown, label it as simulated.

### Important

Do not promise a universal review timeline such as “15–30 days” unless a later verified, jurisdiction-specific source justifies it.

# 7. Navigation

Keep navigation minimal during the hero journey.

Recommended:

- Back
- Home / ChallanYatri logo
- Current step/status

Avoid a large dashboard/navigation system in the MVP.

# 8. Error & Empty States

Errors should tell the user what happened and what to do next.

Examples:

### No challan found

> **We couldn't find that challan.**
>
> Check the number and try again, or search using your vehicle registration number.

### Invalid vehicle number

> **Check your vehicle number.**
>
> Example: MP09AB1234

### Dispute validation

> **Tell us why you believe this challan is incorrect.**

### Submission failure

> **We couldn't save your dispute.**
>
> Your information has not been submitted. Try again.

### Empty evidence

> **No evidence is available in this demo challan.**

Do not invent evidence to fill empty states.

# 9. Accessibility

- Minimum 44px touch targets
- Visible keyboard focus states
- WCAG AA contrast target
- Form labels associated with inputs
- Meaningful alt text for evidence/images
- Status conveyed through text + icon, not color alone
- Keyboard navigation for all interactive controls
- No horizontal scrolling on mobile
- Avoid flashing or distracting animation

# 10. Content Rules

Prefer plain language:

- **“I think this is incorrect”** instead of “Raise grievance”
- **“Tell us what happened”** instead of “Complaint description”
- **“Track my dispute”** instead of “Check grievance status”
- **“What happens next?”** instead of “Workflow status”

Avoid legal conclusions such as:

- “Your challan is invalid.”
- “The officer was wrong.”
- “Your dispute will be accepted.”

Use:

- “You believe this challan is incorrect.”
- “You can submit a dispute.”
- “This prototype simulates the review process.”

# 11. Demo Optimization

The 3-minute demo should primarily show:

```text
Find challan
    ↓
Understand details
    ↓
View evidence
    ↓
“I think this is incorrect”
    ↓
Select reason
    ↓
Explain + optional evidence
    ↓
Review
    ↓
Submit
    ↓
Dispute ID
    ↓
Track status
```

The payment branch should be demonstrated briefly, if at all.

# 12. Design Acceptance Criteria

The UX is ready for implementation when:

- A first-time user can understand the product's purpose immediately.
- The user can find a demo challan without unnecessary fields.
- The user can understand the violation before choosing an action.
- Evidence can be reviewed before disputing.
- The dispute form feels guided rather than bureaucratic.
- Evidence upload is optional.
- The user sees exactly what will be submitted before confirmation.
- A dispute reference is generated after submission.
- The user can understand the current status and next step.
- Mock/real boundaries are visible and honest.
- The complete journey works comfortably on mobile.

## 13. Relationship to Existing Design Exploration

This specification takes the strongest aspects of the uploaded design exploration—particularly the bold/empowering direction, clear cards, strong primary actions, status timeline, and mobile-first layout—and removes or changes elements that conflict with the approved product scope, including mandatory phone authentication, unsupported universal review timelines, and language implying real authority submission. fileciteturn1file1

The broader uploaded UX guide also established useful accessibility, spacing, content, status-indicator, and form principles that are retained where they fit the approved MVP. fileciteturn0file0
