/**
 * NurseCalc Calculation Engine — Verification Module
 * Dual-Calculation Path / Dimensional Analysis Verification:
 * Method A: Direct Formula Calculation
 * Method B: Dimensional Analysis / Cross-Multiplication Verification
 * If both independent paths disagree beyond floating point delta: REJECT RESULT.
 */

const EPSILON = 0.0001;

function verifyDesiredOverHave(desired, have, vehicle, computedResult) {
  // Method A: computedResult = (desired / have) * vehicle
  // Method B: Dimensional analysis: (Desired units * Vehicle volume) / Have concentration
  const dimensionalResult = (desired * vehicle) / have;
  const delta = Math.abs(computedResult - dimensionalResult);
  if (delta > EPSILON) {
    return {
      verified: false,
      error: 'Dual-path calculation verification failed: Formula path and Dimensional path disagreed.'
    };
  }
  return { verified: true, delta };
}

function verifyGravityDrip(volumeMl, hours, dropFactor, computedGttPerMin) {
  // Method A: (volumeMl * dropFactor) / (hours * 60)
  // Method B: (Hourly rate: volumeMl / hours) * (dropFactor / 60)
  const hourlyRate = volumeMl / hours;
  const dropsPerMinuteRate = hourlyRate * (dropFactor / 60);
  const delta = Math.abs(computedGttPerMin - dropsPerMinuteRate);
  if (delta > EPSILON) {
    return {
      verified: false,
      error: 'Dual-path IV drip calculation verification failed.'
    };
  }
  return { verified: true, delta };
}

function verifyPumpRate(volumeMl, hours, computedRate) {
  // Method B: computedRate * hours must equal volumeMl
  const reconstructedVolume = computedRate * hours;
  const delta = Math.abs(reconstructedVolume - volumeMl);
  if (delta > 0.01) {
    return {
      verified: false,
      error: 'Dual-path Infusion Pump calculation verification failed.'
    };
  }
  return { verified: true, delta };
}

function verifyVasoactiveTitration(doseMcgKgMin, weightKg, bagMg, bagMl, computedPumpRateMlHr) {
  // Method B: Inverse reconstruction from pump rate to mcg/kg/min delivered
  const concMcgMl = (bagMg * 1000) / bagMl;
  const totalMcgDeliveredPerHour = computedPumpRateMlHr * concMcgMl;
  const deliveredMcgKgMin = totalMcgDeliveredPerHour / (weightKg * 60);
  const delta = Math.abs(deliveredMcgKgMin - doseMcgKgMin);
  if (delta > 0.001) {
    return {
      verified: false,
      error: 'Dual-path vasoactive titration verification failed.'
    };
  }
  return { verified: true, delta };
}

module.exports = {
  verifyDesiredOverHave,
  verifyGravityDrip,
  verifyPumpRate,
  verifyVasoactiveTitration
};
