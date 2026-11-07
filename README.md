GRANTLY — Unified Scholarship Discovery & Management Platform

<p align="center">
<strong>Find Opportunities. Unlock Your Future.</strong>
</p>

<p align="center">
A student-focused platform for discovering scholarships, understanding eligibility, organizing applications, and managing educational funding opportunities in one place.
</p>

Overview

GRANTLY is a modern scholarship discovery and management platform designed to simplify the educational funding journey for students.

Finding relevant scholarships, understanding eligibility requirements, organizing application documents, and keeping track of deadlines can be complicated.

GRANTLY brings these activities together in one organized workspace, helping students discover opportunities, evaluate eligibility, manage applications, and stay informed about important deadlines.

The platform provides an intuitive interface, personalized scholarship matching, application tracking, document organization, and useful insights into the student's funding journey.

Key Features
1. Student Dashboard
Personalized student workspace.
Scholarship and application summaries.
Saved opportunities overview.
Upcoming application deadlines.
Application progress visualization.
Recent activity and quick actions.
2. Scholarship Discovery
Search scholarships by name and keywords.
Filter by academic level and funding type.
Explore merit-based and need-based opportunities.
Filter by location and eligibility requirements.
Sort by award amount and application deadline.
Save scholarships for future reference.
3. Scholarship Details
Detailed scholarship information.
Funding amount and benefits.
Academic eligibility requirements.
Income and other eligibility criteria.
Required document information.
Application instructions.
Official source links and deadline information.
4. Eligibility Matcher
Match scholarship requirements against student information.
Identify eligible opportunities.
Highlight potentially eligible opportunities.
Explain unmet eligibility requirements.
Identify missing profile information.
Provide more relevant scholarship recommendations.
5. Scholarship Comparison
Compare multiple scholarships.
Review award amounts and benefits.
Compare academic requirements.
Compare eligibility criteria.
Review application deadlines.
Make informed decisions.
6. Application Management
Organize scholarship applications.
Track application progress.
Update application statuses.
Maintain application notes.
Record submission dates and reference numbers.
View application history.

Supported application statuses include:

Interested
Preparing
Ready to Apply
Submitted
Under Review
Approved
Rejected
Withdrawn
7. Document Vault
Organize academic and personal documents.
Upload PDF files and supported images.
Preview and download documents.
Rename and categorize files.
Remove unnecessary documents.
Maintain an organized document collection.
8. Deadline Calendar
Interactive monthly calendar.
Scholarship deadline tracking.
Personal application reminders.
Upcoming deadline identification.
Application milestone management.
9. Notification Center
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
Tailwind CSS	UI styling
React Router	Application navigation
Zustand	State management
React Hook Form	Form management
Zod	Schema validation
Lucide React	Interface icons
Recharts	Data visualization
LocalStorage	Persistent application data
IndexedDB	Local document storage
Vercel	Production deployment
Application Architecture

GRANTLY uses a frontend-focused architecture with browser-based data persistence.

Data management:

LocalStorage maintains student profile information, preferences, saved scholarships, application records, and other supported application state.
IndexedDB stores uploaded documents locally.
Zustand manages shared application state.
React components provide reusable interface elements.
TypeScript provides structured data models and type safety.

The platform does not require a dedicated backend server or external API for its core functionality.

Data limitation: Application information and documents are stored locally in the user's browser. They are not automatically synchronized across devices or accounts.

Scholarship information should be checked against the relevant official provider before applying, as eligibility requirements and deadlines may change.

Getting Started
Prerequisites

Make sure you have installed:

Node.js (LTS recommended)
npm
Git
1. Clone the repository
bash
git clone YOUR_PUBLIC_GITHUB_REPOSITORY_URL

2. Navigate to the project
bash
cd your-project-folder

3. Install dependencies
bash
npm install

4. Start the development server
bash
npm run dev


Open the local URL displayed in your terminal.

5. Create a production build
bash
npm run build

6. Preview the production build
bash
npm run preview

Project Structure

The following is a representative structure. Refer to the actual repository for the implemented file organization.

text
GRANTLY/
│
├── public/
│   ├── assets/
│   └── favicon/
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
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

Deployment

GRANTLY can be deployed using Vercel.

Deploy with Vercel CLI

Install and authenticate with the Vercel CLI:

bash
npm install -g vercel
vercel login


Deploy the production application:

bash
vercel --prod


Follow the CLI instructions to link the existing Vercel project if required.

After successful deployment, Vercel provides a public HTTPS URL.

Browser Compatibility

Designed for modern browsers:

Google Chrome
Mozilla Firefox
Microsoft Edge
Apple Safari

The interface is designed to support desktop, tablet, and mobile screen sizes.

Privacy & Data Handling

GRANTLY uses browser-based storage for its local application functionality.

Student information is maintained locally.
Uploaded documents are stored using IndexedDB.
Application records persist in browser storage.
No backend synchronization is provided.
Clearing browser storage may remove locally stored information.

Users should maintain their own backups of important information and documents.

Future Scope

Potential areas of future development include:

Verified scholarship data integrations.
Secure cloud synchronization.
Multi-device access.
Application collaboration.
Official scholarship provider integrations.
Additional accessibility improvements.
Advanced scholarship recommendation capabilities.
License

Add the appropriate license before distributing or reusing this project.

<p align="center">
<strong>GRANTLY</strong><br/>
Find Opportunities. Unlock Your Future.
</p>

<p align="center">
Making scholarship discovery and application management simpler for students.
</p>