/**
 * NurseCalc Clinical Study Reminder Service
 * Handles browser Web Notifications, in-app scheduled alarms, multi-sound synthesis, and persistent reminder state.
 */

const STORAGE_KEY = 'nursecalc_study_reminder_settings';
const LAST_TRIGGER_KEY = 'nursecalc_last_reminder_trigger_key';

export const SOUND_PROFILES = [
  {
    id: 'chime',
    name: 'Hospital Chime',
    desc: 'Soft uplifting harmonic arpeggio (C5-E5-G5-C6)',
    icon: '',
    play: (ctx, vol = 0.8) => {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.25 * vol, ctx.currentTime + i * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.65);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.7);
      });
    }
  },
  {
    id: 'clinical',
    name: 'Clinical Monitor',
    desc: 'Crisp dual-tone telemetry pulse (880Hz / 1320Hz)',
    icon: '',
    play: (ctx, vol = 0.8) => {
      [880, 1320].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
        gain.gain.linearRampToValueAtTime(0.28 * vol, ctx.currentTime + i * 0.15 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.15);
        osc.stop(ctx.currentTime + i * 0.15 + 0.32);
      });
    }
  },
  {
    id: 'marimba',
    name: 'Warm Marimba',
    desc: 'Resonant wooden acoustic chime (G4-C5-E5-G5)',
    icon: '',
    play: (ctx, vol = 0.8) => {
      const notes = [392.00, 523.25, 659.25, 783.99];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.26 * vol, ctx.currentTime + i * 0.09 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.09 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.09);
        osc.stop(ctx.currentTime + i * 0.09 + 0.5);
      });
    }
  },
  {
    id: 'bell',
    name: 'Stethoscope Bell',
    desc: 'Crisp resonant high-metallic chime (1174Hz)',
    icon: '',
    play: (ctx, vol = 0.8) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1174.66, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3 * vol, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.25);
    }
  },
  {
    id: 'harp',
    name: 'Ethereal Harp',
    desc: 'Peaceful 5-note pentatonic glissando cascade',
    icon: '',
    play: (ctx, vol = 0.8) => {
      const notes = [523.25, 587.33, 659.25, 783.99, 880.00];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.22 * vol, ctx.currentTime + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + i * 0.08 + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.85);
      });
    }
  },
  {
    id: 'watch',
    name: 'Digital Wristwatch',
    desc: 'Classic 2-beep electronic watch alert (2048Hz)',
    icon: '',
    play: (ctx, vol = 0.8) => {
      [0, 0.14].forEach((t) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(2048, ctx.currentTime + t);
        gain.gain.setValueAtTime(0.1 * vol, ctx.currentTime + t);
        gain.gain.setValueAtTime(0.1 * vol, ctx.currentTime + t + 0.08);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + t + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.1);
      });
    }
  },
  {
    id: 'zen',
    name: 'Zen Singing Bowl',
    desc: 'Calm 432Hz meditative pure focus chime',
    icon: '',
    play: (ctx, vol = 0.8) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3 * vol, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.85);
    }
  },
  {
    id: 'pulse',
    name: 'Vital Pulse',
    desc: 'Deep soothing low-frequency cardiac reminder',
    icon: '',
    play: (ctx, vol = 0.8) => {
      [330, 440].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.18);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.18);
        gain.gain.linearRampToValueAtTime(0.28 * vol, ctx.currentTime + i * 0.18 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.18);
        osc.stop(ctx.currentTime + i * 0.18 + 0.6);
      });
    }
  }
];

export const DEFAULT_REMINDER_SETTINGS = {
  enabled: true,
  time: '20:00', // 24-hour internal format (08:00 PM)
  label: 'Daily Medication Math Practice',
  days: [0, 1, 2, 3, 4, 5, 6], // All 7 days
  soundId: 'chime',
  soundEnabled: true,
  volume: 0.8, // 0.1 to 1.0
  vibrateEnabled: true,
  snoozeMinutes: 5
};

let sharedAudioCtx = null;

export const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioContext();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
};

// Auto-unlock audio on mobile devices upon first user touch/click
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch {}
  };
  window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
  window.addEventListener('click', unlockAudio, { once: true, passive: true });
}

export const triggerMobileHaptics = (pattern = [120, 60, 120, 60, 200]) => {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator && typeof navigator.vibrate === 'function') {
      navigator.vibrate(pattern);
    }
  } catch (e) {
    console.warn('Vibration API not supported or blocked:', e);
  }
};

export const getReminderSettings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_REMINDER_SETTINGS, ...JSON.parse(saved) } : DEFAULT_REMINDER_SETTINGS;
  } catch {
    return DEFAULT_REMINDER_SETTINGS;
  }
};

