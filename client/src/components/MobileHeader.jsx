import React from 'react';
import { ArrowLeft, Bookmark, Menu } from 'lucide-react';

export default function MobileHeader({ 
  title, 
  showBack, 
  onBack, 
  onOpenMenu, 
  onOpenProfile, 
  showBookmark,
  isBookmarked,
  onToggleBookmark,
  user
}) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E5E5E5] px-4 py-2.5 flex items-center justify-between min-h-[56px] transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        {showBack ? (
          <button 
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-[#111111] hover:bg-[#F7F7F7] active:scale-95 transition-all"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2]" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm">
              NC
            </div>
            <span className="font-bold text-lg text-[#111111] tracking-tight truncate">NurseCalc</span>
          </div>
        )}
        {title && (
          <h1 className="font-semibold text-base text-[#111111] truncate ml-1">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        {showBookmark && (
          <button
            onClick={onToggleBookmark}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isBookmarked ? 'text-[#111111] bg-[#F7F7F7]' : 'text-[#888888] hover:text-[#111111] hover:bg-[#F7F7F7]'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        )}

        <button
          onClick={onOpenMenu}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[#111111] hover:bg-[#F7F7F7] active:scale-95 transition-all"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5 stroke-[2]" />
        </button>

        <button
          onClick={onOpenProfile}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[#111111] hover:bg-[#F7F7F7] active:scale-95 transition-all ml-0.5"
          aria-label="View profile"
        >
          <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-semibold uppercase tracking-wider">
            {user?.name ? user.name.charAt(0) : 'N'}
          </div>
        </button>
      </div>
    </header>
  );
}
