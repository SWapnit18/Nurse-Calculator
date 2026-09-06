/**
 * NurseCalc Calculation Engine — Formulas Module
 * Pure mathematical formulas for nursing calculations with step generation.
 */

const { convertUnit, poundsToKilograms } = require('./conversions');
const { round, formatISMP, roundDrops } = require('./rounding');

// 1. Desired over Have Formula: (D / H) * V
function formulaDesiredOverHave(desired, have, vehicle) {
  const result = (desired / have) * vehicle;
  return {
    raw: result,
    steps: [
      `Dose Ordered / Desired (D): ${desired}`,
      `Dose on Hand (H): ${have}`,
      `Vehicle Quantity / Volume (V): ${vehicle}`,
      `Formula: (${desired} ÷ ${have}) × ${vehicle} = ${formatISMP(result, 3)}`
    ]
  };
}

// 2. Weight-Based Dosing Formula: Dose = Rate (mg/kg) * Weight (kg)
function formulaWeightBased(ratePerKg, weight, weightUnit = 'kg') {
  let kg = weight;
  const steps = [];
  if (weightUnit.toLowerCase() === 'lb' || weightUnit.toLowerCase() === 'lbs') {
    kg = poundsToKilograms(weight);
    steps.push(`Weight Conversion: ${weight} lbs × 0.45359237 = ${formatISMP(kg, 3)} kg`);
  }
  const totalDose = ratePerKg * kg;
  steps.push(`Calculation: ${ratePerKg} mg/kg × ${formatISMP(kg, 3)} kg = ${formatISMP(totalDose, 3)} mg`);
  return {
    raw: totalDose,
    normalizedKg: kg,
    steps
  };
}

// 3. Gravity IV Flow Drip Rate: (Volume mL * Drop Factor gtt/mL) / (Hours * 60)
function formulaGravityDrip(volumeMl, hours, dropFactor) {
  const totalMinutes = hours * 60;
  const rawGtt = (volumeMl * dropFactor) / totalMinutes;
  const roundedGtt = roundDrops(rawGtt);
  return {
    raw: rawGtt,
    rounded: roundedGtt,
    steps: [
      `Total Time in Minutes: ${hours} hr × 60 min/hr = ${totalMinutes} min`,
      `Formula: (${volumeMl} mL × ${dropFactor} gtt/mL) ÷ ${totalMinutes} min`,
      `Exact Rate: ${formatISMP(rawGtt, 2)} gtt/min`,
      `Clinically Rounded: ${roundedGtt} gtt/min (tubing cannot deliver fractional drops)`
    ]
  };
}

// 4. Volumetric Infusion Pump Rate: Volume (mL) / Duration (Hours)
function formulaPumpRate(volumeMl, hours) {
  const rate = volumeMl / hours;
  return {
    raw: rate,
    steps: [
      `Infusion Volume: ${volumeMl} mL`,
      `Infusion Duration: ${hours} hr`,
      `Formula: ${volumeMl} mL ÷ ${hours} hr = ${formatISMP(rate, 1)} mL/hr`
    ]
  };
}

// 5. Vasoactive ICU Titration: Rate (mL/hr) = (Dose mcg/kg/min * Weight kg * 60 min/hr) / (Concentration mcg/mL)
function formulaVasoactiveTitration(doseMcgKgMin, weightKg, bagMg, bagMl) {
  const concentrationMcgMl = (bagMg * 1000) / bagMl;
  const dosePerMinuteMcg = doseMcgKgMin * weightKg;
  const dosePerHourMcg = dosePerMinuteMcg * 60;
  const pumpRateMlHr = dosePerHourMcg / concentrationMcgMl;

  return {
    raw: pumpRateMlHr,
    concentrationMcgMl,
    steps: [
      `Bag Concentration: (${bagMg} mg × 1000 mcg/mg) ÷ ${bagMl} mL = ${formatISMP(concentrationMcgMl)} mcg/mL`,
      `Patient Dose/min: ${doseMcgKgMin} mcg/kg/min × ${weightKg} kg = ${formatISMP(dosePerMinuteMcg)} mcg/min`,
      `Patient Dose/hr: ${formatISMP(dosePerMinuteMcg)} mcg/min × 60 min = ${formatISMP(dosePerHourMcg)} mcg/hr`,
      `Pump Rate: ${formatISMP(dosePerHourMcg)} mcg/hr ÷ ${formatISMP(concentrationMcgMl)} mcg/mL = ${formatISMP(pumpRateMlHr, 2)} mL/hr`
    ]
  };
}

// 6. Glasgow Coma Scale (GCS): E (1-4) + V (1-5) + M (1-6)
function formulaGCS(eye, verbal, motor) {
  const total = eye + verbal + motor;
  let severity = 'Mild Head Injury (GCS 13–15)';
  let warning = null;
  if (total <= 8) {
    severity = 'Severe Head Injury / Coma (GCS 3–8)';
    warning = 'GCS score ≤ 8 indicates severe neurological deficit and loss of protective airway reflexes; emergency airway management and endotracheal intubation typically required.';
  } else if (total <= 12) {
    severity = 'Moderate Head Injury (GCS 9–12)';
  }
  return {
    total,
    severity,
    warning,
    steps: [
      `Eye Opening Score (E): ${eye} / 4`,
      `Verbal Response Score (V): ${verbal} / 5`,
      `Motor Response Score (M): ${motor} / 6`,
      `Total GCS = ${eye} + ${verbal} + ${motor} = ${total} / 15 (${severity})`
    ]
  };
}

module.exports = {
  formulaDesiredOverHave,
  formulaWeightBased,
  formulaGravityDrip,
  formulaPumpRate,
  formulaVasoactiveTitration,
  formulaGCS
};
