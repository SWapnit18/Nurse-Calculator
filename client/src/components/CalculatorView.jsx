import React, { useState } from 'react';
import { 
  Calculator, RotateCcw, Copy, Check,
  Droplets, Clock, Scale, Pill, FlaskConical, ArrowLeftRight
} from 'lucide-react';
import CalculationEngine from '../calculator/engine';

const CATEGORIES = [
  { 
    id: 'flow-rate', 
    label: 'Flow Rate', 
    unitBadge: 'mL/hr',
    icon: Droplets,
    title: 'Flow Rate', 
    formula: 'Volume (mL) ÷ Hours',
    desc: 'Volumetric infusion pump rate'
  },
  { 
    id: 'drip-rate', 
    label: 'Drip Rate', 
    unitBadge: 'gtt/min',
    icon: Clock,
    title: 'Gravity Drip Rate', 
    formula: '(Volume × Drop Factor) ÷ Minutes',
    desc: 'Manual tubing drop rate'
  },
  { 
    id: 'weight-based', 
    label: 'Weight', 
    unitBadge: 'mg/kg',
    icon: Scale,
    title: 'Weight-Based Dose', 
    formula: 'Weight (kg) × Dose (mg/kg)',
    desc: 'Dosage by body mass'
  },
  { 
    id: 'tablet', 
    label: 'Tablet', 
    unitBadge: 'tabs',
    icon: Pill,
    title: 'Tablet Dosage', 
    formula: 'Desired ÷ Have',
    desc: 'Solid oral tablet count'
  },
  { 
    id: 'liquid', 
    label: 'Liquid', 
    unitBadge: 'mL',
    icon: FlaskConical,
    title: 'Liquid Dosage', 
    formula: '(Desired ÷ Have) × Volume',
    desc: 'Liquid oral / injectable volume'
  },
  { 
    id: 'conversion', 
    label: 'Conversion', 
    unitBadge: 'g ⇄ mg',
    icon: ArrowLeftRight,
    title: 'Unit Conversion', 
    formula: 'Metric Factor',
    desc: 'Metric clinical conversion'
  },
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

  const activeCategoryObj = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];

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
    <div className="space-y-4 pb-8 animate-fade-in w-full max-w-full">
      {/* Minimal Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Calculator
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Select a category to compute exact clinical dosages.
        </p>
      </div>

      {/* Clean Segmented Category Bar */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
        {CATEGORIES.map((cat) => {
          const isSelected = category === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                setCalcResult(null);
                setCalcFormula(null);
                setErrorMsg(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                isSelected 
                  ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900' 
                  : 'text-slate-400 dark:text-slate-500'
              }`}>
                {cat.unitBadge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Clean Unified Calculation Card */}
      <div className="nc-card p-5 space-y-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Card Header with Formula Hint */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              {activeCategoryObj.title}
            </h2>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {activeCategoryObj.desc}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200/60 dark:border-slate-700">
            {activeCategoryObj.formula}
          </span>
        </div>

        {/* Input Fields */}
        {category === 'flow-rate' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Infusion Volume
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="500"
                  className="nc-input pr-12 font-medium"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">mL</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Infusion Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={timeHours}
                  onChange={(e) => setTimeHours(e.target.value)}
                  placeholder="4"
                  className="nc-input pr-12 font-medium"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">hr</span>
              </div>
            </div>
          </div>
        )}

        {category === 'drip-rate' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Total Volume
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={dripVolume}
                  onChange={(e) => setDripVolume(e.target.value)}
                  placeholder="1000"
                  className="nc-input pr-12 font-medium"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">mL</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Time (Minutes)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={dripTimeMin}
                  onChange={(e) => setDripTimeMin(e.target.value)}
                  placeholder="480"
                  className="nc-input font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Drop Factor
                </label>
                <select
                  value={dropFactor}
                  onChange={(e) => setDropFactor(e.target.value)}
                  className="nc-input font-medium bg-white dark:bg-[#1A2234]"
                >
                  <option value="10">10 gtt/mL (Macro)</option>
                  <option value="15">15 gtt/mL (Macro)</option>
                  <option value="20">20 gtt/mL (Macro)</option>
                  <option value="60">60 gtt/mL (Micro)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {category === 'tablet' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Desired Dose (mg)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={desiredTablet}
                onChange={(e) => setDesiredTablet(e.target.value)}
                placeholder="500"
                className="nc-input font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Dose on Hand (mg / tab)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={haveTablet}
                onChange={(e) => setHaveTablet(e.target.value)}
                placeholder="250"
                className="nc-input font-medium"
              />
            </div>
          </div>
        )}

        {category === 'liquid' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Desired Dose (mg)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={desiredLiquid}
                onChange={(e) => setDesiredLiquid(e.target.value)}
                placeholder="80"
                className="nc-input font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Available (mg)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={haveLiquid}
                  onChange={(e) => setHaveLiquid(e.target.value)}
                  placeholder="200"
                  className="nc-input font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  In Volume (mL)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={quantityLiquid}
                  onChange={(e) => setQuantityLiquid(e.target.value)}
                  placeholder="1"
                  className="nc-input font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {category === 'weight-based' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Patient Weight (kg)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={patientWeight}
                onChange={(e) => setPatientWeight(e.target.value)}
                placeholder="70"
                className="nc-input font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Dose (mg / kg)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={dosePerKg}
                onChange={(e) => setDosePerKg(e.target.value)}
                placeholder="5"
                className="nc-input font-medium"
              />
            </div>
          </div>
        )}

        {category === 'conversion' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Value to Convert
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={convValue}
                onChange={(e) => setConvValue(e.target.value)}
                placeholder="2.5"
                className="nc-input font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  From
                </label>
                <select
                  value={convFrom}
                  onChange={(e) => setConvFrom(e.target.value)}
                  className="nc-input font-medium bg-white dark:bg-[#1A2234]"
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
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  To
                </label>
                <select
                  value={convTo}
                  onChange={(e) => setConvTo(e.target.value)}
                  className="nc-input font-medium bg-white dark:bg-[#1A2234]"
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
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleCalculate}
            className="nc-btn-primary flex-1 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate</span>
          </button>
          <button
            onClick={handleClear}
            className="nc-btn-secondary px-4 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            title="Reset fields"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Clear</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-xs font-semibold rounded-xl border border-red-200 dark:border-red-900 animate-fade-in">
            {errorMsg}
          </div>
        )}

        {/* Calculation Result */}
        {calcResult && (
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Calculated Dose
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 px-2 py-0.5 bg-white dark:bg-[#111827] rounded-md border border-emerald-200 dark:border-emerald-800 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {calcResult}
            </div>

            {calcFormula && (
              <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 pt-1 border-t border-emerald-200/50 dark:border-emerald-900/40">
                {calcFormula}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Quiet Minimal Footer Disclaimer */}
      <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 pt-1">
        Clinical math practice tool · Follow ISMP guidelines & 5 Rights
      </p>
    </div>
  );
}
