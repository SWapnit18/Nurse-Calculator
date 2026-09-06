/**
 * NurseCalc Calculation Engine — Unit System
 * Strictly defines supported educational measurement units, dimensions, and conversion factors.
 */

const DIMENSIONS = {
  MASS: 'mass',
  VOLUME: 'volume',
  TIME: 'time',
  RATE_DROP: 'rate_drop',
  RATE_VOLUME: 'rate_volume'
};

const UNITS = {
  // Mass
  MCG: { id: 'mcg', symbol: 'mcg', name: 'Microgram', dimension: DIMENSIONS.MASS, toBase: 0.000001 },
  MG:  { id: 'mg',  symbol: 'mg',  name: 'Milligram', dimension: DIMENSIONS.MASS, toBase: 0.001 },
  G:   { id: 'g',   symbol: 'g',   name: 'Gram',      dimension: DIMENSIONS.MASS, toBase: 1.0 },
  KG:  { id: 'kg',  symbol: 'kg',  name: 'Kilogram',  dimension: DIMENSIONS.MASS, toBase: 1000.0 },
  LB:  { id: 'lb',  symbol: 'lb',  name: 'Pound',     dimension: DIMENSIONS.MASS, toBase: 453.59237 },

  // Volume
  ML:  { id: 'ml',  symbol: 'mL',  name: 'Milliliter', dimension: DIMENSIONS.VOLUME, toBase: 0.001 },
  L:   { id: 'l',   symbol: 'L',   name: 'Liter',      dimension: DIMENSIONS.VOLUME, toBase: 1.0 },

  // Time
  MIN: { id: 'min', symbol: 'min', name: 'Minute', dimension: DIMENSIONS.TIME, toBase: 60 },
  HR:  { id: 'hr',  symbol: 'hr',  name: 'Hour',   dimension: DIMENSIONS.TIME, toBase: 3600 }
};

function normalizeUnit(unitStr) {
  if (!unitStr || typeof unitStr !== 'string') return null;
  const cleaned = unitStr.trim().toLowerCase();
  switch (cleaned) {
    case 'mcg':
    case 'μg':
    case 'ug':
      return 'mcg';
    case 'mg':
      return 'mg';
    case 'g':
    case 'gm':
    case 'gram':
    case 'grams':
      return 'g';
    case 'kg':
    case 'kgs':
      return 'kg';
    case 'lb':
    case 'lbs':
    case 'pound':
    case 'pounds':
      return 'lb';
    case 'ml':
    case 'cc':
      return 'ml';
    case 'l':
    case 'liter':
    case 'liters':
      return 'l';
    case 'min':
    case 'minute':
    case 'minutes':
      return 'min';
    case 'hr':
    case 'hour':
    case 'hours':
      return 'hr';
    default:
      return cleaned;
  }
}

function areUnitsCompatible(fromUnit, toUnit) {
  const u1 = UNITS[normalizeUnit(fromUnit)?.toUpperCase()];
  const u2 = UNITS[normalizeUnit(toUnit)?.toUpperCase()];
  if (!u1 || !u2) return false;
  return u1.dimension === u2.dimension;
}

module.exports = {
  DIMENSIONS,
  UNITS,
  normalizeUnit,
  areUnitsCompatible
};
