import React from 'react';
import { X, CreditCard, Shield } from 'lucide-react';

export default function SubscriptionModal({
  isOpen,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="nc-card max-w-md w-full p-6 space-y-4 shadow-xl relative bg-white border border-[#E5E5E5] rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#111111]" />
            <h3 className="font-bold text-base text-[#111111]">Subscription Management</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-[#666666] hover:text-[#111111] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative message per requirement */}
        <div className="py-4 space-y-3 text-center">
          <div className="w-12 h-12 rounded-full bg-[#F7F7F7] flex items-center justify-center mx-auto text-[#111111]">
            <Shield className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-[#111111]">
            Subscription management will be available after billing integration.
          </p>
          <p className="text-xs text-[#666666] max-w-xs mx-auto leading-relaxed">
            All educational calculators, practice sets, and lessons are currently free for study and review.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="nc-btn-primary w-full"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
}
