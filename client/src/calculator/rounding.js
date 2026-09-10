export const SafeRounding = {
  round(val, decimals = 2) {
    if (isNaN(val) || val === null || val === undefined) return 0;
    const factor = Math.pow(10, decimals);
    return Math.round((val + Number.EPSILON) * factor) / factor;
  },

  roundDrops(val) {
    if (isNaN(val) || val === null || val === undefined) return 0;
    return Math.round(val);
  },

  formatISMP(num, maxDecimals = 3) {
    if (isNaN(num) || num === null || num === undefined) return "0";
    const rounded = this.round(num, maxDecimals);
    let str = rounded.toString();
    if (str.startsWith('.')) str = '0' + str;
    if (str.startsWith('-.')) str = '-0' + str.slice(1);
    return str;
  }
};
export default SafeRounding;
