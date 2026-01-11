import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from '../types';

interface SubscriptionCheckoutProps {
  onComplete: () => void;
  onUpdatePlan: (plan: string) => void;
}

const SubscriptionCheckout: React.FC<SubscriptionCheckoutProps> = ({ onComplete, onUpdatePlan }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, price } = location.state || { plan: 'Premium', price: 89 };

  const [paymentMethod, setPaymentMethod] = useState('Apple Pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const paymentOptions = [
    { id: 'Apple Pay', label: 'Apple Pay', icon: 'payments', prefix: 'ios' },
    { id: 'Card', label: 'Credit or Debit Card', icon: 'credit_card' },
    { id: 'UPI', label: 'UPI / Net Banking', icon: 'account_balance_wallet' },
  ];

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowToast(true);
      onUpdatePlan(plan); // Update user's actual plan
      onComplete();
      setTimeout(() => {
        navigate(RoutePath.Profile);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#060b07] text-white pb-44 relative">
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[300] bg-primary text-luxury-dark font-black px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="material-symbols-outlined">verified</span>
          <span>Welcome to the Circle! Subscription Active.</span>
        </div>
      )}

      {/* Header */}
      <div className="h-20 flex items-center px-6 sticky top-0 bg-[#060b07]/80 backdrop-blur-xl z-50">
        <button onClick={() => navigate(-1)} className="material-symbols-outlined text-white/90 font-bold">
          arrow_back
        </button>
        <h1 className="flex-1 text-center font-bold text-xl tracking-tight">Plan Subscription</h1>
      </div>

      <div className="max-w-xl mx-auto px-6 py-4 space-y-10">
        {/* Selected Plan Summary */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-end mb-5">
            <h2 className="font-bold text-xl tracking-tight">Your Selection</h2>
          </div>
          <div className="bg-[#111812] rounded-[2rem] p-8 border-2 border-primary/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-black text-white mb-2">{plan} Tier</h3>
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Recurring Monthly Access</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-black text-primary">${price}</span>
                <span className="text-white/20 text-xs block font-bold">/ MONTH</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
               <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  Full access to artisan batches
               </div>
               <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  Priority shipping included
               </div>
               <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  Cancel or swap plans anytime
               </div>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <h2 className="font-bold text-xl tracking-tight mb-5">Payment Method</h2>
          <div className="space-y-3">
            {paymentOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                className={`w-full flex items-center gap-4 py-5 px-6 rounded-[1.5rem] border-2 transition-all ${
                  paymentMethod === opt.id
                    ? 'bg-[#111812] border-primary'
                    : 'bg-[#111812] border-white/5'
                }`}
              >
                <div className="flex items-center gap-4 flex-grow">
                  <span className="material-symbols-outlined text-white/40 text-[24px]">
                    {opt.icon}
                  </span>
                  <div className="flex items-center gap-2">
                    {opt.prefix && (
                      <span className="text-[10px] font-black uppercase text-white/40 tracking-tighter">
                        {opt.prefix}
                      </span>
                    )}
                    <span className={`font-bold text-[16px] tracking-tight ${paymentMethod === opt.id ? 'text-white' : 'text-white/80'}`}>
                      {opt.label}
                    </span>
                  </div>
                </div>
                <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentMethod === opt.id ? 'border-primary' : 'border-white/10'
                }`}>
                  {paymentMethod === opt.id && (
                    <div className="size-[0.85rem] bg-primary rounded-full shadow-[0_0_10px_rgba(19,236,91,0.4)]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Commitment box */}
        <div className="bg-[#0e1810] border border-primary/10 rounded-[1.5rem] p-6 flex gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="size-11 flex items-center justify-center flex-shrink-0 text-primary">
            <span className="material-symbols-outlined text-3xl">verified_user</span>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white text-[17px]">No Commitment</h4>
            <p className="text-xs text-white/40 leading-relaxed">Swap plans or pause your subscription directly from your profile at any time. We charge your {paymentMethod} on the 1st of every month.</p>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#060b07]/95 backdrop-blur-xl border-t border-white/5 px-6 pt-6 pb-8 z-50">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-end mb-6">
            <div className="space-y-0.5">
              <span className="text-[10px] text-white/40 uppercase font-black tracking-widest block mb-1">DUE TODAY</span>
              <span className="text-[2.5rem] font-black leading-none">${price.toFixed(2)}</span>
            </div>
            <p className="text-white/20 text-[10px] font-bold text-right">Includes priority shipping &<br/>eco-packaging surcharge</p>
          </div>
          <button
            onClick={handleConfirm}
            disabled={isProcessing || showToast}
            className={`w-full py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center transition-all ${
              isProcessing 
              ? 'bg-primary/20 text-luxury-dark/40 cursor-wait' 
              : showToast ? 'bg-primary/50 text-luxury-dark/50' : 'bg-primary text-luxury-dark hover:scale-[1.01] active:scale-[0.98] shadow-[0_15px_40px_rgba(19,236,91,0.15)]'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Setting up Access...
              </div>
            ) : showToast ? 'Welcome to the Circle!' : 'Secure My Subscription'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCheckout;