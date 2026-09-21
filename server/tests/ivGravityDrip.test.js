const SafeMath = require('../services/calculationService');

describe('NCLEX IV Gravity Infusion & Drop Factor Calculation Tests', () => {
  test('IV 1: Macrodrip standard (1000 mL Normal Saline over 8 hours, drop factor 15 gtt/mL)', () => {
    // 1000 * 15 / (8 * 60) = 15000 / 480 = 31.25 -> rounded to 31 gtt/min
    const res = SafeMath.calculateGravityDrip(1000, 8, 15);
    expect(res.result).toBe(31);
    expect(res.unit).toBe('gtt/min');
    expect(res.exactRate).toBeCloseTo(31.25, 2);
    expect(res.verified).toBe(true);
  });

  test('IV 2: Microdrip pediatric (100 mL over 2 hours, drop factor 60 gtt/mL)', () => {
    // 100 * 60 / (2 * 60) = 6000 / 120 = 50 gtt/min
    const res = SafeMath.calculateGravityDrip(100, 2, 60);
    expect(res.result).toBe(50);
    expect(res.unit).toBe('gtt/min');
    expect(res.exactRate).toBe(50);
  });

  test('IV 3: Volumetric electronic pump rate (500 mL D5W over 4 hours = 125 mL/hr)', () => {
    const res = SafeMath.calculatePumpRate(500, 4);
    expect(res.result).toBe(125);
    expect(res.unit).toBe('mL/hr');
    expect(res.verified).toBe(true);
  });

  test('IV 4: Half-hour duration volumetric pump rate (250 mL over 0.5 hr = 500 mL/hr)', () => {
    const res = SafeMath.calculatePumpRate(250, 0.5);
    expect(res.result).toBe(500);
    expect(res.unit).toBe('mL/hr');
  });

  test('IV 5: Zero or negative infusion parameters throw validation error', () => {
    expect(() => SafeMath.calculateGravityDrip(0, 8, 15)).toThrow();
    expect(() => SafeMath.calculateGravityDrip(1000, 0, 15)).toThrow();
    expect(() => SafeMath.calculateGravityDrip(1000, 8, 0)).toThrow();
    expect(() => SafeMath.calculatePumpRate(500, 0)).toThrow();
  });
});
