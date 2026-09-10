import { describe, it, expect } from 'vitest';
import CalculationEngine from './engine';
import { SafeRounding } from './rounding';

describe('CalculationEngine Deterministic Math Tests', () => {
  it('Pump rate 1000 mL / 16 hr should be 62.5 mL/hr, NOT rounded to 63', () => {
    const res = CalculationEngine.calculatePumpRate(1000, 16);
    expect(res.rate).toBe('62.5');
    expect(res.unit).toBe('mL/hr');
  });

  it('Gravity drip 1000 mL / 8 hr with 15 drop factor rounds to 31 gtt/min', () => {
    const res = CalculationEngine.calculateDripRate(1000, 8 * 60, 15);
    expect(res.rate).toBe('31');
    expect(res.unit).toBe('gtt/min');
  });

  it('Liquid injection 80 mg / 200 mg/mL * 1 mL = 0.4 mL', () => {
    const res = CalculationEngine.calculateDesiredHave(80, 200, 1.0, 'liquid');
    expect(res.formattedDose).toBe('0.4');
    expect(res.unit).toBe('mL');
  });

  it('Oral tablet 250 mg / 125 mg = 2 tablets', () => {
    const res = CalculationEngine.calculateDesiredHave(250, 125, 1, 'tablet');
    expect(res.formattedDose).toBe('2');
    expect(res.unit).toBe('tabs');
  });

  it('ISMP formatting enforces leading zero and removes trailing zero', () => {
    expect(SafeRounding.formatISMP(0.4000)).toBe('0.4');
    expect(SafeRounding.formatISMP(5.000)).toBe('5');
    expect(SafeRounding.formatISMP(0.5)).toBe('0.5');
  });
});

