const SafeMath = require('../services/calculationService');

describe('NCLEX Pediatric Medication Dosage & Weight-Based Tests', () => {
  test('Peds 1: Weight conversion from lbs to kg (22 lbs = ~9.98 kg)', () => {
    const conv = SafeMath.calculateUnitConversion(22, 'lb', 'kg');
    expect(conv.result).toBeCloseTo(9.979, 2);
    expect(conv.toUnit).toBe('kg');
  });

  test('Peds 2: Weight-based Amoxicillin 25 mg/kg/day for 15 kg child = 375 mg/day', () => {
    const res = SafeMath.calculateWeightBased(25, 15, 'kg');
    expect(res.result).toBe(375);
    expect(res.unit).toBe('mg');
    expect(res.normalizedKg).toBe(15);
  });

  test('Peds 3: Weight-based dose with lbs input converts accurately (50 mg/kg for 44 lbs)', () => {
    const res = SafeMath.calculateWeightBased(50, 44, 'lb');
    expect(res.normalizedKg).toBeCloseTo(19.958, 1);
    expect(res.result).toBeCloseTo(997.9, 0);
  });

  test('Peds 4: Zero or negative pediatric weight throws validation error', () => {
    expect(() => SafeMath.calculateWeightBased(20, 0, 'kg')).toThrow();
    expect(() => SafeMath.calculateWeightBased(20, -5, 'kg')).toThrow();
  });

  test('Peds 5: Pediatric liquid dose calculation (D=125mg, H=250mg, V=5mL = 2.5 mL)', () => {
    const res = SafeMath.calculateInjection(125, 250, 5);
    expect(res.result).toBe(2.5);
    expect(res.resultFormatted).toBe('2.5');
    expect(res.unit).toBe('mL');
  });
});

