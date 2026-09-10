import SafeRounding from './rounding';
import ClinicalValidation from './validation';
import UnitConversions from './conversions';
import DoseFormulas from './formulas';
import CalculationVerification from './verification';

export const CalculationEngine = {
  calculatePumpRate(volumeMl, timeHours) {
    const rate = DoseFormulas.pumpRate(volumeMl, timeHours);
    const roundedRate = SafeRounding.round(rate, 1);
    const formatted = SafeRounding.formatISMP(roundedRate, 1);
    
    return {
      rate: formatted,
      rawRate: rate,
      unit: 'mL/hr',
      formula: `${volumeMl} mL ÷ ${timeHours} hr = ${formatted} mL/hr`
    };
  },

  calculateDripRate(volumeMl, timeMinutes, dropFactor) {
    const rate = DoseFormulas.gravityDripRate(volumeMl, timeMinutes, dropFactor);
    const wholeRate = SafeRounding.roundDrops(rate);
    
    return {
      rate: wholeRate.toString(),
      rawRate: rate,
      unit: 'gtt/min',
      formula: `(${volumeMl} mL × ${dropFactor} gtt/mL) ÷ ${timeMinutes} min = ${wholeRate} gtt/min`
    };
  },

  calculateDesiredHave(desired, have, vehicle = 1, type = 'liquid') {
    const dose = DoseFormulas.desiredOverHave(desired, have, vehicle);
    const decimals = type === 'tablet' ? 2 : (dose < 1 ? 2 : 1);
    const roundedDose = SafeRounding.round(dose, decimals);
    const formatted = SafeRounding.formatISMP(roundedDose, decimals);

    return {
      dose: roundedDose,
      formattedDose: formatted,
      unit: type === 'tablet' ? 'tabs' : 'mL',
      formula: `(${desired} ÷ ${have}) × ${vehicle} = ${formatted} ${type === 'tablet' ? 'tabs' : 'mL'}`
    };
  },

  calculateWeightBased(weightKg, dosePerKg, frequency = 'single') {
    const totalDose = DoseFormulas.weightBasedDose(dosePerKg, weightKg);
    const formatted = SafeRounding.formatISMP(SafeRounding.round(totalDose, 2));

    return {
      totalDose: formatted,
      unit: 'mg',
      formula: `${weightKg} kg × ${dosePerKg} mg/kg = ${formatted} mg`
    };
  },

  convertUnit(value, fromUnit, toUnit) {
    const converted = UnitConversions.convert(value, fromUnit, toUnit);
    const formatted = SafeRounding.formatISMP(SafeRounding.round(converted, 3));
    return {
      converted: formatted,
      fromUnit,
      toUnit
    };
  }
};
export default CalculationEngine;
