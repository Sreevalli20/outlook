import { EssayTemplate } from '../types/template';

export const ESSAY_TEMPLATES_DATA: EssayTemplate[] = [
  {
    id: 'tmpl-personal-statement',
    title: 'Comprehensive Personal Statement (The Journey & Purpose Framework)',
    category: 'Personal Statement',
    targetLength: '500 - 650 words',
    description: 'A structured narrative essay showcasing your foundational motivations, intellectual turning points, academic rigor, and future aspirations.',
    structure: [
      {
        heading: 'Hook & Intellectual Origin (100 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Open with an authentic scene or formative observation that ignited your curiosity in your chosen field. Avoid clichés like "ever since I was a child".'
      },
      {
        heading: 'Academic & Practical Immersion (200 words)',
        recommendedLength: '1-2 Paragraphs',
        guidance: 'Demonstrate active learning. Detail a specific research project, academic challenge, or hands-on initiative where you applied concepts beyond the classroom.'
      },
      {
        heading: 'Navigating Constraints & Resilience (150 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Explain an obstacle you faced and the concrete problem-solving mindset you used to overcome it without adopting a tone of helplessness.'
      },
      {
        heading: 'Vision, University Impact & Gratitude (100 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Tie together your future professional goals with how this specific scholarship provides the catalyst to achieve public-minded impact.'
      }
    ],
    content: `Growing up in [Your Hometown/Community], my interest in [Your Field of Study, e.g., Computational Biology] was shaped by a simple yet persistent observation: [Describe an early question, challenge, or observation that caught your attention]. While many perceived [Mention a common problem or assumption], I saw an opportunity to explore how [Your Area of Interest] could create practical, measurable solutions.

During my studies at [Your Current Institution/High School], I transitioned this theoretical curiosity into disciplined action. In my coursework and independent projects, particularly [Mention a specific project, lab experiment, or course], I investigated [Brief summary of project objective]. When faced with [Mention a specific technical or logistical hurdle, e.g., anomalous algorithmic results or limited lab resources], I [Explain the concrete methodology or collaborative step you took]. This endeavor not only deepened my technical command of [Mention 1-2 skills, e.g., statistical modeling and data analysis], but also cemented my commitment to [Your academic focus].

However, my trajectory has not been devoid of friction. As a [Mention your background, e.g., first-generation college student / working student], balancing academic demands with [Mention responsibility, e.g., family support or financing tuition] required exceptional prioritization. Rather than viewing these constraints as liabilities, they refined my capacity for perseverance and purposeful time management.

Receiving the [Scholarship Name or "educational scholarship"] will significantly alleviate the financial obligations that currently constrain my academic focus. It will allow me to dedicate my full energy to [Mention specific plan: advanced research, capstone development, or internship training]. With this investment, I aspire to [State your 5-year post-graduation goal, e.g., lead inclusive healthcare tech initiatives], creating a compounding return for the community that supported my education.`,
    tips: [
      'Replace all bracketed [Placeholders] with specific, quantifiable details from your own life.',
      'Show, don\'t just tell: use concrete action verbs ("engineered", "spearheaded", "synthesized").',
      'Keep your tone humble, grounded, and focused on future accountability.'
    ]
  },
  {
    id: 'tmpl-leadership-essay',
    title: 'Demonstrated Leadership & Community Impact Essay',
    category: 'Leadership',
    targetLength: '400 - 500 words',
    description: 'Designed for competitive corporate, foundation, and institutional awards that evaluate initiative, peer mentorship, and ethical leadership.',
    structure: [
      {
        heading: 'Definition of Servant Leadership (75 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Define leadership as empathy, strategic organization, and empowerment of others rather than title or authority.'
      },
      {
        heading: 'The Catalyst Incident & Team Formation (175 words)',
        recommendedLength: '1-2 Paragraphs',
        guidance: 'Describe an unmet community or club challenge you took initiative to organize and solve.'
      },
      {
        heading: 'Quantifiable Results & Lessons Learned (150 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Provide concrete metrics: how many people were helped, funds raised, or efficiency improvements created.'
      }
    ],
    content: `To me, leadership is not defined by holding a formal title or commanding a room; it is the discipline of recognizing an unaddressed need and organizing collective energy to build enduring solutions. 

My commitment to this principle crystallized when I served as [Your Role, e.g., President / Project Lead / Student Coordinator] for [Organization, Club, or Community Initiative]. At the time, our group encountered a critical challenge: [Describe the bottleneck or problem, e.g., declining member engagement or lack of tutoring support for underrepresented students]. Recognizing that a top-down mandate would fail, I initiated [Describe your proactive action: e.g., peer-led listening sessions and decentralized working groups]. 

To execute our objective, I collaborated with [Mention stakeholders, e.g., faculty advisors, community elders, and fellow students] to construct [Name the program or initiative you launched]. When [Describe a team conflict, deadline pressure, or logistical breakdown occurred], I maintained transparency by [Explain how you mediated or adapted the strategy]. 

Under this unified approach, our initiative achieved [Mention 1-2 quantifiable outcomes: e.g., mentored 45 first-year students, increased retention by 35%, or secured partnership with 3 local non-profits]. More importantly, the system was built sustainably so subsequent cohorts could continue the mission.

This scholarship will empower me to scale these leadership frameworks into higher education and beyond. As I pursue [Your Degree], I plan to establish [Mention a student club, mentorship initiative, or campus forum], ensuring that the support I receive directly translates into lifting others as I climb.`,
    tips: [
      'Focus on "We" alongside "I": exceptional scholarship committees value collaborative empowerment over solitary achievement.',
      'Always include measurable impact: numbers, percentages, participants, or longevity of the program.',
      'Demonstrate how your leadership style reflects accountability and active listening.'
    ]
  },
  {
    id: 'tmpl-financial-need-essay',
    title: 'Financial Need, Economic Resilience & Vision Statement',
    category: 'Financial Need',
    targetLength: '350 - 500 words',
    description: 'A dignified, honest, and transparent explanation of financial hardship, showing how funding removes barriers to academic excellence.',
    structure: [
      {
        heading: 'Contextualizing Household Economics (100 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'State your family or individual financial background with dignity and clarity. Cite specific circumstances like medical events, single-parent household, or dependents.'
      },
      {
        heading: 'Self-Help & Financial Responsibility (150 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Detail how you have taken responsibility: working part-time, maintaining good grades, saving, and applying for grants.'
      },
      {
        heading: 'Direct Academic Return on Investment (150 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Detail exactly which costs this scholarship will alleviate (e.g., tuition balance, lab supplies, transportation) and what it frees you to achieve.'
      }
    ],
    content: `Pursuing higher education at [Your University/College] represents the culmination of immense sacrifice for my family. With an annual household income of [State income or "limited resources"], my family supports [Mention dependents or circumstances: e.g., three siblings / elderly grandparents with ongoing medical care]. Despite my parents' unwavering encouragement, covering institutional tuition, books, and living expenses poses a persistent economic challenge that requires constant vigilance.

Rather than allowing financial vulnerability to curtail my ambitions, I have taken active responsibility for my educational funding. Throughout the academic year, I maintain [Mention your job: e.g., a 20-hour weekly position as an on-campus laboratory assistant / retail associate] while carrying a rigorous full-time course load of [Number] credits and holding a [Your GPA or Marks %] aggregate. This discipline has taught me resourcefulness and resilience, but it also creates severe time compression, limiting my ability to engage in uncompensated research internships that are critical for graduate preparation.

The [Scholarship Name] would serve as a transformative catalyst in my academic journey. Specifically, this award would cover [Mention exact utility: e.g., tuition shortfall / laboratory equipment / mandatory semester course fees], eliminating the necessity of working multiple overlapping shifts during critical exam periods. 

By relieving this financial pressure, this grant will allow me to channel my full concentration toward [Mention academic priority: e.g., my capstone engineering thesis / clinical clinical hours]. I view this award not merely as assistance, but as a mutual pact: an investment that I will honor through academic distinction and lifelong community stewardship.`,
    tips: [
      'Never exaggerate, but do not minimize genuine hardship; scholarship trustees respect clarity and candor.',
      'Showcase your agency: emphasize work-study, frugality, and proactive financial responsibility.',
      'Specify how removing this barrier directly elevates your academic or community contributions.'
    ]
  },
  {
    id: 'tmpl-diversity-stem',
    title: 'Diversity in STEM, Innovation & Technical Problem Solving',
    category: 'STEM & Innovation',
    targetLength: '450 - 600 words',
    description: 'Tailored for tech corporations (Google, Adobe, Microsoft), STEM councils, and engineering societies championing inclusion.',
    structure: [
      {
        heading: 'The Underrepresentation Gap (100 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Reflect on what being an underrepresented voice in STEM means to you and the perspectives you bring to engineering.'
      },
      {
        heading: 'Technical Project Highlight (200 words)',
        recommendedLength: '1-2 Paragraphs',
        guidance: 'Highlight a technical build, coding repo, or mathematical problem you solved with precision.'
      },
      {
        heading: 'Inclusive Future & Mentorship Pipeline (150 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Explain how you will open doors for future underrepresented technologists and researchers.'
      }
    ],
    content: `When I first stepped into my university's advanced [Mention course, e.g., Data Structures / Robotics Laboratory], the stark absence of [Mention your community: e.g., female engineers / first-generation minority students] was unmistakable. While this demographic reality can initially evoke feelings of isolation, it fundamentally deepened my resolve to ensure that the technologies shaping our world are architected by those who reflect its diversity.

Technology is inherently normative; algorithms and engineering designs embody the assumptions of their creators. My technical passion centers on [Mention your research or technical passion, e.g., designing accessible computing interfaces / ethical machine learning / renewable energy storage]. In my project [Name of Project or Repository], I worked to address [Mention specific problem]. Utilizing [Technologies used: e.g., Python, PyTorch, and React], I engineered [Describe the technical outcome]. Encountering [Describe a bug or technical challenge], I conducted [Describe testing or analytical debugging], ultimately delivering a solution that [Quantifiable technical metric: e.g., reduced latency by 40% / provided accessibility features for low-vision users].

Beyond personal technical proficiency, I am dedicated to expanding the technical pipeline. As a volunteer with [Organization or campus group], I have facilitated introductory coding workshops for [Audience: e.g., middle school girls / underprivileged youth], guiding them through their first interactive software builds. Witnessing their transition from consumers of technology to confident builders reinforces my core belief: innovation flourishes when diverse perspectives converge.

Receiving this scholarship will enable me to participate in [Mention conference, internship, or open-source research]. With your support, I look forward to advancing technical boundaries as an innovator and ensuring that the door remains wide open for every aspiring technologist who follows.`,
    tips: [
      'Name specific tools, languages, and methodologies (e.g., Python, CAD, React, statistical regressions) to demonstrate technical depth.',
      'Connect diverse perspectives directly to technical innovation and superior engineering solutions.',
      'Highlight active participation in mentorship or knowledge sharing.'
    ]
  },
  {
    id: 'tmpl-community-service',
    title: 'Civic Responsibility, Volunteerism & Community Service Essay',
    category: 'Community Service',
    targetLength: '400 - 500 words',
    description: 'Ideal for philanthropic grants, civic organizations, Rotary/Lions clubs, and public welfare foundations.',
    structure: [
      {
        heading: 'The Genesis of Community Engagement (75 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Describe your personal connection to a social cause, local community issue, or vulnerable population.'
      },
      {
        heading: 'Direct Hands-On Service (200 words)',
        recommendedLength: '1-2 Paragraphs',
        guidance: 'Recount a specific, sustained service initiative you organized or committed personal time to.'
      },
      {
        heading: 'Civic Impact & Long-term Commitment (150 words)',
        recommendedLength: '1 Paragraph',
        guidance: 'Synthesize how this commitment will shape your future career and personal ethos.'
      }
    ],
    content: `Genuine community service begins with deep listening. Early in my academic career, I realized that lasting civic impact cannot be accomplished through superficial or one-off volunteer hours; it demands sustained presence and humility alongside the individuals we seek to serve.

For the past [Time period, e.g., two years], I have dedicated my weekends to [Name of Community Organization, e.g., the Metropolitan Food Security Network / Youth Literacy Initiative]. Serving as [Your Role], my primary responsibility involved [Describe your ongoing service task]. During this time, I noticed [Describe a gap or unmet community need]. Rather than waiting for external direction, I partnered with [Mention fellow volunteers or community leaders] to establish [Name of the initiative or improvement you created].

Through this initiative, we were able to [Quantifiable service impact: e.g., distribute over 2,500 meals / tutor 30 elementary students in foundational math]. However, the most profound impact occurred in my own perspective. I learned that empowerment is reciprocal; working with [Mention group] taught me profound lessons regarding resilience, mutual aid, and systemic equity.

As I pursue my degree in [Your Field of Study], my civic commitment will remain the compass guiding my professional decisions. Whether developing [Mention career deliverable: e.g., public health programs / sustainable urban infrastructure / legal aid clinics], I intend to integrate service into my core vocation. This scholarship will alleviate the financial strain of my educational fees, allowing me to continue dedicating substantive time to public service throughout my college years.`,
    tips: [
      'Emphasize consistency and genuine empathy over resume-padding numbers.',
      'Acknowledge what you learned from the community you served.',
      'Connect community volunteerism directly to your career and academic mission.'
    ]
  }
];
