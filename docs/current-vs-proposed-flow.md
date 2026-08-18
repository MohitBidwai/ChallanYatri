# ChallanYatri — Current vs Proposed Journey

## Why This Document Exists

ChallanYatri should not claim that the official e-Challan system has no grievance mechanism. It does have challan lookup/payment functionality and grievance/complaint routes. The product opportunity is the **citizen journey across those services**, especially when the citizen disagrees with a challan.

The official e-Challan portal currently supports challan lookup using challan number, vehicle number, or driving licence number and provides online payment functionality. It also exposes grievance-related services and technical support. citeturn0search0turn0search4

The official ecosystem also varies by jurisdiction. The e-Challan portal directs users to NextGen e-Challan for a number of states, while Delhi has its own traffic-police citizen services including a separate “Raise Complaint” journey. citeturn0search4turn1search5

## Observed Current Journey

The exact screens and routing can vary by state/authority, but the citizen experience can be represented at a high level as:

```text
Citizen receives / discovers challan
              ↓
        Find challan online
              ↓
      View challan details
              ↓
       Decide what to do
          ↙       ↘
       Pay       Challenge
                   ↓
       Find the applicable grievance route
                   ↓
        Fill authority-specific form
                   ↓
      Provide supporting information
                   ↓
       OTP / CAPTCHA / validation
                   ↓
             Submit
                   ↓
          Status / follow-up
```

### Current-system observations

1. **Challan lookup is available.** The official portal supports lookup using challan number, vehicle number, or DL number and then displays challan/payment information. citeturn0search4
2. **Payment and transaction verification are explicit services.** The portal has separate flows for pending transactions and payment verification. citeturn0search6
3. **Grievance/complaint is not necessarily one identical flow for every jurisdiction.** The official ecosystem lists state-specific services, and Delhi Traffic Police exposes a dedicated “Raise Complaint” service. citeturn0search1turn1search5
4. **The Delhi complaint flow is form-heavy.** It asks for complaint type, vehicle registration number, challan number, problem in challan, supporting image, location, name, complaint text, mobile number, OTP verification and CAPTCHA. citeturn1search0
5. **The citizen may need to understand which route applies before they can successfully raise the issue.** This is the journey-level friction ChallanYatri is designed to reduce, rather than claiming that a grievance route does not exist.
6. **Technical failure is a real failure mode.** The official e-Challan portal provides a dedicated technical-help email and phone number for e-Challan problems, which indicates that technical issues are a recognized part of the service environment. citeturn0search3

## Problem We Are Targeting

The problem is not:

> “There is no way to dispute a challan.”

The problem is:

> **“When I believe a challan is wrong, I should not have to figure out which service, form, authority, verification step, and follow-up mechanism applies before I can confidently challenge it.”**

The product should therefore focus on reducing **navigation friction, submission uncertainty, and post-submission uncertainty**.

## Proposed ChallanYatri Journey

```text
                ChallanYatri
                    ↓
             Find My Challan
                    ↓
          Understand the Challan
                    ↓
             Review Evidence
                    ↓
          What do you want to do?
             ↙              ↘
        Pay Challan        Dispute
                              ↓
                      Why are you disputing?
                              ↓
                    Add explanation/evidence
                              ↓
                         Review
                              ↓
                        Submit
                              ↓
                     Dispute ID
                              ↓
                     Track Status
```

## What ChallanYatri Changes

### 1. One starting point

Instead of asking the citizen to understand the service structure first, ChallanYatri starts with the citizen's goal:

> **“What do you want to do with this challan?”**

### 2. Context before action

Before asking for a grievance form, show the challan details and evidence so the citizen can make an informed decision.

### 3. Guided dispute creation

Instead of a generic complaint form, guide the user through a small number of understandable questions that produce a structured dispute.

### 4. Submission confidence

Before submission, show exactly what will be recorded in the prototype and require confirmation.

### 5. A visible lifecycle

After submission, provide a dispute ID and a status timeline rather than leaving the citizen uncertain about whether anything happened.

### 6. Clear prototype boundaries

ChallanYatri must clearly state that it is an independent prototype and that government records, payments, authority review and resolution outcomes shown in the demo are simulated.

## What We Are NOT Claiming

We are not claiming that:

- the official e-Challan portal has no grievance option;
- every Indian state uses the same complaint workflow;
- every grievance submission currently fails;
- a particular police officer or authority acted improperly in the user's real-world case;
- ChallanYatri can legally determine whether a challan is valid.

These distinctions are important for product credibility and for the hackathon's honesty criterion.

## Design Opportunity

The design challenge is therefore:

> **How might we turn a fragmented challan-dispute experience into one clear, trustworthy citizen journey without pretending to replace the official systems behind it?**

That is the core UX question for ChallanYatri.
