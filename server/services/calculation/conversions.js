/**
 * NurseCalc Calculation Engine — Conversions Module
 * Handles metric, volumetric, and pound-to-kg standard clinical conversions.
 */

const { UNITS, normalizeUnit, areUnitsCompatible } = require('./units');

function convertUnit(value, fromUnit, toUnit) {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    throw new Error('Value must be a valid finite number');
  }
  const normFrom = normalizeUnit(fromUnit);
  const normTo = normalizeUnit(toUnit);

  if (!normFrom || !normTo) {
    throw new Error(`Unrecognized unit: ${fromUnit} or ${toUnit}`);
  }

  if (normFrom === normTo) return value;

  if (!areUnitsCompatible(normFrom, normTo)) {
    throw new Error(`Incompatible units for conversion: cannot convert ${fromUnit} to ${toUnit} without concentration/density relationship.`);
  }

  const uFrom = UNITS[normFrom.toUpperCase()];
  const uTo = UNITS[normTo.toUpperCase()];

  // Base unit in grams or liters or seconds
  const valueInBase = value * uFrom.toBase;
  return valueInBase / uTo.toBase;
}

// Dedicated clinical helpers
function poundsToKilograms(lbs) {
  if (typeof lbs !== 'number' || lbs <= 0 || isNaN(lbs)) {
    throw new Error('Weight in pounds must be a positive number.');
  }
  // Standard clinical factor: 1 lb = 0.45359237 kg (or 1 kg = 2.20462 lbs)
  return lbs * 0.45359237;
}

function kilogramsToPounds(kg) {
  if (typeof kg !== 'number' || kg <= 0 || isNaN(kg)) {
    throw new Error('Weight in kilograms must be a positive number.');
  }
  return kg / 0.45359237;
}

module.exports = {
  convertUnit,
  poundsToKilograms,
  kilogramsToPounds
};
