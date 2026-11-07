GRANTLY — Unified Scholarship Discovery & Management Platform

<p align="center">
<strong>Find Opportunities. Unlock Your Future.</strong>
</p>

<p align="center">
A smarter way to discover scholarships, understand eligibility, organize applications, and manage educational funding opportunities.
</p>

<p align="center">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
<img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
</p>

Overview

GRANTLY is a modern scholarship discovery and management platform designed to simplify the educational funding journey for students.

Finding relevant scholarships, understanding eligibility requirements, organizing application documents, and keeping track of deadlines can be complicated.

GRANTLY brings these activities together in one organized workspace, helping students discover opportunities, evaluate eligibility, manage applications, and stay informed about important deadlines.

The platform combines scholarship discovery, personalized eligibility matching, application tracking, document organization, deadline management, and meaningful insights into one cohesive student experience.

Key Features
01. Student Dashboard
Personalized student workspace.
Scholarship and application summaries.
Saved opportunities overview.
Upcoming application deadlines.
Application progress visualization.
Recent activity and quick actions.
02. Scholarship Discovery
Search scholarships by name and keywords.
Filter by academic level and funding type.
Explore merit-based and need-based opportunities.
Filter by location and eligibility requirements.
Sort by award amount and application deadline.
Save scholarships for future reference.
03. Scholarship Details
Comprehensive scholarship information.
Funding amount and benefits.
Academic eligibility requirements.
Income and other eligibility criteria.
Required document information.
Application instructions.
Official source links and deadline information.
04. Smart Eligibility Matcher
Match scholarship requirements against student information.
Identify eligible opportunities.
Highlight potentially eligible opportunities.
Explain unmet eligibility requirements.
Identify missing profile information.
Provide relevant scholarship recommendations.
05. Scholarship Comparison
Compare multiple scholarships.
Review award amounts and benefits.
Compare academic requirements.
Evaluate eligibility criteria.
Review application deadlines.
Make informed funding decisions.
06. Application Management
Organize scholarship applications.
Track application progress.
Update application statuses.
Maintain application notes.
Record submission dates and reference numbers.
View application history.

Supported application statuses:

Status	Description
Interested	Opportunity saved for consideration
Preparing	Application preparation in progress
Ready to Apply	Documents and information prepared
Submitted	Application submitted
Under Review	Application awaiting a decision
Approved	Application approved
Rejected	Application unsuccessful
Withdrawn	Application withdrawn
07. Document Vault
Organize academic and personal documents.
Upload PDF files and supported images.
Preview and download documents.
Rename and categorize files.
Remove unnecessary documents.
Maintain an organized document collection.
08. Deadline Calendar
Interactive monthly calendar.
Scholarship deadline tracking.
Personal application reminders.
Upcoming deadline identification.
Application milestone management.
09. Notification Center
Upcoming deadline notifications.
Application-related reminders.
Missing document alerts.
Application activity updates.
Read and unread notification management.
10. Insights & Analytics
Application status visualization.
Scholarship activity overview.
Potential funding opportunity analysis.
Application progress charts.
Deadline insights.
11. Student Profile
Personal information management.
Academic details.
Educational institution information.
Income and eligibility preferences.
Profile completion tracking.
12. Settings & Data Management
Application preferences.
Theme settings where supported.
Data export.
Local data management.
Privacy-related settings.
Technology Stack
Technology	Purpose
React	Frontend application
TypeScript	Type safety
Vite	Development and build tooling
Tailwind CSS	User interface styling
React Router DOM	Application navigation
Zustand	State management
React Hook Form	Form management
Zod	Schema validation
Lucide React	Interface icons
Recharts	Data visualization
LocalStorage	Persistent application data
IndexedDB	Local document storage
Vercel	Production deployment
Application Architecture

GRANTLY follows a frontend-focused architecture with browser-based data persistence.

Data Management
LocalStorage: Maintains student profile information, preferences, saved scholarships, application records, and supported application state.
IndexedDB: Stores uploaded documents locally in the browser.
Zustand: Manages shared application state.
React Components: Provide reusable and maintainable interface elements.
TypeScript: Provides structured data models and type safety.

The core application does not require a dedicated backend server or external API.

Data and Privacy
Student information is maintained locally.
Uploaded documents are stored using IndexedDB.
Application records persist in browser storage.
Data is not automatically synchronized across devices or accounts.
Clearing browser storage may remove locally stored information.

Scholarship information should always be checked against the relevant official provider before applying, as eligibility requirements and deadlines may change.

Getting Started

Follow these steps to run GRANTLY locally.

Prerequisites

Make sure you have installed:

Node.js (LTS recommended)
npm
Git
1. Clone the Repository
bash
git clone https://github.com/Sreevalli20/outlook.git

2. Navigate to the Project
bash
cd outlook

3. Install Dependencies
bash
npm install

4. Start the Development Server
bash
npm run dev


Open the local URL displayed in your terminal to access the application.

5. Create a Production Build
bash
npm run build

6. Preview the Production Build
bash
npm run preview

Project Structure

The following represents the intended high-level organization of the application. Refer to the repository for the exact implemented structure.

text
GRANTLY/
│
├── public/
│   └── assets/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── scholarships/
│   │   ├── applications/
│   │   └── forms/
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Scholarships/
│   │   ├── Eligibility/
│   │   ├── Applications/
│   │   ├── Documents/
│   │   ├── Calendar/
│   │   ├── Notifications/
│   │   ├── Insights/
│   │   ├── Profile/
│   │   └── Settings/
│   │
│   ├── store/
│   ├── hooks/
│   ├── services/
│   ├── data/
│   ├── types/
│   ├── utils/
│   ├── schemas/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── .gitignore

Deployment

GRANTLY supports production deployment through Vercel.

Deploy Using Vercel CLI

Install the Vercel CLI:

bash
npm install -g vercel


Authenticate:

bash
vercel login


Deploy the production application:

bash
vercel --prod


Follow the CLI instructions to link the existing Vercel project if necessary.

After successful deployment, Vercel provides a publicly accessible HTTPS URL.

Browser Compatibility

Designed for modern web browsers:

Google Chrome
Mozilla Firefox
Microsoft Edge
Apple Safari

The application is designed to support:

Desktop
Laptop
Tablet
Mobile devices
Future Scope

Potential areas for future development include:

Verified scholarship data integrations.
Secure cloud synchronization.
Multi-device access.
Application collaboration.
Official scholarship provider integrations.
Additional accessibility improvements.
Advanced scholarship recommendation capabilities.
License

No license has been specified yet. Add an appropriate open-source license before permitting reuse or redistribution.

<p align="center">
<strong>GRANTLY</strong>
</p>

<p align="center">
Find Opportunities. Unlock Your Future.
</p>

<p align="center">
Making scholarship discovery and application management simpler for students.
</p>
