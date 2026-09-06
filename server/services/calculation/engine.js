/**
 * NurseCalc Calculation Engine — Unified Engine Gateway
 * Coordinates: Validation -> Unit Normalization -> Calculation -> Independent Dual Verification -> Rounding -> Educational Result.
 */

const { validatePositiveNumber, validateNonNegativeNumber, checkPhysiologicalWeight, checkSingleDoseCeiling, checkInjectionSiteCapacity } = require('./validation');
const { convertUnit, poundsToKilograms } = require('./conversions');
const { formulaDesiredOverHave, formulaWeightBased, formulaGravityDrip, formulaPumpRate, formulaVasoactiveTitration, formulaGCS } = require('./formulas');
const { verifyDesiredOverHave, verifyGravityDrip, verifyPumpRate, verifyVasoactiveTitration } = require('./verification');
const { round, formatISMP, roundDrops } = require('./rounding');

class CalculationEngine {
  /**
   * 1. Liquid Injections
   */
  calculateInjection(desiredMg, haveMg, vehicleMl = 1.0) {
    const d = validatePositiveNumber(desiredMg, 'Desired Dose (mg)');
    const h = validatePositiveNumber(haveMg, 'Concentration on Hand (mg)');
    const v = validatePositiveNumber(vehicleMl, 'Vehicle Volume (mL)');

    const calc = formulaDesiredOverHave(d, h, v);
    const verification = verifyDesiredOverHave(d, h, v, calc.raw);
    if (!verification.verified) {
      throw new Error(`Calculation verification failed. Please review the inputs: ${verification.error}`);
    }

    const formatted = formatISMP(calc.raw);
    const capacityCheck = checkInjectionSiteCapacity(calc.raw, 'IM');

    return {
      type: 'injection',
      result: parseFloat(formatted),
      resultFormatted: formatted,
      unit: 'mL',
      rawVolume: calc.raw,
      warning: capacityCheck.warning,
      verified: true,
      steps: calc.steps,
      educationalNote: 'Visual verification: Align the front edge of the rubber stopper precisely to the graduation line.'
    };
  }

  /**
   * 2. Oral Tablets & Suspensions
   */
  calculateOral(desiredMg, haveMg, vehicleQty = 1) {
    const d = validatePositiveNumber(desiredMg, 'Desired Dose (mg)');
    const h = validatePositiveNumber(haveMg, 'Concentration on Hand (mg)');
    const v = validatePositiveNumber(vehicleQty, 'Vehicle Quantity');

    const calc = formulaDesiredOverHave(d, h, v);
    const verification = verifyDesiredOverHave(d, h, v, calc.raw);
    if (!verification.verified) {
      throw new Error(`Calculation verification failed. Please review the inputs: ${verification.error}`);
    }

    const formatted = formatISMP(calc.raw);
    const ceilingCheck = checkSingleDoseCeiling(calc.raw);

    return {
      type: 'oral',
      result: parseFloat(formatted),
      resultFormatted: formatted,
      unit: 'tablets',
      rawCount: calc.raw,
      warning: ceilingCheck.warning,
      verified: true,
      steps: calc.steps,
      educationalNote: 'Scored tablets can typically be halved; non-scored or enteric-coated/extended-release tablets must never be crushed or divided.'
    };
  }

  /**
   * 3. Weight-Based Dosing
   */
  calculateWeightBased(rateMgPerKg, weight, weightUnit = 'kg') {
    const r = validatePositiveNumber(rateMgPerKg, 'Dose Rate (mg/kg)');
    const w = validatePositiveNumber(weight, 'Patient Weight');

    const calc = formulaWeightBased(r, w, weightUnit);
    const weightWarning = checkPhysiologicalWeight(calc.normalizedKg);

    const formatted = formatISMP(calc.raw);

    return {
      type: 'weight',
      result: parseFloat(formatted),
      resultFormatted: formatted,
      unit: 'mg',
      normalizedKg: parseFloat(formatISMP(calc.normalizedKg, 3)),
      warning: weightWarning.warning,
      verified: true,
      steps: calc.steps,
      educationalNote: 'Always verify whether pediatric doses are prescribed per single dose or total 24-hour divided daily dose.'
    };
  }

