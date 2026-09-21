import React, { useState, useEffect } from 'react';
import { 
  Bell, Shield, HelpCircle, ChevronRight, Sparkles, Moon, Sun, 
  Clock, Check, AlertCircle, Volume2, Volume1, VolumeX, ChevronUp, ChevronDown, 
  Calendar, RotateCcw, Zap, Flame, CheckCircle2, Play, Music, Smartphone, Vibrate
} from 'lucide-react';
import {
  getReminderSettings,
  saveReminderSettings,
  getNotificationPermission,
  requestNotificationPermission,
  triggerStudyReminder,
  time24To12,
  time12To24,
  getTimeUntilAlarm,
  playSelectedSound,
  triggerMobileHaptics,
  SOUND_PROFILES
} from '../utils/reminderService';

const WEEKDAYS = [
  { id: 0, label: 'S', name: 'Sun' },
  { id: 1, label: 'M', name: 'Mon' },
  { id: 2, label: 'T', name: 'Tue' },
  { id: 3, label: 'W', name: 'Wed' },
  { id: 4, label: 'T', name: 'Thu' },
  { id: 5, label: 'F', name: 'Fri' },
  { id: 6, label: 'S', name: 'Sat' },
];

export default function SettingsView({ 
  user,
  isDarkMode,
  onToggleDarkMode,
  onNavigate,
  onOpenSubscriptionModal,
  onSeedRealisticData,
  onResetAllData,
  onTriggerToastReminder
}) {
  const [reminderSettings, setReminderSettings] = useState(getReminderSettings());
  const [permissionState, setPermissionState] = useState(getNotificationPermission());
  
  // Watch Time components state (12-hour format)
  const initial12 = time24To12(reminderSettings.time || '20:00');
  const [hour, setHour] = useState(initial12.hour);
  const [minute, setMinute] = useState(initial12.minute);
  const [period, setPeriod] = useState(initial12.period);
  const [selectedDays, setSelectedDays] = useState(reminderSettings.days || [0, 1, 2, 3, 4, 5, 6]);
  const [selectedSound, setSelectedSound] = useState(reminderSettings.soundId || 'chime');
  const [volume, setVolume] = useState(reminderSettings.volume !== undefined ? reminderSettings.volume : 0.8);
  const [vibrateEnabled, setVibrateEnabled] = useState(reminderSettings.vibrateEnabled !== false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [playingSoundId, setPlayingSoundId] = useState(null);

  useEffect(() => {
    setPermissionState(getNotificationPermission());
    
    // Live clock update
    const updateTime = () => {
      const now = new Date();
      let h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const p = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      if (h === 0) h = 12;
      setCurrentTimeStr(`${String(h).padStart(2, '0')}:${m}:${s} ${p}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Synchronize 12h watch controls & sound to persistent state
  const applyTimeUpdate = (newHour, newMinute, newPeriod, newDays, newSoundId, newVol, newVib) => {
    const time24 = time12To24(newHour, newMinute, newPeriod);
    const next = {
      ...reminderSettings,
      time: time24,
      days: newDays !== undefined ? newDays : selectedDays,
      soundId: newSoundId !== undefined ? newSoundId : selectedSound,
      volume: newVol !== undefined ? newVol : volume,
      vibrateEnabled: newVib !== undefined ? newVib : vibrateEnabled
    };
    setReminderSettings(next);
    saveReminderSettings(next);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleToggleReminders = async () => {
    const nextEnabled = !reminderSettings.enabled;
    const nextSettings = { ...reminderSettings, enabled: nextEnabled };

    if (nextEnabled && permissionState === 'default') {
      const perm = await requestNotificationPermission();
      setPermissionState(perm);
    }

    setReminderSettings(nextSettings);
    saveReminderSettings(nextSettings);
  };

  const stepHour = (delta) => {
    let num = parseInt(hour, 10) + delta;
    if (num > 12) num = 1;
    if (num < 1) num = 12;
    const formatted = String(num).padStart(2, '0');
    setHour(formatted);
    applyTimeUpdate(formatted, minute, period);
  };

  const stepMinute = (delta) => {
    let num = parseInt(minute, 10) + delta;
    if (num >= 60) num = 0;
    if (num < 0) num = 59;
    const formatted = String(num).padStart(2, '0');
    setMinute(formatted);
    applyTimeUpdate(hour, formatted, period);
  };

  const togglePeriod = (newPeriod) => {
    if (newPeriod === period) return;
    setPeriod(newPeriod);
    applyTimeUpdate(hour, minute, newPeriod);
  };

  const toggleDay = (dayId) => {
    let nextDays;
    if (selectedDays.includes(dayId)) {
      if (selectedDays.length === 1) return;
      nextDays = selectedDays.filter(d => d !== dayId);
    } else {
      nextDays = [...selectedDays, dayId].sort();
    }
    setSelectedDays(nextDays);
    applyTimeUpdate(hour, minute, period, nextDays);
  };

  const handleSelectSound = (soundId) => {
    setSelectedSound(soundId);
    setPlayingSoundId(soundId);
    playSelectedSound(soundId, volume);
    applyTimeUpdate(hour, minute, period, selectedDays, soundId);
    setTimeout(() => setPlayingSoundId(null), 1500);
  };

  const handlePreviewSoundOnly = (e, soundId) => {
    e.stopPropagation();
    setPlayingSoundId(soundId);
    playSelectedSound(soundId, volume);
    setTimeout(() => setPlayingSoundId(null), 1500);
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    applyTimeUpdate(hour, minute, period, selectedDays, selectedSound, newVol);
  };

  const handleVolumePreview = (newVol) => {
    playSelectedSound(selectedSound, newVol);
  };

  const handleToggleVibrate = () => {
    const nextVib = !vibrateEnabled;
    setVibrateEnabled(nextVib);
    if (nextVib) triggerMobileHaptics([100, 50, 100]);
    applyTimeUpdate(hour, minute, period, selectedDays, selectedSound, volume, nextVib);
  };

  const handleTestAlarm = () => {
    triggerStudyReminder({
      title: '⏰ Scheduled Study Alarm (Mobile & Web Test)',
      body: `Daily Practice Reminder (${hour}:${minute} ${period}) — Solve 3 questions to maintain your Day Streak!`,
      onInAppToast: onTriggerToastReminder
    });
  };

  const timeUntil = getTimeUntilAlarm(reminderSettings.time);

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Manage study alarms, custom sound themes, and clinical preferences.</p>
      </div>

      {/* Account Info Card */}
      <div className="nc-card p-4 sm:p-5 flex items-center justify-between gap-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-extrabold text-base shadow-sm">
            {user?.name ? user.name.charAt(0) : 'N'}
          </div>
          <div className="min-w-0">
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white truncate">{user?.name || 'Nurse Student'}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email || 'student@nursecalc.app'}</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('profile')}
          className="nc-btn-secondary px-3.5 py-1.5 text-xs font-bold flex-shrink-0 cursor-pointer"
        >
          View Profile
        </button>
      </div>

      {/* Simple Black & White Minimalist Study Reminder */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Study Alarm Reminder
          </span>
          <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
            {currentTimeStr}
          </span>
        </div>

        <div className="nc-card p-4 sm:p-5 space-y-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-xs">
          {/* Header Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Daily Practice Alarm
                </h3>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  reminderSettings.enabled 
                    ? 'border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                    : 'border-slate-300 dark:border-slate-700 text-slate-400'
                }`}>
                  {reminderSettings.enabled ? 'ENABLED' : 'PAUSED'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {reminderSettings.enabled && timeUntil
                  ? `Scheduled ${timeUntil} (${hour}:${minute} ${period})`
                  : 'Alarm is currently disabled.'}
              </p>
            </div>

            <button
              id="btn-toggle-reminders"
              onClick={handleToggleReminders}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                reminderSettings.enabled ? 'bg-slate-900 dark:bg-white' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full ${
                  reminderSettings.enabled ? 'bg-white dark:bg-slate-900 translate-x-6' : 'bg-white translate-x-1'
                } transition-transform shadow-xs`}
              />
            </button>
          </div>

          {reminderSettings.enabled && (
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 animate-fade-in">
              {/* Row 1: Time Picker (Clean Badge + Input) */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] font-black tracking-wider text-slate-700 dark:text-slate-300 flex-shrink-0 min-w-[64px] text-center">
                  TIME
                </span>
                <input
                  type="time"
                  value={reminderSettings.time || '20:00'}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val) {
                      const parsed = time24To12(val);
                      setHour(parsed.hour);
                      setMinute(parsed.minute);
                      setPeriod(parsed.period);
                      applyTimeUpdate(parsed.hour, parsed.minute, parsed.period);
                    }
                  }}
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white font-mono shadow-2xs"
                />
                <span className="px-3 py-2 text-xs font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white flex-shrink-0">
                  {hour}:{minute} {period}
                </span>
              </div>

              {/* Row 2: Sound Select Dropdown (Clean Badge + Select + Test Button) */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] font-black tracking-wider text-slate-700 dark:text-slate-300 flex-shrink-0 min-w-[64px] text-center">
                  SOUND
                </span>
                <div className="relative flex-1">
                  <select
                    value={selectedSound}
                    onChange={(e) => handleSelectSound(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 pr-8 text-xs font-bold text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white shadow-2xs"
                  >
                    {SOUND_PROFILES.map((sound) => (
                      <option key={sound.id} value={sound.id}>
                        {sound.name} — {sound.desc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectSound(selectedSound)}
                  className="px-3 py-2 rounded-lg border border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0 shadow-2xs"
                >
                  Test Sound
                </button>
              </div>

              {/* Row 3: Repeat Schedule (Clean Badge + Days) */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] font-black tracking-wider text-slate-700 dark:text-slate-300 flex-shrink-0 min-w-[64px] text-center">
                  DAYS
                </span>
                <div className="flex items-center gap-1.5 flex-1">
                  {WEEKDAYS.map((day) => {
                    const isSelected = selectedDays.includes(day.id);
                    return (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => toggleDay(day.id)}
                        className={`flex-1 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs font-extrabold'
                            : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-700 hover:border-slate-300'
                        }`}
                        title={day.name}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Volume & Mobile Vibration (Monochrome) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Volume: {Math.round(volume * 100)}%
                  </span>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    onMouseUp={(e) => handleVolumePreview(parseFloat(e.target.value))}
                    className="w-24 accent-slate-900 dark:accent-white cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mobile Vibration
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleVibrate}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                      vibrateEnabled ? 'bg-slate-900 dark:bg-white' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full ${
                        vibrateEnabled ? 'bg-white dark:bg-slate-900 translate-x-4.5' : 'bg-white translate-x-1'
                      } transition-transform`}
                    />
                  </button>
                </div>
              </div>

              {/* Footer: Notification Permission & Full Alarm Test */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div>
                  {permissionState === 'granted' ? (
                    <span className="text-slate-600 dark:text-slate-400 font-medium inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                      Browser alerts enabled
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={async () => {
                        const perm = await requestNotificationPermission();
                        setPermissionState(perm);
                      }}
                      className="text-slate-900 dark:text-white underline font-bold cursor-pointer"
                    >
                      Enable device notifications
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleTestAlarm}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Test Alarm Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preferences Section */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          App Preferences
        </span>
        <div className="nc-card divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-[#111827]">
          {/* Dark Mode Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200">
                {isDarkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-slate-700" />}
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">Appearance Mode</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {isDarkMode ? 'Dark Slate Mode Active' : 'Light Clean Medical Active'}
                </span>
              </div>
            </div>
            <button
              onClick={onToggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                isDarkMode ? 'bg-slate-900 dark:bg-white' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-900 transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Pro Membership / Upgrade */}
          <button
            onClick={onOpenSubscriptionModal}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">NurseCalc Pro Tier</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">All features unlocked for learning</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </button>
        </div>
      </div>

      {/* Safety & Legal */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          Safety & Policies
        </span>
        <div className="nc-card divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-[#111827]">
          <button
            onClick={() => onNavigate('safety')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">ISMP Decimal Rules</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </button>

          <button
            onClick={() => onNavigate('help')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Help & Clinical Math Reference</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </button>
        </div>
      </div>

      {/* Real-Time Data Controls */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          Real-Time Data Management
        </span>
        <div className="nc-card p-4 space-y-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All practice attempts, scores, streaks, and mistakes sync live with the backend and local storage in real time.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => {
                if (window.confirm('Reset all your practice attempts, scores, and mistakes to 0? This gives you a completely clean slate.')) {
                  onResetAllData();
                }
              }}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
            >
              Reset All Records to 0 (Clean Slate)
            </button>
            <button
              onClick={() => {
                if (window.confirm('Load sample clinical history for testing and demonstration?')) {
                  onSeedRealisticData();
                }
              }}
              className="nc-btn-secondary px-3.5 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              Load Sample History (Demo / Testing)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
