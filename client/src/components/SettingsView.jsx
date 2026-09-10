import React from 'react';
import { 
  User, Target, Sliders, Bell, Eye, Lock, 
  Shield, HelpCircle, Info, ChevronRight, LogOut 
} from 'lucide-react';

export default function SettingsView({ 
  onLogout, 
  onOpenSubscriptionModal 
}) {
  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        { label: 'Account', icon: User, value: '' },
        { label: 'Learning Goals', icon: Target, value: '' },
        { label: 'Practice Preferences', icon: Sliders, value: '' },
        { label: 'Notifications', icon: Bell, value: 'Enabled' },
        { label: 'Appearance', icon: Eye, value: 'Light' },
        { label: 'Privacy', icon: Lock, value: '' },
      ]
    },
    {
      title: 'Support & Legal',
      items: [
        { label: 'Safety & Educational Use', icon: Shield, value: '' },
        { label: 'Help & Support', icon: HelpCircle, value: '' },
        { label: 'About', icon: Info, value: 'v1.0.0' },
      ]
    }
  ];

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Settings</h1>
      </div>

      <div className="space-y-4">
        {settingsSections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888888] px-1">
              {section.title}
            </span>
            <div className="nc-card divide-y divide-[#E5E5E5] overflow-hidden">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={itemIdx}
                    className="p-4 flex items-center justify-between hover:bg-[#F7F7F7] cursor-pointer transition-colors min-h-[48px]"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#666666]" />
                      <span className="text-sm font-medium text-[#111111]">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.value && (
                        <span className="text-xs text-[#888888]">{item.value}</span>
                      )}
                      <ChevronRight className="w-4 h-4 text-[#888888]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <button
          onClick={onLogout}
          className="nc-btn-secondary w-full text-red-600 border-red-200 hover:bg-red-50 flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