export const saveReminderSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save reminder settings', e);
  }
};

export const playSelectedSound = (soundId = 'chime', customVol) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const settings = getReminderSettings();
    const vol = typeof customVol === 'number' ? customVol : (settings.volume !== undefined ? settings.volume : 0.8);
    
    // Mobile haptic vibration if enabled
    if (settings.vibrateEnabled !== false) {
      triggerMobileHaptics([80, 40, 120]);
    }

    const profile = SOUND_PROFILES.find(s => s.id === soundId) || SOUND_PROFILES[0];
    profile.play(ctx, vol);
  } catch (e) {
    console.warn('Audio synthesis playback error:', e);
  }
};

export const playChime = () => {
  const settings = getReminderSettings();
  playSelectedSound(settings.soundId || 'chime');
};

export const time24To12 = (time24 = '08:00') => {
  const [hStr, mStr] = (time24 || '08:00').split(':');
  let h = parseInt(hStr, 10);
  const m = mStr ? mStr.padStart(2, '0') : '00';
  if (isNaN(h)) h = 8;
  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return {
    hour: String(h).padStart(2, '0'),
    minute: m,
    period
  };
};

export const time12To24 = (hour, minute, period) => {
  let h = parseInt(hour, 10);
  const m = String(minute).padStart(2, '0');
  if (isNaN(h)) h = 8;
  if (period === 'PM' && h < 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m}`;
};

export const getTimeUntilAlarm = (time24) => {
  if (!time24) return '';
  const [targetH, targetM] = time24.split(':').map(Number);
  const now = new Date();
  const target = new Date(now);
  target.setHours(targetH, targetM, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const diffMs = target - now;
  const totalMins = Math.round(diffMs / 60000);
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  if (hours === 0) {
    return mins <= 1 ? 'in less than a minute' : `in ${mins} minutes`;
  }
  return mins === 0 ? `in ${hours} ${hours === 1 ? 'hour' : 'hours'}` : `in ${hours}h ${mins}m`;
};

export const getNotificationPermission = () => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission; // 'granted' | 'denied' | 'default'
};

export const requestNotificationPermission = async () => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.warn('Error requesting notification permission:', err);
    return 'denied';
  }
};

export const sendBrowserNotification = (title, body) => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    try {
      const notification = new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'nursecalc-study-reminder',
        renotify: true,
        requireInteraction: false
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return true;
    } catch (e) {
      console.warn('Failed to send browser notification:', e);
      return false;
    }
  }
  return false;
};

export const triggerStudyReminder = ({ title, body, onInAppToast }) => {
  const settings = getReminderSettings();
  const reminderTitle = title || ' Scheduled Study Alarm';
  const reminderBody = body || 'Time for your daily clinical dosage practice! Keep your streak and NCLEX skills sharp.';

  // 1. Play selected sound
  if (settings.soundEnabled !== false) {
    playSelectedSound(settings.soundId || 'chime');
  }

  // 2. Send Native Browser Notification
  const sent = sendBrowserNotification(reminderTitle, reminderBody);

  // 3. Trigger In-App Visual Toast
  if (onInAppToast) {
    onInAppToast({
      title: reminderTitle,
      body: reminderBody,
      timestamp: new Date().toISOString()
    });
  }

  return { success: true, nativeDelivered: sent };
};

export const checkAndTriggerScheduledReminder = (onInAppToast) => {
  const settings = getReminderSettings();
  if (!settings.enabled || !settings.time) return;

  const now = new Date();
  const currentDay = now.getDay();

  // If specific repeat days are set, check if today is included
  if (Array.isArray(settings.days) && settings.days.length > 0 && !settings.days.includes(currentDay)) {
    return;
  }

  const currentHours = String(now.getHours()).padStart(2, '0');
  const currentMinutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${currentHours}:${currentMinutes}`;
  const todayDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const triggerKey = `${todayDateStr}_${settings.time}`;
  const lastTriggerKey = localStorage.getItem(LAST_TRIGGER_KEY);

  if (currentTimeStr === settings.time && lastTriggerKey !== triggerKey) {
    localStorage.setItem(LAST_TRIGGER_KEY, triggerKey);
    triggerStudyReminder({
      title: ' Scheduled Study Alarm Triggered!',
      body: `${settings.label || 'Daily Medication Math Review'} (${time24To12(settings.time).hour}:${time24To12(settings.time).minute} ${time24To12(settings.time).period}) — Time to practice!`,
      onInAppToast
    });
  }
};
