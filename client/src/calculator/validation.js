export const ClinicalValidation = {
  validatePositive(num, name = "Value") {
    if (num === null || num === undefined || isNaN(num) || num <= 0) {
      return { valid: false, error: `${name} must be greater than zero.` };
    }
    return { valid: true };
  },

  validateWeight(weight, unit = 'kg') {
    const val = parseFloat(weight);
    if (isNaN(val) || val <= 0) return { valid: false, error: 'Enter a valid patient weight.' };
    const kg = unit === 'lb' ? val / 2.20462 : val;
    if (kg < 0.3 || kg > 450) {
      return { valid: false, error: `Patient weight (${kg.toFixed(1)} kg) outside physiological limits.` };
    }
    return { valid: true, weightKg: kg };
  }
};
export default ClinicalValidation;
