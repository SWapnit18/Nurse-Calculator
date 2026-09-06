/**
 * NurseCalc Calculation Service Entry Point
 * Re-exports the modular deterministic CalculationEngine and SafeMath interfaces.
 */

const engine = require('./calculation/engine');
const { round, formatISMP, roundDrops } = require('./calculation/rounding');

const SafeMath = {
  round,
  formatISMP,
  roundDrops,
  calculateInjection: (d, h, v) => engine.calculateInjection(d, h, v),
  calculateOral: (d, h, v) => engine.calculateOral(d, h, v),
  calculateWeightBased: (r, w, u) => engine.calculateWeightBased(r, w, u),
  calculateGravityDrip: (v, h, df) => engine.calculateGravityDrip(v, h, df),
  calculatePumpRate: (v, h) => engine.calculatePumpRate(v, h),
  calculateGCS: (e, v, m) => engine.calculateGCS(e, v, m),
  calculateTitration: (d, w, mg, ml) => engine.calculateTitration(d, w, mg, ml),
  calculateUnitConversion: (val, from, to) => engine.calculateUnitConversion(val, from, to)
};

module.exports = SafeMath;
module.exports.engine = engine;
