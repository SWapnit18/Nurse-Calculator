const SafeMath = require('../services/calculationService');

describe('NCLEX Neurological Assessment & Glasgow Coma Scale (GCS) Tests', () => {
  test('GCS 1: Normal alert baseline (E4, V5, M6 = 15/15 Mild/Normal)', () => {
    const res = SafeMath.calculateGCS(4, 5, 6);
    expect(res.result).toBe(15);
    expect(res.resultFormatted).toBe('15 / 15');
    expect(res.severity).toContain('Mild Head Injury');
    expect(res.warning).toBeNull();
    expect(res.verified).toBe(true);
  });

  test('GCS 2: Severe neurological compromise / Airway threshold (E2, V2, M4 = 8/15)', () => {
    const res = SafeMath.calculateGCS(2, 2, 4);
    expect(res.result).toBe(8);
    expect(res.severity).toContain('Severe Head Injury');
    expect(res.warning).toContain('intubation');
  });

  test('GCS 3: Moderate neurological injury (E3, V3, M4 = 10/15)', () => {
    const res = SafeMath.calculateGCS(3, 3, 4);
    expect(res.result).toBe(10);
    expect(res.severity).toContain('Moderate Head Injury');
  });

  test('GCS 4: Deep unresponsive coma minimum score (E1, V1, M1 = 3/15)', () => {
    const res = SafeMath.calculateGCS(1, 1, 1);
    expect(res.result).toBe(3);
    expect(res.severity).toContain('Severe Head Injury / Coma');
  });

  test('GCS 5: Out of clinical range subscores throw validation error', () => {
    expect(() => SafeMath.calculateGCS(5, 5, 6)).toThrow(); // Eye max 4
    expect(() => SafeMath.calculateGCS(4, 6, 6)).toThrow(); // Verbal max 5
    expect(() => SafeMath.calculateGCS(4, 5, 7)).toThrow(); // Motor max 6
    expect(() => SafeMath.calculateGCS(0, 5, 6)).toThrow(); // Eye min 1
  });
});
