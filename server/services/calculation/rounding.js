/**
 * NurseCalc Calculation Engine — Rounding & ISMP Syntax Rules
 * 1. Strict leading zeros for values < 1 (e.g., 0.5 mL, NEVER .5 mL)
 * 2. Strict omission of trailing zeros (e.g., 5 mg, NEVER 5.0 mg or 5.00 mg)
 * 3. Clinical integer rounding for drops (gtt/min)
 */

function round(val, decimals = 2) {
  if (isNaN(val) || val === null || val === undefined) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round((val + Number.EPSILON) * factor) / factor;
}

function formatISMP(num, maxDecimals = 3) {
  if (isNaN(num) || num === null || num === undefined) return "0";
  const rounded = round(num, maxDecimals);
  let str = rounded.toString();
  // Strip trailing zeros if present in string representation of float
  if (str.includes('.')) {
    str = str.replace(/(\.\d*?[1-9])0+$/, '$1'); // trim trailing zeros
    str = str.replace(/\.0+$/, ''); // trim trailing dot
  }
  // Enforce leading zero for naked decimals (.5 -> 0.5)
  if (str.startsWith('.')) str = '0' + str;
  if (str.startsWith('-.')) str = '-0' + str.slice(1);
  return str;
}

function roundDrops(val) {
  if (isNaN(val) || val === null || val === undefined) return 0;
  return Math.round(val);
}

module.exports = {
  round,
  formatISMP,
  roundDrops
};
