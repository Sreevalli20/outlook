
# GRANTLY — Unified Scholarship Discovery & Management Platform

<p align="center">
  <strong>Find Opportunities. Unlock Your Future.</strong>
</p>

<p align="center">
  A unified student platform for discovering scholarships, checking eligibility, managing applications, and organizing educational funding opportunities.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

---

## Overview

GRANTLY is a modern scholarship discovery and management application designed to simplify the educational funding journey.

It brings scholarship exploration, eligibility assessment, application tracking, document management, and deadline organization together in one intuitive workspace.

## Features

- **Dashboard:** Personalized overview of scholarships, applications, upcoming deadlines, and recent activities.
- **Scholarship Discovery:** Search, filter, sort, explore, and save scholarship opportunities.
- **Scholarship Details:** Review funding amounts, eligibility requirements, benefits, deadlines, and application instructions.
- **Eligibility Matcher:** Evaluate scholarship requirements against student profile information.
- **Scholarship Comparison:** Compare funding amounts, benefits, eligibility criteria, and deadlines.
- **Application Management:** Organize applications, update statuses, and track application progress.
- **Document Vault:** Upload, preview, download, categorize, and manage application documents.
- **Deadline Calendar:** Track scholarship deadlines and application milestones.
- **Notification Center:** Manage application updates, reminders, and deadline notifications.
- **Insights & Analytics:** Visualize application progress and scholarship activity.
- **Student Profile:** Maintain personal, academic, and eligibility-related information.
- **Settings:** Manage application preferences and locally stored data.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend development |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS | Interface styling |
| React Router DOM | Application navigation |
| Zustand | State management |
| React Hook Form | Form management |
| Zod | Schema validation |
| Lucide React | Interface icons |
| Recharts | Data visualization |
| LocalStorage | Persistent application data |
| IndexedDB | Local document storage |

## Application Architecture

GRANTLY follows a modular frontend architecture focused on reusable components, maintainable code, and organized application logic.

- React components provide reusable interface elements.
- TypeScript provides structured data models.
- Zustand manages shared application state.
- LocalStorage maintains supported application information.
- IndexedDB stores uploaded documents locally.
- Utility modules handle eligibility calculations, formatting, and data operations.

The core application is designed to function without a dedicated backend server or external API.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Sreevalli20/outlook.git
```

**2. Navigate to the project directory**

```bash
cd outlook
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Create a production build**

```bash
npm run build
```

**6. Preview the production build**

```bash
npm run preview
```

## Project Structure

```text
outlook/
├── public/
├── src/
│   ├── components/
│   │   ├── applications/
│   │   ├── common/
│   │   ├── documents/
│   │   ├── layout/
│   │   └── scholarships/
│   ├── data/
│   ├── pages/
│   ├── store/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Data Storage & Privacy

- Student information and application records are maintained using browser storage.
- Uploaded documents are stored locally using IndexedDB.
- Data is not automatically synchronized across devices.
- Clearing browser storage may remove locally saved information.
- Users should maintain backups of important documents.
- Scholarship eligibility requirements and deadlines should be verified through official sources.

## Responsive Design

Designed to support:

- Desktop computers
- Laptops
- Tablets
- Mobile devices

The interface focuses on usability, consistent navigation, accessible interactions, and responsive layouts.

## Future Scope

- Verified scholarship data integrations.
- Secure cloud synchronization.
- Multi-device access.
- Enhanced scholarship recommendations.
- Advanced application analytics.
- Additional accessibility improvements.

## License

No license has been specified yet. An appropriate license should be added before permitting external reuse or redistribution.

---

<p align="center">
  <strong>GRANTLY</strong>
  <br />
  Find Opportunities. Unlock Your Future.
  <br />
  Making scholarship discovery and application management simpler for students.
</p>
