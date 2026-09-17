import React from 'react';
import { ArrowLeft, Bookmark, Menu, Sun, Moon } from 'lucide-react';

export default function MobileHeader({ 
  title, 
  showBack, 
  onBack, 
  onOpenMenu, 
  onOpenProfile, 
  showBookmark,
  isBookmarked,
  onToggleBookmark,
  user,
  isDarkMode,
  onToggleDarkMode
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between min-h-[58px] transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        {showBack ? (
          <button 
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-extrabold text-xs tracking-wider shadow-sm">
              NC
            </div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight truncate">
              NurseCalc
            </span>
          </div>
        )}
        {title && (
          <h1 className="font-bold text-base text-slate-900 dark:text-slate-100 truncate ml-1">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Dark/Light Mode Switcher */}
        <button
          onClick={onToggleDarkMode}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-400 stroke-[2.2]" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 stroke-[2.2]" />
          )}
        </button>

        {showBookmark && (
          <button
            onClick={onToggleBookmark}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              isBookmarked 
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : 'stroke-[2]'}`} />
          </button>
        )}

        <button
          onClick={onOpenMenu}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
          aria-label="Open navigation menu"
          title="Open Menu"
        >
          <Menu className="w-5 h-5 stroke-[2]" />
        </button>

        <button
          onClick={onOpenProfile}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all ml-0.5 cursor-pointer"
          aria-label="View profile"
          title="Profile"
        >
          <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center text-xs font-bold uppercase tracking-wider">
            {user?.name ? user.name.charAt(0) : 'N'}
          </div>
        </button>
      </div>
    </header>
  );
}
