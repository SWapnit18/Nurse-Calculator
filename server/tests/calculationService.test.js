const SafeMath = require('../services/calculationService');

describe('NurseCalc Deterministic Calculation Engine & ISMP Accuracy Tests', () => {
  // Test 1: Liquid Injection (80mg from 200mg/mL vial)
  test('Test 1: Liquid Injection exact calculation (80mg / 200mg/mL * 1mL = 0.4 mL)', () => {
    const res = SafeMath.calculateInjection(80, 200, 1.0);
    expect(res.result).toBe(0.4);
    expect(res.resultFormatted).toBe('0.4');
    expect(res.unit).toBe('mL');
  });

  // Test 2: ISMP Trailing Zero Removal (0.40000 -> 0.4)
  test('Test 2: ISMP Trailing Zero Removal (Never 0.40000)', () => {
    const formatted = SafeMath.formatISMP(0.40000);
    expect(formatted).toBe('0.4');
  });

  // Test 3: ISMP Leading Zero Enforcement (.4 -> 0.4)
  test('Test 3: ISMP Leading Zero Enforcement (.4 -> 0.4 to prevent 10x overdose)', () => {
    const formatted = SafeMath.formatISMP(0.4);
    expect(formatted.startsWith('0.')).toBe(true);
    expect(formatted).toBe('0.4');
  });

  // Test 4: Floating Point IEEE-754 Safe Rounding
  test('Test 4: Decimal precision float safety (0.1 + 0.2 = 0.3)', () => {
    const res = SafeMath.round(0.1 + 0.2, 2);
    expect(res).toBe(0.3);
  });

  // Test 5: Oral Tablet Dosage
  test('Test 5: Oral tablet dosage (250mg / 125mg = 2 tablets)', () => {
    const res = SafeMath.calculateOral(250, 125, 1);
    expect(res.result).toBe(2);
    expect(res.unit).toBe('tablets');
  });

  // Test 6: Imperial to Metric conversion constant check
  test('Test 6: Lbs to Kg Conversion (44 lbs = 19.958 kg)', () => {
    const res = SafeMath.calculateWeightBased(5, 44, 'lb');
    expect(res.normalizedKg).toBeCloseTo(19.958, 2);
    expect(res.result).toBeCloseTo(99.79, 1);
  });

  // Test 7: Gravity IV Drip Rate
  test('Test 7: IV Gravity Drip Rate (1000 mL, 8 hr, 15 gtt/mL = 31 gtt/min)', () => {
    const res = SafeMath.calculateGravityDrip(1000, 8, 15);
    expect(res.result).toBe(31);
    expect(res.exactRate).toBeCloseTo(31.25, 2);
    expect(res.unit).toBe('gtt/min');
  });

  // Test 8: Electronic Infusion Pump Rate
  test('Test 8: Electronic Infusion Pump Rate (500 mL / 4 hr = 125 mL/hr)', () => {
    const res = SafeMath.calculatePumpRate(500, 4);
    expect(res.result).toBe(125);
    expect(res.unit).toBe('mL/hr');
  });

  // Test 9: Glasgow Coma Scale normal
  test('Test 9: GCS normal score (4+5+6 = 15)', () => {
    const res = SafeMath.calculateGCS(4, 5, 6);
    expect(res.result).toBe(15);
  });

  // Test 10: Glasgow Coma Scale severe intubation alert
  test('Test 10: GCS severe airway safety alert (<= 8)', () => {
    const res = SafeMath.calculateGCS(2, 2, 3);
    expect(res.result).toBe(7);
    expect(res.warning).toContain('intubation');
  });

  // Test 11: ICU Vasoactive Titration Rate
  test('Test 11: ICU Titration rate (5 mcg/kg/min * 70 kg, 400 mg in 250 mL = 13.13 mL/hr)', () => {
    const res = SafeMath.calculateTitration(5, 70, 400, 250);
    expect(res.result).toBe(13.13);
    expect(res.unit).toBe('mL/hr');
  });

  // Test 12: High single injection volume warning guardrail
  test('Test 12: Injection volume safety warning on single site capacity (>3 mL)', () => {
    const res = SafeMath.calculateInjection(1000, 200, 1.0);
    expect(res.result).toBe(5);
    expect(res.warning).toContain('exceeds standard single injection site capacity');
  });

  // Test 13: Oral dose ceiling guardrail (>4 tablets)
  test('Test 13: Oral dose ceiling alert (>4 tablets)', () => {
    const res = SafeMath.calculateOral(1000, 125, 1);
    expect(res.result).toBe(8);
    expect(res.warning).toContain('exceeds safe standard single-dose ceiling');
  });

  // Test 14: Zero division and negative input prevention
  test('Test 14: Input validation catches zero or negative values', () => {
    expect(() => SafeMath.calculateInjection(0, 200, 1)).toThrow();
    expect(() => SafeMath.calculateOral(250, 0, 1)).toThrow();
    expect(() => SafeMath.calculatePumpRate(500, 0)).toThrow();
  });
});
