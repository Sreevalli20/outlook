import { Scholarship } from '../types/scholarship';

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'sch-001',
    name: 'National Merit Scholarship Program',
    provider: 'National Merit Scholarship Corporation (NMSC)',
    shortDescription: 'Prestigious academic competition for recognition and undergraduate college scholarships.',
    fullDescription: 'The National Merit Scholarship Program is an academic competition for recognition and college undergraduate scholarships. High school students enter the National Merit Program by taking the Preliminary SAT/National Merit Scholarship Qualifying Test (PSAT/NMSQT). Finalists are selected based on high academic performance, school recommendation, and SAT/ACT scores.',
    fundingType: 'private',
    category: 'Merit',
    awardAmount: 2500,
    currency: 'USD',
    awardType: 'one-time',
    awardDetails: '$2,500 single-payment scholarship, plus eligibility for corporate-sponsor and college-sponsor renewable awards up to $10,000/year.',
    academicLevel: ['High School', 'Undergraduate'],
    eligibleCourses: ['Any', 'Engineering', 'Liberal Arts', 'Computer Science', 'Business', 'Pre-Med'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 88, // ~3.5+ GPA / top percentile
    maxAnnualIncome: undefined,
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Any'],
    requiredDocuments: [
      'Academic marksheets',
      'Recommendation letter',
      'Statement of Purpose',
      'Identity proof'
    ],
    applicationStartDate: '2026-09-01',
    applicationDeadline: '2026-11-15',
    officialWebsiteUrl: 'https://www.nationalmerit.org',
    verificationDate: '2026-10-15',
    applicationInstructions: [
      'Take the PSAT/NMSQT test through an accredited high school during junior year.',
      'Achieve qualifying Selection Index score for your state semifinalist cut-off.',
      'Submit the Semifinalist Application with high school endorsement, counselor recommendation, and official transcripts.',
      'Provide confirming SAT or ACT scores.'
    ],
    importantNotices: [
      'Students must be enrolled as high school students progressing toward graduation.',
      'Requires US citizenship or permanent resident status.'
    ],
    isFeatured: true,
    contactEmail: 'scholars@nationalmerit.org'
  },
  {
    id: 'sch-002',
    name: 'Google Generation Scholarship (Women in Computer Science)',
    provider: 'Google Inc.',
    shortDescription: 'Scholarship designed to help aspiring computer scientists excel in technology and become leaders in the field.',
    fullDescription: 'The Generation Google Scholarship was established to help aspiring students pursuing computer science degrees excel in technology and become active role models. Selected students will receive an award and be invited to an exclusive virtual retreat with Google engineers and mentors.',
    fundingType: 'corporate',
    category: 'Women in Tech',
    awardAmount: 10000,
    currency: 'USD',
    awardType: 'one-time',
    awardDetails: '$10,000 award for tuition, books, and educational fees, plus access to Google mentorship community.',
    academicLevel: ['Undergraduate', 'Postgraduate'],
    eligibleCourses: ['Computer Science', 'Computer Engineering', 'Software Engineering', 'Information Technology'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 80, // ~3.2+ GPA
    maxAnnualIncome: undefined,
    genderRequirement: 'Female',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Public/Government', 'Private Accredited'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Statement of Purpose',
      'Recommendation letter',
      'Bonafide certificate'
    ],
    applicationStartDate: '2026-10-01',
    applicationDeadline: '2026-12-05',
    officialWebsiteUrl: 'https://buildyourfuture.withgoogle.com',
    verificationDate: '2026-10-20',
    applicationInstructions: [
      'Complete online application form via Google Build Your Future portal.',
      'Upload current resume/CV detailing technical projects and leadership.',
      'Submit academic transcripts from your current and prior institutions.',
      'Write two 400-word essays focusing on diversity in tech and problem-solving passion.'
    ],
    importantNotices: [
      'Applicants must be enrolled as full-time students in an accredited university for the upcoming academic year.'
    ],
    isFeatured: true,
    contactEmail: 'generationgoogle@google.com'
  },
  {
    id: 'sch-003',
    name: 'Prime Minister Scholarship Scheme (PMSS)',
    provider: 'Department of Ex-Servicemen Welfare (Govt. of India)',
    shortDescription: 'Financial assistance for higher professional and technical education to wards of ex-servicemen.',
    fullDescription: 'PMSS promotes higher technical and professional education for dependent wards and widows of ex-servicemen, ex-coast guard personnel, and paramilitary forces. Scholarships are awarded for recognized degrees such as Engineering, Medicine, Dental, Veterinary, MBA, and MCA.',
    fundingType: 'government',
    category: 'Government',
    awardAmount: 36000,
    currency: 'INR',
    awardType: 'annual',
    awardDetails: 'Rs 3,000/month for girls (Rs 36,000/year) and Rs 2,500/month for boys (Rs 30,000/year) for the duration of the degree.',
    academicLevel: ['Undergraduate', 'Diploma'],
    eligibleCourses: ['Engineering', 'Medicine', 'Computer Science', 'Business', 'Pharmacy', 'Architecture'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 60,
    maxAnnualIncome: undefined,
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Public/Government', 'Private Accredited'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Bonafide certificate',
      'Bank details',
      'Other' // Ex-Servicemen PPO / ESM certificate
    ],
    applicationStartDate: '2026-08-15',
    applicationDeadline: '2026-11-30',
    officialWebsiteUrl: 'https://www.desw.gov.in',
    verificationDate: '2026-10-10',
    applicationInstructions: [
      'Register on the Kendriya Sainik Board (KSB) official portal.',
      'Fill in applicant personal and academic information accurately.',
      'Upload Annexure 1 (Bonafide certificate signed by College Principal/Dean).',
      'Upload scanned copy of PPO / Discharge Book and active Bank passbook.'
    ],
    importantNotices: [
      'Only valid for first professional degree courses approved by AICTE/UGC/MCI.'
    ],
    isFeatured: true,
    renewableYears: 4
  },
  {
    id: 'sch-004',
    name: 'Gates Cambridge Scholarship',
    provider: 'Bill & Melinda Gates Foundation & Cambridge University',
    shortDescription: 'Full-cost awards for outstanding applicants from countries outside the UK to pursue a postgraduate degree.',
    fullDescription: 'Gates Cambridge Scholarships are prestigious international awards for postgraduate study at the University of Cambridge. The scholarship covers full University Composition Fee, maintenance allowance, travel fares, and discretionary funding for academic development.',
    fundingType: 'private',
    category: 'Research',
    awardAmount: 45000,
    currency: 'GBP',
    awardType: 'full-ride',
    awardDetails: 'Covers full tuition, annual living allowance (£20,000+), return airfare, visa costs, and academic development funding.',
    academicLevel: ['Postgraduate', 'Doctoral'],
    eligibleCourses: ['Any', 'STEM', 'Social Sciences', 'Humanities', 'Biotechnology', 'Public Health'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 85, // First-class honours equivalent
    maxAnnualIncome: undefined,
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Any'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Statement of Purpose',
      'Recommendation letter'
    ],
    applicationStartDate: '2026-09-01',
    applicationDeadline: '2026-12-03',
    officialWebsiteUrl: 'https://www.gatescambridge.org',
    verificationDate: '2026-10-01',
    applicationInstructions: [
      'Apply for admission to a Cambridge postgraduate course via the Graduate Application Portal.',
      'Complete the dedicated Gates Cambridge section in the application form.',
      'Submit a 500-word statement explaining why you are applying and how you meet the 4 core criteria.',
      'Provide an independent reference speaking specifically to your fit for the scholarship.'
    ],
    importantNotices: [
      'Open to citizens of any country outside the United Kingdom.'
    ],
    isFeatured: true,
    renewableYears: 3
  },
  {
    id: 'sch-005',
    name: 'Tata Trust Medical & Healthcare Education Grants',
    provider: 'Tata Trusts',
    shortDescription: 'Need-cum-merit financial grants supporting students pursuing medical and allied healthcare degrees.',
    fullDescription: 'Tata Trusts offers financial grants to meritorious and underprivileged students pursuing undergraduate and postgraduate degrees in Medicine (MBBS, BDS), Nursing, Pharmacy, and allied healthcare sciences in recognized Indian colleges.',
    fundingType: 'ngo',
    category: 'Need-Based',
    awardAmount: 75000,
    currency: 'INR',
    awardType: 'annual',
    awardDetails: 'Grant covering up to 60-80% of annual institutional tuition fees up to ₹1,00,000.',
    academicLevel: ['Undergraduate', 'Postgraduate'],
    eligibleCourses: ['Medicine', 'Nursing', 'Pharmacy', 'Dental Surgery', 'Physiotherapy'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 70,
    maxAnnualIncome: 600000, // Rs 6 Lakh annual family income
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Public/Government', 'Private Accredited'],
    requiredDocuments: [
      'Identity proof',
      'Income certificate',
      'Academic marksheets',
      'Bonafide certificate',
      'Bank details'
    ],
    applicationStartDate: '2026-09-15',
    applicationDeadline: '2026-11-20',
    officialWebsiteUrl: 'https://www.tatatrusts.org',
    verificationDate: '2026-10-18',
    applicationInstructions: [
      'Fill out the online application form on the Tata Trusts portal.',
      'Submit latest family income tax returns or Tahsildar certified income slip.',
      'Provide detailed fee breakdown issued by your college for the current academic session.',
      'Upload verified marksheet of the qualifying exam.'
    ],
    importantNotices: [
      'Annual family income must not exceed INR 6,00,000 from all sources combined.'
    ],
    isFeatured: false,
    renewableYears: 3
  },
  {
    id: 'sch-006',
    name: 'NSF Graduate Research Fellowship Program (GRFP)',
    provider: 'National Science Foundation (NSF)',
    shortDescription: 'Federal fellowship recognizing and supporting outstanding graduate students in STEM disciplines.',
    fullDescription: 'The NSF GRFP helps ensure the quality, vitality, and diversity of the scientific and engineering workforce of the United States. The program recognizes and supports outstanding graduate students who are pursuing full-time research-based master’s and doctoral degrees in science, technology, engineering, and mathematics.',
    fundingType: 'government',
    category: 'STEM',
    awardAmount: 37000,
    currency: 'USD',
    awardType: 'annual',
    awardDetails: 'Three-year annual stipend of $37,000 along with a $16,000 cost-of-education allowance to the institution.',
    academicLevel: ['Postgraduate', 'Doctoral'],
    eligibleCourses: ['Engineering', 'Computer Science', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Geosciences'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 85,
    maxAnnualIncome: undefined,
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Public/Government', 'Private Accredited'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Statement of Purpose',
      'Recommendation letter'
    ],
    applicationStartDate: '2026-08-01',
    applicationDeadline: '2026-10-25',
    officialWebsiteUrl: 'https://www.nsfgrfp.org',
    verificationDate: '2026-09-15',
    applicationInstructions: [
      'Submit Graduate Research Plan Statement (maximum 2 pages).',
      'Submit Personal, Relevant Background and Future Goals Statement (maximum 3 pages).',
      'Request minimum three reference letters through the FastLane/Research.gov system.',
      'Upload official or unofficial transcripts for all completed postsecondary coursework.'
    ],
    importantNotices: [
      'Must be a U.S. citizen, national, or permanent resident by the application deadline.'
    ],
    isFeatured: true,
    renewableYears: 3
  },
  {
    id: 'sch-007',
    name: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    shortDescription: 'Empowering India’s youth through holistic support for first-year undergraduate degree programs.',
    fullDescription: 'The Reliance Foundation Undergraduate Scholarship aims to support meritorious students from all over India with their undergraduate college education. The program awards scholarships to first-year students enrolled in full-time regular undergraduate degree courses across any stream.',
    fundingType: 'corporate',
    category: 'Need-Based',
    awardAmount: 200000,
    currency: 'INR',
    awardType: 'full-ride',
    awardDetails: 'Up to ₹2,00,000 grant across the entire duration of the undergraduate study, plus leadership workshops.',
    academicLevel: ['Undergraduate'],
    eligibleCourses: ['Any', 'Engineering', 'Commerce', 'Science', 'Arts', 'Computer Science'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 60,
    maxAnnualIncome: 1500000, // Preference under 2.5L and up to 15L
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Public/Government', 'Private Accredited'],
    requiredDocuments: [
      'Identity proof',
      'Income certificate',
      'Academic marksheets',
      'Bonafide certificate',
      'Bank details'
    ],
    applicationStartDate: '2026-08-20',
    applicationDeadline: '2026-11-10',
    officialWebsiteUrl: 'https://www.reliancefoundation.org',
    verificationDate: '2026-10-05',
    applicationInstructions: [
      'Fill personal and academic details on the online Reliance Foundation application portal.',
      'Complete the mandatory 60-minute online aptitude test.',
      'Upload 12th standard mark statement and genuine college bonafide letter.',
      'Submit annual household income declaration document.'
    ],
    importantNotices: [
      'Students must have scored at least 60% in standard 12th exams and be enrolled in year 1 of UG.'
    ],
    isFeatured: false,
    renewableYears: 4
  },
  {
    id: 'sch-008',
    name: 'Chevening Scholarships for Master Degrees',
    provider: 'Foreign, Commonwealth & Development Office (UK Government)',
    shortDescription: 'UK government’s global scholarship programme offering future leaders unique opportunity to study in the UK.',
    fullDescription: 'Chevening is the UK government’s international awards programme aimed at developing global leaders. Funded by the Foreign, Commonwealth and Development Office and partner organisations, Chevening offers fully funded master’s degrees at any UK university.',
    fundingType: 'government',
    category: 'Merit',
    awardAmount: 32000,
    currency: 'GBP',
    awardType: 'full-ride',
    awardDetails: 'Fully funded tuition fees, monthly living allowance, return economy flights, and arrival allowances.',
    academicLevel: ['Postgraduate'],
    eligibleCourses: ['Any', 'Public Policy', 'Law', 'Environmental Science', 'Economics', 'Technology'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 75,
    maxAnnualIncome: undefined,
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Any'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Statement of Purpose',
      'Recommendation letter'
    ],
    applicationStartDate: '2026-08-05',
    applicationDeadline: '2026-11-05',
    officialWebsiteUrl: 'https://www.chevening.org',
    verificationDate: '2026-09-20',
    applicationInstructions: [
      'Choose three eligible UK master courses at distinct UK universities.',
      'Write four essay questions demonstrating leadership, networking, studying in the UK, and long-term career goals.',
      'Provide two verified references.',
      'Attend in-person or virtual interview at British High Commission/Embassy if shortlisted.'
    ],
    importantNotices: [
      'Requires minimum two years of work experience (equivalent to 2,800 hours).'
    ],
    isFeatured: true,
    renewableYears: 1
  },
  {
    id: 'sch-009',
    name: 'Adobe Research Women-in-Technology Scholarship',
    provider: 'Adobe Systems',
    shortDescription: 'Supporting female undergraduate and master students identifying as outstanding technical innovators.',
    fullDescription: 'To bring more diverse voices into technology, Adobe created the Women-in-Technology Scholarship. The program recognizes exceptional female university students worldwide studying Computer Science or related STEM disciplines.',
    fundingType: 'corporate',
    category: 'Women in Tech',
    awardAmount: 10000,
    currency: 'USD',
    awardType: 'one-time',
    awardDetails: '$10,000 financial stipend, a 1-year Adobe Creative Cloud subscription, and an interview for an internship at Adobe.',
    academicLevel: ['Undergraduate', 'Postgraduate'],
    eligibleCourses: ['Computer Science', 'Computer Engineering', 'Data Science', 'Human Computer Interaction'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 82,
    maxAnnualIncome: undefined,
    genderRequirement: 'Female',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Public/Government', 'Private Accredited'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Statement of Purpose',
      'Recommendation letter',
      'Bonafide certificate'
    ],
    applicationStartDate: '2026-09-01',
    applicationDeadline: '2026-11-28',
    officialWebsiteUrl: 'https://research.adobe.com',
    verificationDate: '2026-10-12',
    applicationInstructions: [
      'Submit comprehensive academic resume highlighting coding projects and GitHub repositories.',
      'Upload university transcripts reflecting strong coursework in data structures and algorithms.',
      'Submit three essay responses discussing technical passion and contributions to the tech community.',
      'Provide one academic reference letter.'
    ],
    importantNotices: [
      'Open to applicants identifying as female enrolled in second year or above.'
    ],
    isFeatured: true
  },
  {
    id: 'sch-010',
    name: 'California Middle Class Scholarship (MCS)',
    provider: 'California Student Aid Commission (CSAC)',
    shortDescription: 'State-funded undergraduate scholarship for middle-income students attending UC, CSU, or CCC colleges.',
    fullDescription: 'The Middle Class Scholarship (MCS) provides undergraduate students, including students pursuing a teaching credential, with scholarship support to attend the University of California (UC), California State University (CSU), or approved California Community Colleges.',
    fundingType: 'government',
    category: 'Need-Based',
    awardAmount: 4800,
    currency: 'USD',
    awardType: 'annual',
    awardDetails: 'Covers up to 10% to 40% of systemwide tuition and mandatory fees depending on family income brackets.',
    academicLevel: ['Undergraduate'],
    eligibleCourses: ['Any'],
    eligibleStates: ['California'],
    minPercentageOrGpa: 70, // 2.0+ GPA
    maxAnnualIncome: 217000, // Maximum annual household income limit $217,000
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Public/Government'],
    requiredDocuments: [
      'Identity proof',
      'Income certificate',
      'Academic marksheets',
      'Bank details'
    ],
    applicationStartDate: '2026-10-01',
    applicationDeadline: '2026-12-15',
    officialWebsiteUrl: 'https://www.csac.ca.gov',
    verificationDate: '2026-10-02',
    applicationInstructions: [
      'Complete the Free Application for Federal Student Aid (FAFSA) or CA Dream Act Application (CADAA).',
      'Designate eligible UC, CSU, or California Community College campuses.',
      'Maintain continuous full-time or half-time enrollment status in good standing.'
    ],
    importantNotices: [
      'Must be a California resident or eligible under AB 540 requirements.'
    ],
    isFeatured: false,
    renewableYears: 4
  },
  {
    id: 'sch-011',
    name: 'Fulbright-Nehru Master’s Fellowships',
    provider: 'US-India Educational Foundation (USIEF)',
    shortDescription: 'Fully-funded scholarships for outstanding Indian citizens to pursue Master’s degree at select US universities.',
    fullDescription: 'The Fulbright-Nehru Master’s Fellowships are designed for highly motivated individuals who demonstrate leadership qualities, have completed the equivalent of a U.S. bachelor’s degree, and have at least three years of professional work experience.',
    fundingType: 'government',
    category: 'Merit',
    awardAmount: 50000,
    currency: 'USD',
    awardType: 'full-ride',
    awardDetails: 'Full tuition, J-1 visa support, monthly living stipend, roundtrip airfare, and health benefit coverage.',
    academicLevel: ['Postgraduate'],
    eligibleCourses: ['Environmental Science', 'Public Administration', 'Public Health', 'Arts and Culture Management', 'Urban Planning', 'Economics'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 75,
    maxAnnualIncome: undefined,
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Any'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Statement of Purpose',
      'Recommendation letter',
      'Other'
    ],
    applicationStartDate: '2026-02-01',
    applicationDeadline: '2026-12-10',
    officialWebsiteUrl: 'https://www.usief.org.in',
    verificationDate: '2026-09-30',
    applicationInstructions: [
      'Submit online application through the official USIEF portal.',
      'Upload study/research objectives statement and personal statement.',
      'Provide three confidential letters of recommendation from academic and professional supervisors.',
      'Complete employer endorsement form if currently employed.'
    ],
    importantNotices: [
      'Applicants must return to home country upon completion of fellowship.'
    ],
    isFeatured: true,
    renewableYears: 2
  },
  {
    id: 'sch-012',
    name: 'Narotam Sekhsaria Post-Graduate Scholarship',
    provider: 'Narotam Sekhsaria Foundation',
    shortDescription: 'Interest-free merit loan scholarships for Indian students pursuing postgraduate studies at prestigious universities.',
    fullDescription: 'The Narotam Sekhsaria Foundation awards interest-free loan scholarships to Indian students with a consistently good academic record. The scholarships are granted to students who wish to pursue their postgraduate degrees in fields such as Pure Sciences, Applied Sciences, Social Sciences, Humanities, Law, and Architecture.',
    fundingType: 'ngo',
    category: 'Merit',
    awardAmount: 2000000,
    currency: 'INR',
    awardType: 'one-time',
    awardDetails: 'Up to ₹20,00,000 interest-free loan scholarship repayable over a structured timeline after course completion.',
    academicLevel: ['Postgraduate', 'Doctoral'],
    eligibleCourses: ['Engineering', 'Architecture', 'Law', 'Science', 'Management', 'Humanities'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 75,
    maxAnnualIncome: undefined,
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Any'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Statement of Purpose',
      'Recommendation letter',
      'Bank details'
    ],
    applicationStartDate: '2026-01-10',
    applicationDeadline: '2026-11-25',
    officialWebsiteUrl: 'https://pg.nsfoundation.co.in',
    verificationDate: '2026-10-14',
    applicationInstructions: [
      'Complete registration on the foundation scholarship portal.',
      'Upload statement of purpose explaining your study plans and post-degree career vision.',
      'Submit university admission confirmation letter and breakdown of expected fees.',
      'Shortlisted candidates must attend an interview before an expert selection panel in Mumbai/virtual.'
    ],
    importantNotices: [
      'Indian nationals residing in India who are graduates from an accredited Indian university.'
    ],
    isFeatured: false
  },
  {
    id: 'sch-013',
    name: 'Jack Kent Cooke Undergraduate Transfer Scholarship',
    provider: 'Jack Kent Cooke Foundation',
    shortDescription: 'Highly competitive national scholarship for community college students transferring to 4-year institutions.',
    fullDescription: 'The Cooke Undergraduate Transfer Scholarship is a highly selective scholarship for the nation’s top community college students seeking to complete their bachelor’s degrees at four-year accredited colleges or universities.',
    fundingType: 'private',
    category: 'First-Generation',
    awardAmount: 55000,
    currency: 'USD',
    awardType: 'annual',
    awardDetails: 'Up to $55,000 per year for up to three years to cover educational expenses including tuition, living costs, books, and fees.',
    academicLevel: ['Undergraduate'],
    eligibleCourses: ['Any', 'STEM', 'Humanities', 'Business', 'Arts'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 87, // 3.5+ GPA
    maxAnnualIncome: 95000, // Pell Grant eligible or family income under $95k
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Community College'],
    requiredDocuments: [
      'Identity proof',
      'Income certificate',
      'Academic marksheets',
      'Recommendation letter',
      'Statement of Purpose'
    ],
    applicationStartDate: '2026-09-01',
    applicationDeadline: '2026-11-12',
    officialWebsiteUrl: 'https://www.jkcf.org',
    verificationDate: '2026-10-18',
    applicationInstructions: [
      'Complete the Cooke Transfer Application via Common App for Transfer.',
      'Provide two academic evaluations from community college professors.',
      'Submit family financial documentation (federal tax forms / W-2s).',
      'Upload comprehensive essay responses addressing persistence, curiosity, and leadership.'
    ],
    importantNotices: [
      'Must be currently enrolled in an accredited community college or two-year institution.'
    ],
    isFeatured: true,
    renewableYears: 3
  },
  {
    id: 'sch-014',
    name: 'HDFC Educational Crisis Scholarship Support (ECSS)',
    provider: 'HDFC Bank Parivartan',
    shortDescription: 'Financial safety net for school and college students facing sudden personal or economic distress.',
    fullDescription: 'HDFC Bank’s ECSS program aims to support students in school and college who are at risk of dropping out due to sudden personal or family crisis, such as loss of earning parent or critical medical emergencies.',
    fundingType: 'corporate',
    category: 'Need-Based',
    awardAmount: 75000,
    currency: 'INR',
    awardType: 'annual',
    awardDetails: 'Direct one-time financial grant of up to ₹75,000 to cover annual academic school/college fees.',
    academicLevel: ['High School', 'Undergraduate', 'Postgraduate', 'Diploma'],
    eligibleCourses: ['Any'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 55,
    maxAnnualIncome: 600000,
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Public/Government', 'Private Accredited'],
    requiredDocuments: [
      'Identity proof',
      'Income certificate',
      'Academic marksheets',
      'Bonafide certificate',
      'Bank details',
      'Other' // Crisis proof document
    ],
    applicationStartDate: '2026-08-01',
    applicationDeadline: '2026-12-20',
    officialWebsiteUrl: 'https://www.hdfcbank.com',
    verificationDate: '2026-10-24',
    applicationInstructions: [
      'Apply online with current enrollment details and college fee structure.',
      'Upload document validating crisis (death certificate of earning parent, hospital bills, or layoff notice).',
      'Provide current year marksheet and bonafide student status letter.',
      'Submit applicant or guardian bank account details with cancelled cheque.'
    ],
    importantNotices: [
      'Requires documented evidence of crisis occurred within the preceding two years.'
    ],
    isFeatured: false,
    renewableYears: 1
  },
  {
    id: 'sch-015',
    name: 'Erasmus Mundus Joint Masters Scholarship',
    provider: 'European Commission',
    shortDescription: 'EU-funded high-level integrated study programmes delivered by an international consortium of higher education institutions.',
    fullDescription: 'Erasmus Mundus Joint Masters are high-level integrated study programmes designed and delivered by an international partnership of higher education institutions. The scholarship covers participation costs, travel, and a living allowance for the duration of the 2-year master programme across at least two European countries.',
    fundingType: 'government',
    category: 'Merit',
    awardAmount: 34000,
    currency: 'EUR',
    awardType: 'full-ride',
    awardDetails: 'Covers full tuition fees, health insurance, and monthly living allowance of €1,400 for up to 24 months.',
    academicLevel: ['Postgraduate'],
    eligibleCourses: ['Computer Science', 'Environmental Science', 'Robotics', 'Public Health', 'Humanities', 'Engineering'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 78,
    maxAnnualIncome: undefined,
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Any'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Statement of Purpose',
      'Recommendation letter',
      'Other' // Language proficiency test
    ],
    applicationStartDate: '2026-09-15',
    applicationDeadline: '2026-12-30',
    officialWebsiteUrl: 'https://erasmus-plus.ec.europa.eu',
    verificationDate: '2026-10-22',
    applicationInstructions: [
      'Consult the EMJM catalogue to choose an approved master program consortium.',
      'Apply directly to the consortium managing the chosen program.',
      'Submit verified degree certificate and English proficiency test (IELTS/TOEFL).',
      'Include curriculum vitae formatted in Europass format.'
    ],
    importantNotices: [
      'Students must study in at least two different European countries during their program.'
    ],
    isFeatured: true,
    renewableYears: 2
  },
  {
    id: 'sch-016',
    name: 'AAUW International Fellowships for Women',
    provider: 'American Association of University Women (AAUW)',
    shortDescription: 'Fellowships supporting women pursuing full-time graduate or postdoctoral study in the United States.',
    fullDescription: 'AAUW International Fellowships provide support for women pursuing full-time graduate or postdoctoral study in the United States who are not U.S. citizens or permanent residents. Recipients are selected for academic achievement and demonstrated commitment to the advancement of women and girls.',
    fundingType: 'ngo',
    category: 'Women in Tech',
    awardAmount: 25000,
    currency: 'USD',
    awardType: 'annual',
    awardDetails: '$20,000 for Master’s/first professional degree; $25,000 for Doctoral; $50,000 for Postdoctoral study.',
    academicLevel: ['Postgraduate', 'Doctoral'],
    eligibleCourses: ['Any', 'STEM', 'Social Sciences', 'Law', 'Medicine', 'Education'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 80,
    maxAnnualIncome: undefined,
    genderRequirement: 'Female',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Public/Government', 'Private Accredited'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Statement of Purpose',
      'Recommendation letter'
    ],
    applicationStartDate: '2026-08-01',
    applicationDeadline: '2026-11-15',
    officialWebsiteUrl: 'https://www.aauw.org',
    verificationDate: '2026-10-11',
    applicationInstructions: [
      'Complete online eligibility quiz on AAUW website.',
      'Submit transcripts with certified English translations and GPA conversions.',
      'Upload three recommendation letters from professors or mentors.',
      'Submit proof of master or doctoral degree program admission.'
    ],
    importantNotices: [
      'Applicants must intend to return to their home country to pursue a professional career.'
    ],
    isFeatured: false,
    renewableYears: 1
  },
  {
    id: 'sch-017',
    name: 'Inlaks Shivdasani Foundation Scholarships',
    provider: 'Inlaks Shivdasani Foundation',
    shortDescription: 'Grants for Indian students with exceptional talent to study at top American, European, and UK institutions.',
    fullDescription: 'Inlaks Shivdasani Scholarships provide funding for young Indians of exceptional talent to read for full-time master’s or doctoral programmes at top-tier universities in North America and Europe. The foundation emphasizes creative and unique potential.',
    fundingType: 'ngo',
    category: 'Special Talent',
    awardAmount: 100000,
    currency: 'USD',
    awardType: 'full-ride',
    awardDetails: 'Comprehensive coverage up to $100,000 for tuition fees, living expenses, one-way travel, and health insurance.',
    academicLevel: ['Postgraduate', 'Doctoral'],
    eligibleCourses: ['Fine Arts', 'Music', 'Architecture', 'Theatre', 'Environmental Studies', 'Humanities', 'Pure Mathematics'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 75,
    maxAnnualIncome: undefined,
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['Any'],
    institutionTypeAllowed: ['Any'],
    requiredDocuments: [
      'Identity proof',
      'Academic marksheets',
      'Statement of Purpose',
      'Recommendation letter',
      'Other' // Portfolio / Audition sample
    ],
    applicationStartDate: '2026-02-15',
    applicationDeadline: '2026-12-15',
    officialWebsiteUrl: 'https://www.inlaksfoundation.org',
    verificationDate: '2026-10-16',
    applicationInstructions: [
      'Secure unconditional or conditional offer letter from target university.',
      'Submit portfolio or evidence of artistic/intellectual distinction where applicable.',
      'Submit evidence of previous academic honors, exhibitions, or research papers.',
      'Two rounds of interviews in front of the Inlaks Selection Committee.'
    ],
    importantNotices: [
      'Does not cover Computer Science, Business Management, or Medicine courses.'
    ],
    isFeatured: false
  },
  {
    id: 'sch-018',
    name: 'State Post-Matric Scholarship Scheme',
    provider: 'Ministry of Social Justice and Empowerment (Govt. of India)',
    shortDescription: 'Centrally sponsored financial assistance for post-matriculation or post-secondary stages of education.',
    fullDescription: 'This scholarship scheme aims to support students from reserved categories (SC/ST/OBC/EWS) pursuing post-matriculation or post-secondary courses in government or government-aided institutions to enable them to complete their education.',
    fundingType: 'government',
    category: 'Minority/Category',
    awardAmount: 45000,
    currency: 'INR',
    awardType: 'annual',
    awardDetails: 'Full reimbursement of non-refundable compulsory institutional fees plus maintenance allowance of ₹1,200/month.',
    academicLevel: ['Undergraduate', 'Postgraduate', 'Diploma'],
    eligibleCourses: ['Any', 'Engineering', 'Arts', 'Science', 'Commerce', 'Medicine'],
    eligibleStates: ['All'],
    minPercentageOrGpa: 50,
    maxAnnualIncome: 250000, // Rs 2.5 Lakh income ceiling
    genderRequirement: 'All',
    casteOrCategoryRequirement: ['SC', 'ST', 'OBC', 'EWS'],
    institutionTypeAllowed: ['Public/Government', 'Private Accredited'],
    requiredDocuments: [
      'Identity proof',
      'Income certificate',
      'Caste/category certificate',
      'Academic marksheets',
      'Bonafide certificate',
      'Bank details'
    ],
    applicationStartDate: '2026-07-01',
    applicationDeadline: '2026-11-30',
    officialWebsiteUrl: 'https://scholarships.gov.in',
    verificationDate: '2026-10-25',
    applicationInstructions: [
      'Apply online on the National Scholarship Portal (NSP).',
      'Verify Aadhaar demographic details.',
      'Upload valid competent revenue authority income certificate issued in the current financial year.',
      'Provide valid caste certificate issued by Sub-Divisional Magistrate / Tahsildar.'
    ],
    importantNotices: [
      'Family income ceiling is ₹2.50 lakh per annum. Valid only for recognized courses.'
    ],
    isFeatured: false,
    renewableYears: 4
  }
];
