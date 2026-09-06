/**
 * NurseCalc Calculation Engine — Validation Module
 * Guards against missing, negative, zero-division, out-of-bounds, or incompatible clinical inputs.
 */

function validatePositiveNumber(value, fieldName = 'Value') {
  if (value === undefined || value === null || value === '') {
    throw new Error(`${fieldName} is required.`);
  }
  const num = Number(value);
  if (isNaN(num) || !isFinite(num)) {
    throw new Error(`${fieldName} must be a valid finite number.`);
  }
  if (num <= 0) {
    throw new Error(`${fieldName} must be strictly greater than zero.`);
  }
  return num;
}

function validateNonNegativeNumber(value, fieldName = 'Value') {
  if (value === undefined || value === null || value === '') {
    throw new Error(`${fieldName} is required.`);
  }
  const num = Number(value);
  if (isNaN(num) || !isFinite(num)) {
    throw new Error(`${fieldName} must be a valid finite number.`);
  }
  if (num < 0) {
    throw new Error(`${fieldName} cannot be negative.`);
  }
  return num;
}

function checkPhysiologicalWeight(kg) {
  if (kg < 0.25 || kg > 450) {
    return {
      isOutlier: true,
      warning: `Patient weight (${kg} kg) is outside typical physiological boundaries (0.25 kg to 450 kg). Verify for potential decimal displacement.`
    };
  }
  return { isOutlier: false, warning: null };
}

function checkSingleDoseCeiling(tablets) {
  if (tablets > 4) {
    return {
      isExceeded: true,
      warning: `Single dose (${tablets} tablets) exceeds safe standard single-dose ceiling (4 tablets). Re-verify order.`
    };
  }
  return { isExceeded: false, warning: null };
}

function checkInjectionSiteCapacity(volumeMl, route = 'IM') {
  const max = route === 'SC' ? 1.0 : 3.0;
  if (volumeMl > max) {
    return {
      isExceeded: true,
      warning: `Volume (${volumeMl} mL) exceeds standard single injection site capacity (≤ ${max} mL for ${route}). Consider splitting doses across sites.`
    };
  }
  return { isExceeded: false, warning: null };
}

module.exports = {
  validatePositiveNumber,
  validateNonNegativeNumber,
  checkPhysiologicalWeight,
  checkSingleDoseCeiling,
  checkInjectionSiteCapacity
};
