import React, { useState } from 'react';
import { 
  Calculator, RotateCcw, Copy, Check, ShieldAlert, Sparkles, HelpCircle 
} from 'lucide-react';
import CalculationEngine from '../calculator/engine';

const CATEGORIES = [
  { id: 'flow-rate', label: 'Flow Rate' },
  { id: 'drip-rate', label: 'Drip Rate' },
  { id: 'weight-based', label: 'Weight' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'liquid', label: 'Liquid' },
  { id: 'conversion', label: 'Conversion' },
];

export default function CalculatorView() {
  const [category, setCategory] = useState('flow-rate');
  
  // Flow Rate state
  const [volume, setVolume] = useState('500');
  const [timeHours, setTimeHours] = useState('4');

  // Drip Rate state
  const [dripVolume, setDripVolume] = useState('1000');
  const [dripTimeMin, setDripTimeMin] = useState('480');
  const [dropFactor, setDropFactor] = useState('15');

  // Weight-based state
  const [patientWeight, setPatientWeight] = useState('70');
  const [dosePerKg, setDosePerKg] = useState('5');

  // Tablet state
  const [desiredTablet, setDesiredTablet] = useState('500');
  const [haveTablet, setHaveTablet] = useState('250');

  // Liquid state
  const [desiredLiquid, setDesiredLiquid] = useState('80');
  const [haveLiquid, setHaveLiquid] = useState('200');
  const [quantityLiquid, setQuantityLiquid] = useState('1');

  // Unit conversion state
  const [convValue, setConvValue] = useState('2.5');
  const [convFrom, setConvFrom] = useState('g');
  const [convTo, setConvTo] = useState('mg');

  // Result state
  const [calcResult, setCalcResult] = useState(null);
  const [calcFormula, setCalcFormula] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleCalculate = () => {
    setErrorMsg(null);
    try {
      if (category === 'flow-rate') {
        const v = parseFloat(volume);
        const t = parseFloat(timeHours);
        if (isNaN(v) || isNaN(t) || t <= 0) throw new Error('Enter valid positive numbers for volume and time.');
        const res = CalculationEngine.calculatePumpRate(v, t);
        setCalcResult(`${res.rate} mL/hr`);
        setCalcFormula(res.formula || `${v} mL ÷ ${t} hr = ${res.rate} mL/hr`);
      } else if (category === 'drip-rate') {
        const v = parseFloat(dripVolume);
        const t = parseFloat(dripTimeMin);
        const df = parseFloat(dropFactor);
        if (isNaN(v) || isNaN(t) || isNaN(df) || t <= 0) throw new Error('Enter valid positive numbers.');
        const res = CalculationEngine.calculateDripRate(v, t, df);
        setCalcResult(`${res.rate} gtt/min`);
        setCalcFormula(res.formula || `(${v} mL × ${df} gtt/mL) ÷ ${t} min = ${res.rate} gtt/min`);
      } else if (category === 'tablet') {
        const d = parseFloat(desiredTablet);
        const h = parseFloat(haveTablet);
        if (isNaN(d) || isNaN(h) || h <= 0) throw new Error('Enter valid doses.');
        const res = CalculationEngine.calculateDesiredHave(d, h, 1, 'tablet');
        setCalcResult(`${res.formattedDose} ${res.unit}`);
        setCalcFormula(res.formula || `${d} mg ÷ ${h} mg = ${res.formattedDose} tabs`);
      } else if (category === 'liquid') {
        const d = parseFloat(desiredLiquid);
        const h = parseFloat(haveLiquid);
        const q = parseFloat(quantityLiquid);
        if (isNaN(d) || isNaN(h) || isNaN(q) || h <= 0) throw new Error('Enter valid dosage parameters.');
        const res = CalculationEngine.calculateDesiredHave(d, h, q, 'liquid');
        setCalcResult(`${res.formattedDose} mL`);
        setCalcFormula(res.formula || `(${d} mg ÷ ${h} mg) × ${q} mL = ${res.formattedDose} mL`);
      } else if (category === 'weight-based') {
        const w = parseFloat(patientWeight);
        const d = parseFloat(dosePerKg);
        if (isNaN(w) || isNaN(d)) throw new Error('Enter valid weight and dose.');
        const res = CalculationEngine.calculateWeightBased(w, d, 'single');
        setCalcResult(`${res.totalDose} mg`);
        setCalcFormula(res.formula || `${w} kg × ${d} mg/kg = ${res.totalDose} mg`);
      } else if (category === 'conversion') {
        const val = parseFloat(convValue);
        if (isNaN(val)) throw new Error('Enter a valid numeric value.');
        const res = CalculationEngine.convertUnit(val, convFrom, convTo);
        setCalcResult(`${res.converted} ${convTo}`);
        setCalcFormula(`${val} ${convFrom} = ${res.converted} ${convTo}`);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Calculation error.');
      setCalcResult(null);
      setCalcFormula(null);
    }
  };

  const handleClear = () => {
    setVolume('');
    setTimeHours('');
    setDripVolume('');
    setDripTimeMin('');
    setDropFactor('15');
    setPatientWeight('');
    setDosePerKg('');
    setDesiredTablet('');
    setHaveTablet('');
    setDesiredLiquid('');
    setHaveLiquid('');
    setQuantityLiquid('1');
    setConvValue('');
    setCalcResult(null);
    setCalcFormula(null);
    setErrorMsg(null);
  };

  const handleCopy = () => {
    if (calcResult) {
      navigator.clipboard.writeText(`NurseCalc Result: ${calcResult} (${calcFormula})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4 pb-12 animate-fade-in w-full max-w-full overflow-hidden">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Calculator</h1>
        <p className="text-sm text-[#666666] mt-0.5">Clinical dosage verification engine.</p>
      </div>

      {/* Category Pills Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setCategory(cat.id);
              setCalcResult(null);
              setCalcFormula(null);
              setErrorMsg(null);
            }}
            className={`nc-pill flex-shrink-0 ${
              category === cat.id ? 'nc-pill-active' : 'nc-pill-inactive'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Safety Note */}
      <div className="p-3 bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#888888] flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#666666] leading-tight">
          Educational use only. This tool helps you practice calculations. It does not provide medical advice or authorize medication administration.
        </p>
      </div>

      {/* Dynamic Inputs Form */}
      <div className="nc-card p-4 sm:p-5 space-y-4">
        {category === 'flow-rate' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Infusion Volume (mL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="e.g. 500"
                  className="nc-input pr-12 font-medium"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#888888]">mL</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Infusion Time (Hours)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={timeHours}
                  onChange={(e) => setTimeHours(e.target.value)}
                  placeholder="e.g. 4"
                  className="nc-input pr-12 font-medium"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#888888]">hr</span>
              </div>
            </div>
          </>
        )}

        {category === 'drip-rate' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Total Volume (mL)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={dripVolume}
                onChange={(e) => setDripVolume(e.target.value)}
                placeholder="e.g. 1000"
                className="nc-input font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  Time (Minutes)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={dripTimeMin}
                  onChange={(e) => setDripTimeMin(e.target.value)}
                  placeholder="e.g. 480"
                  className="nc-input font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  Drop Factor
                </label>
                <select
                  value={dropFactor}
                  onChange={(e) => setDropFactor(e.target.value)}
                  className="nc-input font-medium bg-white"
                >
                  <option value="10">10 gtt/mL (Macro)</option>
                  <option value="15">15 gtt/mL (Macro)</option>
                  <option value="20">20 gtt/mL (Macro)</option>
                  <option value="60">60 gtt/mL (Micro)</option>
                </select>
              </div>
            </div>
          </>
        )}

        {category === 'tablet' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Desired Dose (mg)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={desiredTablet}
                onChange={(e) => setDesiredTablet(e.target.value)}
                placeholder="e.g. 500"
                className="nc-input font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Dose on Hand (mg / tab)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={haveTablet}
                onChange={(e) => setHaveTablet(e.target.value)}
                placeholder="e.g. 250"
                className="nc-input font-medium"
              />
            </div>
          </>
        )}

        {category === 'liquid' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Desired Dose (mg)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={desiredLiquid}
                onChange={(e) => setDesiredLiquid(e.target.value)}
                placeholder="e.g. 80"
                className="nc-input font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  Available (mg)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={haveLiquid}
                  onChange={(e) => setHaveLiquid(e.target.value)}
                  placeholder="e.g. 200"
                  className="nc-input font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  In Volume (mL)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={quantityLiquid}
                  onChange={(e) => setQuantityLiquid(e.target.value)}
                  placeholder="e.g. 1"
                  className="nc-input font-medium"
                />
              </div>
            </div>
          </>
        )}

        {category === 'weight-based' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Patient Weight (kg)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={patientWeight}
                onChange={(e) => setPatientWeight(e.target.value)}
                placeholder="e.g. 70"
                className="nc-input font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Dose (mg/kg)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={dosePerKg}
                onChange={(e) => setDosePerKg(e.target.value)}
                placeholder="e.g. 5"
                className="nc-input font-medium"
              />
            </div>
          </>
        )}

        {category === 'conversion' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Value to Convert
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={convValue}
                onChange={(e) => setConvValue(e.target.value)}
                placeholder="e.g. 2.5"
                className="nc-input font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  From
                </label>
                <select
                  value={convFrom}
                  onChange={(e) => setConvFrom(e.target.value)}
                  className="nc-input font-medium bg-white"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="mg">Milligrams (mg)</option>
                  <option value="mcg">Micrograms (mcg)</option>
                  <option value="L">Liters (L)</option>
                  <option value="mL">Milliliters (mL)</option>
                  <option value="lb">Pounds (lb)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  To
                </label>
                <select
                  value={convTo}
                  onChange={(e) => setConvTo(e.target.value)}
                  className="nc-input font-medium bg-white"
                >
                  <option value="mg">Milligrams (mg)</option>
                  <option value="mcg">Micrograms (mcg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="mL">Milliliters (mL)</option>
                  <option value="L">Liters (L)</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleCalculate}
            className="nc-btn-primary w-full flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            <span>Calculate</span>
          </button>
          <button
            onClick={handleClear}
            className="nc-btn-secondary w-full flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="nc-card p-4 border-red-300 bg-red-50 text-red-700 text-xs font-medium animate-fade-in">
          {errorMsg}
        </div>
      )}

      {/* Result Card */}
      {calcResult && (
        <div className="nc-card p-4 sm:p-5 border-2 border-emerald-500/40 bg-emerald-50/20 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Deterministic Result
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-medium text-emerald-800 hover:text-emerald-950 px-2.5 py-1 bg-white rounded-lg border border-emerald-200"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="text-2xl font-bold text-[#111111] tracking-tight">
            {calcResult}
          </div>

          {calcFormula && (
            <div className="pt-2 border-t border-[#E5E5E5]/60 text-xs text-[#555555]">
              <span className="font-semibold text-[#111111] block mb-0.5">Formula Applied:</span>
              <span className="font-mono text-[11px] bg-white px-2 py-1 rounded border border-[#E5E5E5] inline-block">
                {calcFormula}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
