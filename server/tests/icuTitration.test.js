const SafeMath = require('../services/calculationService');

describe('NCLEX Critical Care & ICU Vasoactive Titration Tests', () => {
  test('ICU 1: Dopamine titration (5 mcg/kg/min for 70 kg patient, bag 400 mg in 250 mL)', () => {
    // 5 * 70 = 350 mcg/min * 60 = 21,000 mcg/hr = 21 mg/hr
    // Concentration = 400 mg / 250 mL = 1.6 mg/mL (1600 mcg/mL)
    // Rate = 21,000 / 1600 = 13.125 mL/hr -> 13.13 mL/hr
    const res = SafeMath.calculateTitration(5, 70, 400, 250);
    expect(res.result).toBeCloseTo(13.13, 2);
    expect(res.unit).toBe('mL/hr');
    expect(res.concentrationMcgMl).toBe(1600);
    expect(res.verified).toBe(true);
  });

  test('ICU 2: Norepinephrine / Levophed titration calculation', () => {
    // 0.1 mcg/kg/min for 80 kg patient, 4 mg in 250 mL
    // 0.1 * 80 = 8 mcg/min * 60 = 480 mcg/hr
    // Concentration = 4000 mcg / 250 mL = 16 mcg/mL
    // Rate = 480 / 16 = 30 mL/hr
    const res = SafeMath.calculateTitration(0.1, 80, 4, 250);
    expect(res.result).toBe(30);
    expect(res.unit).toBe('mL/hr');
    expect(res.concentrationMcgMl).toBe(16);
  });

  test('ICU 3: Zero or negative dose rate throws validation error', () => {
    expect(() => SafeMath.calculateTitration(0, 70, 400, 250)).toThrow();
    expect(() => SafeMath.calculateTitration(-2, 70, 400, 250)).toThrow();
  });

  test('ICU 4: Zero or negative bag concentration throws validation error', () => {
    expect(() => SafeMath.calculateTitration(5, 70, 0, 250)).toThrow();
    expect(() => SafeMath.calculateTitration(5, 70, 400, 0)).toThrow();
  });

  test('ICU 5: Independent dual verification succeeds with zero calculation drift', () => {
    const res = SafeMath.calculateTitration(10, 60, 200, 500);
    expect(res.verified).toBe(true);
    expect(res.steps).toBeInstanceOf(Array);
    expect(res.steps.length).toBeGreaterThan(0);
  });
});
