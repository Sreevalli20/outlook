import { Scholarship, ScholarshipEligibilityEvaluation, EligibilityStatus, EligibilityCriterionResult } from '../types/scholarship';
import { StudentProfile } from '../types/student';
import { convertCurrency } from './currency';

/**
 * Normalizes course strings for flexible comparison
 * (e.g. "Computer Science and Engineering" matches "Computer Science")
 */
function courseMatches(studentCourse: string, eligibleCourses: string[]): boolean {
  if (eligibleCourses.includes('Any')) return true;
  if (!studentCourse || studentCourse.trim() === '') return false;
  const normalizedStudent = studentCourse.toLowerCase().trim();
  return eligibleCourses.some((c) => {
    const normalizedTarget = c.toLowerCase().trim();
    return normalizedStudent.includes(normalizedTarget) || normalizedTarget.includes(normalizedStudent);
  });
}

/**
 * Currency conversion heuristic for income comparison
 * (approximate baseline for threshold checking)
 */
function normalizeIncomeToScholarshipCurrency(
  studentIncome: number,
  studentCurrency: 'USD' | 'INR' | 'EUR' | 'GBP',
  scholarshipCurrency: 'USD' | 'INR' | 'EUR' | 'GBP'
): number {
  return convertCurrency(studentIncome, studentCurrency, scholarshipCurrency);
}

