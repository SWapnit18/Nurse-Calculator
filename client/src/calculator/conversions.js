export const UnitConversions = {
  CONVERSION_FACTORS: {
    'kg_to_g': 1000,
    'g_to_mg': 1000,
    'mg_to_mcg': 1000,
    'L_to_mL': 1000,
    'lb_to_kg': 1 / 2.20462262185
  },

  convert(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    const val = parseFloat(value);
    if (isNaN(val)) return 0;

    if (fromUnit === 'kg' && toUnit === 'g') return val * 1000;
    if (fromUnit === 'g' && toUnit === 'kg') return val / 1000;
    if (fromUnit === 'g' && toUnit === 'mg') return val * 1000;
    if (fromUnit === 'mg' && toUnit === 'g') return val / 1000;
    if (fromUnit === 'mg' && toUnit === 'mcg') return val * 1000;
    if (fromUnit === 'mcg' && toUnit === 'mg') return val / 1000;
    if (fromUnit === 'kg' && toUnit === 'mg') return val * 1000000;
    if (fromUnit === 'mg' && toUnit === 'kg') return val / 1000000;
    if (fromUnit === 'L' && toUnit === 'mL') return val * 1000;
    if (fromUnit === 'mL' && toUnit === 'L') return val / 1000;
    if (fromUnit === 'lb' && toUnit === 'kg') return val / 2.20462262185;
    if (fromUnit === 'kg' && toUnit === 'lb') return val * 2.20462262185;

    return val;
  }
};
export default UnitConversions;