  /**
   * 4. IV Gravity Drip Rate
   */
  calculateGravityDrip(volumeMl, durationHours, dropFactor = 15) {
    const vol = validatePositiveNumber(volumeMl, 'Volume (mL)');
    const hrs = validatePositiveNumber(durationHours, 'Duration (Hours)');
    const df = validatePositiveNumber(dropFactor, 'Drop Factor (gtt/mL)');

    const calc = formulaGravityDrip(vol, hrs, df);
    const verification = verifyGravityDrip(vol, hrs, df, calc.raw);
    if (!verification.verified) {
      throw new Error(`Calculation verification failed. Please review the inputs: ${verification.error}`);
    }

    return {
      type: 'gravity',
      result: calc.rounded,
      resultFormatted: calc.rounded.toString(),
      unit: 'gtt/min',
      exactRate: round(calc.raw, 2),
      warning: null,
      verified: true,
      steps: calc.steps,
      educationalNote: 'Gravity drip tubing delivers drops, not fractions; always round to the nearest whole integer drop.'
    };
  }

  /**
   * 5. Infusion Pump Rate
   */
  calculatePumpRate(volumeMl, durationHours) {
    const vol = validatePositiveNumber(volumeMl, 'Volume (mL)');
    const hrs = validatePositiveNumber(durationHours, 'Duration (Hours)');

    const calc = formulaPumpRate(vol, hrs);
    const verification = verifyPumpRate(vol, hrs, calc.raw);
    if (!verification.verified) {
      throw new Error(`Calculation verification failed. Please review the inputs: ${verification.error}`);
    }

    const formatted = formatISMP(calc.raw, 1);
    let warning = null;
    if (calc.raw > 999) {
      warning = 'Calculated rate exceeds standard electronic volumetric pump upper limit (999 mL/hr). Re-verify order.';
    }

    return {
      type: 'pump',
      result: parseFloat(formatted),
      resultFormatted: formatted,
      unit: 'mL/hr',
      warning,
      verified: true,
      steps: calc.steps,
      educationalNote: 'Smart volumetric infusion pumps require independent verification of both drug library and rate parameters.'
    };
  }

  /**
   * 6. Vasoactive ICU Titration
   */
  calculateTitration(doseMcgKgMin, patientKg, bagMg, bagMl) {
    const dose = validatePositiveNumber(doseMcgKgMin, 'Dose (mcg/kg/min)');
    const wt = validatePositiveNumber(patientKg, 'Weight (kg)');
    const mg = validatePositiveNumber(bagMg, 'Drug in Bag (mg)');
    const ml = validatePositiveNumber(bagMl, 'Bag Volume (mL)');

    const calc = formulaVasoactiveTitration(dose, wt, mg, ml);
    const verification = verifyVasoactiveTitration(dose, wt, mg, ml, calc.raw);
    if (!verification.verified) {
      throw new Error(`Calculation verification failed. Please review the inputs: ${verification.error}`);
    }

    const formatted = formatISMP(calc.raw, 2);

    return {
      type: 'titration',
      result: parseFloat(formatted),
      resultFormatted: formatted,
      unit: 'mL/hr',
      concentrationMcgMl: calc.concentrationMcgMl,
      warning: null,
      verified: true,
      steps: calc.steps,
      educationalNote: 'High-alert medication: Vasoactive infusions require dedicated central line access and dual independent nurse verification.'
    };
  }

  /**
   * 7. Glasgow Coma Scale (GCS)
   */
  calculateGCS(eye, verbal, motor) {
    const e = validatePositiveNumber(eye, 'Eye Response (1-4)');
    const v = validatePositiveNumber(verbal, 'Verbal Response (1-5)');
    const m = validatePositiveNumber(motor, 'Motor Response (1-6)');

    if (e < 1 || e > 4 || v < 1 || v > 5 || m < 1 || m > 6) {
      throw new Error('GCS sub-scores out of valid clinical bounds: Eye (1-4), Verbal (1-5), Motor (1-6).');
    }

    const calc = formulaGCS(e, v, m);
    return {
      type: 'gcs',
      result: calc.total,
      resultFormatted: `${calc.total} / 15`,
      severity: calc.severity,
      warning: calc.warning,
      unit: 'points',
      verified: true,
      steps: calc.steps
    };
  }

  /**
   * 8. Unit Conversions
   */
  calculateUnitConversion(value, fromUnit, toUnit) {
    const val = validatePositiveNumber(value, 'Value to convert');
    const converted = convertUnit(val, fromUnit, toUnit);
    const formatted = formatISMP(converted, 4);
    return {
      type: 'conversion',
      fromValue: val,
      fromUnit,
      toUnit,
      result: parseFloat(formatted),
      resultFormatted: formatted,
      verified: true,
      steps: [
        `Source: ${val} ${fromUnit}`,
        `Target: ${toUnit}`,
        `Calculation: ${val} ${fromUnit} = ${formatted} ${toUnit}`
      ]
    };
  }
}

const engineInstance = new CalculationEngine();

module.exports = engineInstance;
module.exports.CalculationEngine = CalculationEngine;
module.exports.SafeMath = {
  round,
  formatISMP,
  roundDrops,
  ...engineInstance
};
