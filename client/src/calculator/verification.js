import SafeRounding from './rounding';

export const CalculationVerification = {
  verifyDesiredHave(desired, have, vehicle, calculatedDose) {
    const backCalculatedDesired = (calculatedDose * have) / vehicle;
    const diff = Math.abs(backCalculatedDesired - desired);
    return diff <= 0.001;
  },

  verifyPumpRate(volumeMl, timeHours, calculatedRate) {
    const backCalculatedVol = calculatedRate * timeHours;
    return Math.abs(backCalculatedVol - volumeMl) <= 0.05;
  }
};
export default CalculationVerification;
