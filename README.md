# Carta — Physician-First EHR

> A clean, electronic health record built for how doctors actually think.

---

## Table of contents

1. [Vision](#vision)
2. [Design philosophy](#design-philosophy)
3. [Color system](#color-system)
4. [UI layouts](#ui-layouts)
5. [Chart tabs](#chart-tabs)
6. [Tech stack](#tech-stack)
7. [Architecture](#architecture)
8. [Project structure](#project-structure)
9. [Getting started](#getting-started)
10. [FHIR integration](#fhir-integration)
11. [Accessibility and compliance](#accessibility-and-compliance)
12. [Roadmap](#roadmap)
13. [Contributing](#contributing)

---

## Vision

Epic and most legacy EHRs were designed around billing workflows, not clinical ones. Carta is built from the ground up for the physician at the bedside — someone who needs the right information in under three seconds, not buried six clicks deep.

Carta draws from three design references:

- **Apple Health** — calm hierarchy, purposeful whitespace, no noise
- **Linear** — fast keyboard navigation, snappy interactions, nothing wasted
- **Paper charts** — information grouped the way clinicians actually think: chief complaint → vitals → labs → assessment → plan

The name comes from the Latin *carta* — a chart, a record, a document. Two syllables. Every English speaker can read and say it immediately.

---

## Design philosophy

### Less is more, urgency is clear

Carta shows only what the physician needs in the first ten seconds of opening a chart:

- **Flagged vitals** — abnormal values surface in amber (caution) or red (critical) automatically
- **Critical badges** — allergies, code status, and active diagnoses are always visible in the patient header, never hidden
- **Abnormal labs** — color-coded by direction: red = high, blue = low, green = normal range
- **Latest note** — surfaced immediately on the overview, not buried in a timeline

Everything else is one tab click away, never more.

### Tab navigation

All ten chart sections are always visible simultaneously in a 5×2 grid — no scrolling, no searching, no hidden menus. The active tab is highlighted in Carolina Blue. The physician always knows exactly where they are.

### Color encodes meaning, not decoration

| Color | Meaning |
|---|---|
| Carolina Blue `#4B9CD3` | Primary action, active state, navigation |
| UNC Navy `#13294B` | Header backgrounds, primary text |
| Clinical Red `#C8102E` | Critical / abnormal high |
| Amber `#E8A020` | Caution / borderline |
| Clinical Green `#0C6B3E` | Normal / improving |
| Steel Blue `#7BA7C9` | Secondary labels, metadata |

These are not arbitrary brand colors — they map directly to clinical status so a physician scanning a chart can read urgency at a glance without reading a number.

---

## Color system

Carta uses the University of North Carolina at Chapel Hill official brand palette as its base, extended with a clinical status layer.

### Primary palette

| Token | Hex | Usage |
|---|---|---|
| `--carta-navy` | `#13294B` | Page headers, primary backgrounds |
| `--carta-blue` | `#4B9CD3` | Primary interactive, active tabs |
| `--carta-blue-light` | `#7FC8F8` | Hover states, accents on dark bg |
| `--carta-blue-pale` | `#DBEEF8` | Card backgrounds, subtle fills |
| `--carta-bg` | `#F0F6FB` | App background |

### Clinical status palette

| Token | Hex | Usage |
|---|---|---|
| `--carta-critical` | `#C8102E` | Critically abnormal lab / vital |
| `--carta-critical-bg` | `#FFE8EA` | Flag pill background |
| `--carta-caution` | `#E8A020` | Borderline / trending abnormal |
| `--carta-caution-bg` | `#FFF3D6` | Caution pill background |
| `--carta-normal` | `#0C6B3E` | Within normal range |
| `--carta-normal-bg` | `#E0F5EC` | Normal pill background |

### Dark mode (night shift / ICU)

Dark mode uses UNC Navy `#0B1829` as the base with Carolina Blue `#4B9CD3` as the sole accent. All clinical status colors are shifted to their luminous variants (e.g., `#FF9AA3` for critical red on dark) to maintain legibility under dim lighting.

---

## Chart tabs

All ten tabs are always visible. No scrolling. No overflow menus.

### 1. Vitals

Displays current values in a 4-column grid with color-coded status. Below the grid, sparkline trend bars for BP, HR, temperature, and SpO₂ over the admission. Abnormal values show in amber (caution) or red (critical) without any extra action from the physician.

### 2. History

Problem list with onset dates. Social history, family history, surgical history, immunizations. Organized into scannable sections, not a wall of text.

### 3. Physical

Most recent physical exam by system (General, HEENT, Pulmonary, Cardiac, Abdomen, Extremities, Neuro). Each system on its own line. The author and timestamp are shown at the top.

### 4. EMS notes

Pre-hospital documentation from the ambulance run. Includes arrival vitals, interventions en route, GCS, chief complaint as reported to EMS, and transport time. Displays unit number and paramedic name.

### 5. ER notes

Emergency department attending note, triage note, and any consultant notes from the ED. Shown in reverse chronological order. Author and timestamp on each.

### 6. Labs

Grouped by panel (CBC, BMP, LFTs, coagulation, etc.). Each result shows the reference range inline. Abnormal values flagged with H (high) or L (low) badges — red for high, blue for low, green for normal. Ordered by most recent first.

### 7. Visualizations

Trend charts for key values over the admission: WBC, hemoglobin, creatinine, glucose, SpO₂, temperature, BP. Horizontal bar charts with color mapped to clinical urgency. Future versions will include interactive line charts with date-range selection.

### 8. Pathology

Microbiology (blood, urine, sputum cultures), surgical pathology, cytology, and special stains. Each report shows: specimen, status (pending / resulted / final), preliminary findings, and ordering physician.

### 9. Progress notes

Attending progress notes in reverse chronological order. Each note shows: date/time, author, role. Notes use structured SOAP or narrative format. Future versions will support dictation and AI-assisted note drafting.

### 10. Medications

Active medication list grouped by: inpatient IV, inpatient PO, home medications continued, PRN medications. Each entry shows: drug name, dose, route, frequency, and start date. Allergy conflicts surface as a red flag inline with the offending medication.

---

## Tech stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | Component architecture |
| **TypeScript** | Type safety across the entire codebase |
| **Tailwind CSS** | Utility-first styling, consistent spacing system |
| **React Router v6** | Client-side navigation |
| **Recharts** | Lab and vital trend visualizations |
| **React Query (TanStack)** | Server state management, background refetching |

### Backend

| Technology | Purpose |
|---|---|
| **Python 3.12** | Primary backend language |
| **FastAPI** | REST API, async-first, automatic OpenAPI docs |
| **SQLAlchemy 2.0** | ORM for patient data models |
| **Alembic** | Database migrations |
| **Pydantic v2** | Data validation and serialization |

### Data layer

| Technology | Purpose |
|---|---|
| **PostgreSQL 16** | Primary patient data store |
| **Redis** | Session caching, real-time vital pub/sub |
| **S3-compatible storage** | Imaging, pathology PDFs, scanned documents |

### Infrastructure

| Technology | Purpose |
|---|---|
| **Docker + Docker Compose** | Local development environment |
| **GitHub Actions** | CI/CD pipeline |
| **Nginx** | Reverse proxy, SSL termination |

### Why not Java?

Epic runs on Java. That's a large part of why Epic feels the way it does — heavy class hierarchies, slow iteration cycles, dated UI patterns. Python + TypeScript allows the kind of fast, iterative UI development that a physician-first product requires. FastAPI is production-grade and handles the async, high-throughput patterns that patient data demands.

---

## Architecture

```
Browser (React + TypeScript)
         │
         │  HTTPS / REST + WebSocket
         ▼
    Nginx (reverse proxy)
         │
    ┌────┴──────────────────┐
    │                       │
    ▼                       ▼
FastAPI (Python)        Static assets (S3)
    │
    ├── Auth service (JWT)
    ├── Patient service
    ├── Chart service
    ├── Labs service
    ├── Notes service
    └── FHIR adapter layer
         │
         ▼
    PostgreSQL          Redis
    (patient data)      (cache / pub-sub)
         │
         ▼
    FHIR R4 endpoints
    (hospital EHR bridge)
```

The FHIR adapter layer is the bridge between Carta and existing hospital systems (Epic, Cerner, Meditech). It translates inbound FHIR R4 resources into Carta's internal data models and can push outbound updates back to the source system.

---

## Project structure

```
carta/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PatientList/
│   │   │   ├── PatientHeader/
│   │   │   ├── TabGrid/
│   │   │   ├── tabs/
│   │   │   │   ├── Vitals/
│   │   │   │   ├── History/
│   │   │   │   ├── Physical/
│   │   │   │   ├── EMSNotes/
│   │   │   │   ├── ERNotes/
│   │   │   │   ├── Labs/
│   │   │   │   ├── Visualizations/
│   │   │   │   ├── Pathology/
│   │   │   │   ├── ProgressNotes/
│   │   │   │   └── Medications/
│   │   │   └── shared/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── types/
│   │   ├── utils/
│   │   └── styles/
│   │       └── tokens.css       ← color tokens, spacing
│   └── public/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── patients.py
│   │   │       ├── charts.py
│   │   │       ├── labs.py
│   │   │       ├── notes.py
│   │   │       └── medications.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── fhir/              ← FHIR R4 adapter
│   │   └── core/
│   │       ├── config.py
│   │       ├── auth.py
│   │       └── db.py
│   ├── migrations/
│   └── tests/
│
├── docker-compose.yml
├── nginx.conf
└── README.md
```

---

## Getting started

### Prerequisites

- Node.js 20+
- Python 3.12+
- Docker Desktop
- PostgreSQL 16 (or use the Docker Compose config)

### 1. Clone the repo

```bash
git clone https://github.com/your-org/carta.git
cd carta
```

### 2. Start the dev environment

```bash
docker-compose up -d
```

This starts PostgreSQL, Redis, and Nginx. The frontend and backend run locally for hot-reload.

### 3. Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head               # run migrations
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`. API docs at `http://localhost:8000/docs`.

### 4. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

### 5. Seed data

```bash
cd backend
python scripts/seed_demo_patients.py
```

This loads five demo patients (including Sarah Chen, the patient shown in the mockups) with realistic lab values, notes, and medication lists for development.

---

## FHIR integration

Carta is designed to interoperate with existing hospital systems via **HL7 FHIR R4**.

### Supported resources

| FHIR Resource | Carta section |
|---|---|
| `Patient` | Patient header, demographics |
| `Observation` | Vitals, Labs |
| `DiagnosticReport` | Labs, Pathology |
| `Condition` | History / Problem list |
| `MedicationRequest` | Medications |
| `AllergyIntolerance` | Allergy badges |
| `DocumentReference` | EMS notes, ER notes, Progress notes |
| `Encounter` | Admission metadata |

### Connecting to an existing system

Set the following environment variables in your `.env`:

```env
FHIR_BASE_URL=https://your-hospital.fhir.endpoint/r4
FHIR_CLIENT_ID=your_client_id
FHIR_CLIENT_SECRET=your_client_secret
FHIR_AUTH_TYPE=smart           # or basic, or bearer
```

Carta will pull patient data from the FHIR endpoint on chart open and sync updates every 60 seconds in the background via Redis pub/sub.

---

## Accessibility and compliance

### HIPAA

- All patient data is encrypted at rest (AES-256) and in transit (TLS 1.3)
- Access logs are written for every chart open, tab view, and note action
- Audit trail is append-only and tamper-evident
- Automatic session timeout after 15 minutes of inactivity (configurable)
- Role-based access control: attending, resident, nurse, read-only

### Accessibility (WCAG 2.1 AA)

- All interactive elements are keyboard-navigable
- Tab grid supports arrow-key navigation
- Color is never the sole means of communicating clinical status — abnormal labs also show H / L text badges
- Minimum contrast ratio of 4.5:1 throughout
- Screen reader labels on all icon buttons and status indicators

### Clinical safety

- Allergy conflicts in the medication list are flagged inline, not just at order time
- DNR and code status badges are always visible in the patient header — never behind a click
- Critical lab values (e.g., K+ > 6.0, glucose < 40) trigger a persistent banner until acknowledged

---

## Roadmap

### v0.1 — Foundation (current)

- Patient list with search
- All 10 chart tabs with static/seeded data
- UNC Carolina Blue design system
- Three layout variants (A, B, C)
- FHIR R4 read adapter

### v0.2 — Live data

- Real-time vitals via WebSocket
- Lab auto-refresh (configurable interval)
- FHIR write-back for notes and orders
- Medication allergy conflict detection

### v0.3 — Clinical tools

- Order entry (labs, imaging, medications)
- Note drafting with templates
- Dictation integration (Whisper API)
- Handoff / sign-out tool

### v0.4 — Intelligence layer

- Abnormal lab delta alerting (new critical value vs. prior)
- Sepsis screening score (qSOFA, SIRS)
- AI-assisted progress note drafting (opt-in)
- Medication interaction checker

### v1.0 — Production

- Full HIPAA BAA compliance documentation
- SOC 2 Type II audit
- Multi-hospital / multi-tenant support
- Mobile app (iOS, React Native)
- Epic App Orchard submission

---

## Contributing

Carta is designed by physicians, for physicians. If you are a clinician with workflow feedback, a developer who wants to contribute, or a hospital system interested in a pilot, please open an issue or reach out directly.

Pull request guidelines:

1. All new UI components must follow the Carta color token system (see `frontend/src/styles/tokens.css`)
2. No new dependencies without discussion — keep the bundle lean
3. All API endpoints must have Pydantic schemas and be documented in OpenAPI
4. Clinical logic (allergy conflicts, critical value thresholds) must be reviewed by a licensed clinician before merge

---

*Carta — the chart the way it should have always worked.*