export function evaluateScholarshipEligibility(
  scholarship: Scholarship,
  profile: StudentProfile
): ScholarshipEligibilityEvaluation {
  const passedCriteria: EligibilityCriterionResult[] = [];
  const failedCriteria: EligibilityCriterionResult[] = [];
  const missingCriteria: EligibilityCriterionResult[] = [];

  const { personal, academic, eligibility } = profile;

  // 1. Academic Level Check
  if (!academic.academicLevel) {
    missingCriteria.push({
      criterion: 'Academic Level',
      status: 'missing_data',
      explanation: 'Academic level (Undergraduate, Postgraduate, etc.) is not set in your student profile.'
    });
  } else if (scholarship.academicLevel.includes(academic.academicLevel)) {
    passedCriteria.push({
      criterion: 'Academic Level',
      status: 'passed',
      studentValue: academic.academicLevel,
      requiredValue: scholarship.academicLevel.join(', '),
      explanation: `Your level (${academic.academicLevel}) meets the program requirement.`
    });
  } else {
    failedCriteria.push({
      criterion: 'Academic Level',
      status: 'failed',
      studentValue: academic.academicLevel,
      requiredValue: scholarship.academicLevel.join(', '),
      explanation: `Requires enrollment at ${scholarship.academicLevel.join(' or ')} level.`
    });
  }

  // 2. Minimum Marks / GPA Percentage Check
  if (academic.marksPercentage === undefined || academic.marksPercentage === null || academic.marksPercentage === 0) {
    missingCriteria.push({
      criterion: 'Academic Performance (Marks / GPA)',
      status: 'missing_data',
      requiredValue: `${scholarship.minPercentageOrGpa}%`,
      explanation: 'Academic marks or percentage is missing from your profile.'
    });
  } else if (academic.marksPercentage >= scholarship.minPercentageOrGpa) {
    passedCriteria.push({
      criterion: 'Academic Performance',
      status: 'passed',
      studentValue: `${academic.marksPercentage}%`,
      requiredValue: `Min ${scholarship.minPercentageOrGpa}%`,
      explanation: `Your aggregate (${academic.marksPercentage}%) satisfies the minimum threshold of ${scholarship.minPercentageOrGpa}%.`
    });
  } else {
    failedCriteria.push({
      criterion: 'Academic Performance',
      status: 'failed',
      studentValue: `${academic.marksPercentage}%`,
      requiredValue: `Min ${scholarship.minPercentageOrGpa}%`,
      explanation: `Your marks (${academic.marksPercentage}%) are below the minimum ${scholarship.minPercentageOrGpa}% cutoff.`
    });
  }

  // 3. Eligible Courses / Discipline Check
  if (!academic.course || academic.course.trim() === '') {
    missingCriteria.push({
      criterion: 'Course / Discipline',
      status: 'missing_data',
      requiredValue: scholarship.eligibleCourses.join(', '),
      explanation: 'Current course of study is not filled in your academic profile.'
    });
  } else if (courseMatches(academic.course, scholarship.eligibleCourses)) {
    passedCriteria.push({
      criterion: 'Course / Discipline',
      status: 'passed',
      studentValue: academic.course,
      requiredValue: scholarship.eligibleCourses.join(', '),
      explanation: `Your course (${academic.course}) is recognized by the scholarship stream.`
    });
  } else {
    failedCriteria.push({
      criterion: 'Course / Discipline',
      status: 'failed',
      studentValue: academic.course,
      requiredValue: scholarship.eligibleCourses.join(', '),
      explanation: `Restricted to students in: ${scholarship.eligibleCourses.join(', ')}.`
    });
  }

  // 4. Annual Family Income Check (if Need-Based)
  if (scholarship.maxAnnualIncome !== undefined && scholarship.maxAnnualIncome > 0) {
    if (eligibility.annualFamilyIncome === undefined || eligibility.annualFamilyIncome === null) {
      missingCriteria.push({
        criterion: 'Annual Household Income',
        status: 'missing_data',
        requiredValue: `< ${scholarship.currency} ${scholarship.maxAnnualIncome.toLocaleString()}`,
        explanation: 'Annual family income details are needed to assess need-based criteria.'
      });
    } else {
      const normalizedIncome = normalizeIncomeToScholarshipCurrency(
        eligibility.annualFamilyIncome,
        eligibility.incomeCurrency,
        scholarship.currency
      );

      if (normalizedIncome <= scholarship.maxAnnualIncome) {
        passedCriteria.push({
          criterion: 'Annual Household Income',
          status: 'passed',
          studentValue: `${eligibility.incomeCurrency} ${eligibility.annualFamilyIncome.toLocaleString()}`,
          requiredValue: `Max ${scholarship.currency} ${scholarship.maxAnnualIncome.toLocaleString()}`,
          explanation: `Household income meets the maximum financial ceiling.`
        });
      } else {
        failedCriteria.push({
          criterion: 'Annual Household Income',
          status: 'failed',
          studentValue: `${eligibility.incomeCurrency} ${eligibility.annualFamilyIncome.toLocaleString()}`,
          requiredValue: `Max ${scholarship.currency} ${scholarship.maxAnnualIncome.toLocaleString()}`,
          explanation: `Reported income exceeds the allowable financial ceiling (${scholarship.currency} ${scholarship.maxAnnualIncome.toLocaleString()}).`
        });
      }
    }
  }

  // 5. Gender Requirement Check
  if (scholarship.genderRequirement && scholarship.genderRequirement !== 'All') {
    if (!eligibility.gender || eligibility.gender === 'Prefer not to say') {
      missingCriteria.push({
        criterion: 'Gender Eligibility',
        status: 'missing_data',
        requiredValue: scholarship.genderRequirement,
        explanation: `This program is targeted towards ${scholarship.genderRequirement} scholars, but your gender is unspecified.`
      });
    } else if (eligibility.gender === scholarship.genderRequirement) {
      passedCriteria.push({
        criterion: 'Gender Eligibility',
        status: 'passed',
        studentValue: eligibility.gender,
        requiredValue: scholarship.genderRequirement,
        explanation: `Matches gender criteria for this scholarship.`
      });
    } else {
      failedCriteria.push({
        criterion: 'Gender Eligibility',
        status: 'failed',
        studentValue: eligibility.gender,
        requiredValue: scholarship.genderRequirement,
        explanation: `Restricted to applicants identifying as ${scholarship.genderRequirement}.`
      });
    }
  }

  // 6. Category / Caste Requirement Check
  if (
    scholarship.casteOrCategoryRequirement &&
    scholarship.casteOrCategoryRequirement.length > 0 &&
    !scholarship.casteOrCategoryRequirement.includes('Any')
  ) {
    if (!eligibility.category) {
      missingCriteria.push({
        criterion: 'Social Category / Reservation',
        status: 'missing_data',
        requiredValue: scholarship.casteOrCategoryRequirement.join(', '),
        explanation: 'Social category is missing in profile.'
      });
    } else if (scholarship.casteOrCategoryRequirement.includes(eligibility.category)) {
      passedCriteria.push({
        criterion: 'Social Category / Reservation',
        status: 'passed',
        studentValue: eligibility.category,
        requiredValue: scholarship.casteOrCategoryRequirement.join(', '),
        explanation: `Your category (${eligibility.category}) matches program eligibility.`
      });
    } else {
      failedCriteria.push({
        criterion: 'Social Category / Reservation',
        status: 'failed',
        studentValue: eligibility.category,
        requiredValue: scholarship.casteOrCategoryRequirement.join(', '),
        explanation: `Reserved for candidates belonging to: ${scholarship.casteOrCategoryRequirement.join(', ')}.`
      });
    }
  }

  // 7. State or Geographic Location Check
  if (
    scholarship.eligibleStates &&
    scholarship.eligibleStates.length > 0 &&
    !scholarship.eligibleStates.includes('All')
  ) {
    if (!personal.state) {
      missingCriteria.push({
        criterion: 'State Residency',
        status: 'missing_data',
        requiredValue: scholarship.eligibleStates.join(', '),
        explanation: 'State of residence is not specified in profile.'
      });
    } else if (scholarship.eligibleStates.includes(personal.state)) {
      passedCriteria.push({
        criterion: 'State Residency',
        status: 'passed',
        studentValue: personal.state,
        requiredValue: scholarship.eligibleStates.join(', '),
        explanation: `Residency in ${personal.state} satisfies state criteria.`
      });
    } else {
      failedCriteria.push({
        criterion: 'State Residency',
        status: 'failed',
        studentValue: personal.state,
        requiredValue: scholarship.eligibleStates.join(', '),
        explanation: `Restricted to residents of ${scholarship.eligibleStates.join(', ')}.`
      });
    }
  }

  // 8. Institution Type Check (e.g., Community College or Public)
  if (
    scholarship.institutionTypeAllowed &&
    scholarship.institutionTypeAllowed.length > 0 &&
    !scholarship.institutionTypeAllowed.includes('Any')
  ) {
    if (!eligibility.institutionType) {
      missingCriteria.push({
        criterion: 'Institution Type',
        status: 'missing_data',
        requiredValue: scholarship.institutionTypeAllowed.join(', '),
        explanation: 'Type of college/institution is not set in profile.'
      });
    } else if (scholarship.institutionTypeAllowed.includes(eligibility.institutionType)) {
      passedCriteria.push({
        criterion: 'Institution Type',
        status: 'passed',
        studentValue: eligibility.institutionType,
        requiredValue: scholarship.institutionTypeAllowed.join(', '),
        explanation: `Enrolled in eligible institution type (${eligibility.institutionType}).`
      });
    } else {
      failedCriteria.push({
        criterion: 'Institution Type',
        status: 'failed',
        studentValue: eligibility.institutionType,
        requiredValue: scholarship.institutionTypeAllowed.join(', '),
        explanation: `Restricted to students attending ${scholarship.institutionTypeAllowed.join(' or ')}.`
      });
    }
  }

  // Calculate Deterministic Match Score & Overall Status
  const totalEvaluated = passedCriteria.length + failedCriteria.length + missingCriteria.length;
  const matchScore = totalEvaluated > 0 ? Math.round((passedCriteria.length / totalEvaluated) * 100) : 0;

  let status: EligibilityStatus;
  let recommendationReason: string;

  if (failedCriteria.length > 0) {
    status = 'not_eligible';
    const primaryFailure = failedCriteria[0];
    recommendationReason = `Does not meet ${primaryFailure.criterion}: ${primaryFailure.explanation}`;
  } else if (missingCriteria.length > 0) {
    if (passedCriteria.length >= 2) {
      status = 'potentially_eligible';
      recommendationReason = `Meets ${passedCriteria.length} criteria, but ${missingCriteria.length} item(s) require verification from your profile.`;
    } else {
      status = 'insufficient_info';
      recommendationReason = `Key details like ${missingCriteria.map((m) => m.criterion).join(', ')} are needed to confirm qualification.`;
    }
  } else {
    status = 'eligible';
    recommendationReason = `All ${passedCriteria.length} explicit eligibility criteria evaluated match your student profile.`;
  }

  return {
    scholarship,
    status,
    matchScore,
    passedCriteria,
    failedCriteria,
    missingCriteria,
    recommendationReason
  };
}
