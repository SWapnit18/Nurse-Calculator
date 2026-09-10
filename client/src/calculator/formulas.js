import SafeRounding from './rounding';

export const DoseFormulas = {
  desiredOverHave(desired, have, vehicle = 1) {
    return (desired / have) * vehicle;
  },

  weightBasedDose(dosePerKg, weightKg) {
    return dosePerKg * weightKg;
  },

  gravityDripRate(volumeMl, timeMinutes, dropFactor) {
    return (volumeMl * dropFactor) / timeMinutes;
  },

  pumpRate(volumeMl, timeHours) {
    return volumeMl / timeHours;
  },

  titrationRate(mcgPerKgMin, weightKg, bagMg, bagMl) {
    const concMcgPerMl = (bagMg * 1000) / bagMl;
    const totalMcgPerHr = mcgPerKgMin * weightKg * 60;
    return totalMcgPerHr / concMcgPerMl;
  }
};
export default DoseFormulas;
