import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, RoutePath } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onComplete }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('15');
  const [paymentMethod, setPaymentMethod] = useState('Apple Pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const dates = [
    { day: 'WED', date: '15' },
    { day: 'THU', date: '16' },
    { day: 'FRI', date: '17' },
    { day: 'SAT', date: '18' },
    { day: 'SUN', date: '19' },
  ];

  const paymentOptions = [
    { id: 'Apple Pay', label: 'Apple Pay', icon: 'payments', prefix: 'ios' },
    { id: 'Card', label: 'Credit or Debit Card', icon: 'credit_card' },
    { id: 'UPI', label: 'UPI / Net Banking', icon: 'account_balance_wallet' },
  ];

  const handleConfirm = () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    // Simulate real-world payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowToast(true);
      onComplete(); // Clear the cart
      
      // Navigate away after a short delay so they see the success message
      setTimeout(() => {
        navigate(RoutePath.Home);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#060b07] text-white pb-44 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[300] bg-primary text-luxury-dark font-black px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="material-symbols-outlined">check_circle</span>
          <span>Done! Your order is confirmed.</span>
        </div>
      )}

      {/* Header */}
      <div className="h-20 flex items-center px-6 sticky top-0 bg-[#060b07]/80 backdrop-blur-xl z-50">
        <button onClick={() => navigate(-1)} className="material-symbols-outlined text-white/90 font-bold">
          arrow_back
        </button>
        <h1 className="flex-1 text-center font-bold text-xl tracking-tight">Checkout</h1>
      </div>

      <div className="max-w-xl mx-auto px-6 py-4 space-y-10">
        {/* Order Summary */}
        <section>
          <div className="flex justify-between items-end mb-5">
            <h2 className="font-bold text-xl tracking-tight">Order Summary</h2>
            <span className="text-primary text-sm font-bold">{cart.length} Items</span>
          </div>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="bg-[#111812] rounded-[1.5rem] p-5 flex gap-4 items-center border border-white/5">
                <div className="size-20 bg-black rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="size-full object-cover opacity-90" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-0.5">{item.name}</h3>
                  <div className="flex items-center gap-1.5 text-primary">
                    <span className="material-symbols-outlined text-sm font-bold">sync</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {item.category === 'Box' ? 'Monthly Subscription' : 'One-time purchase'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg block">${item.price.toFixed(2)}</span>
                  {item.category === 'Box' && (
                    <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">PER MONTH</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Date */}
        <section>
          <h2 className="font-bold text-xl tracking-tight mb-5">Delivery Date</h2>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {dates.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={`flex-shrink-0 w-[4.5rem] h-[5.5rem] rounded-[1.25rem] flex flex-col items-center justify-center gap-1 transition-all border-2 ${
                  selectedDate === d.date
                    ? 'bg-primary text-luxury-dark border-primary shadow-[0_8px_25px_rgba(19,236,91,0.25)]'
                    : 'bg-[#111812] border-white/5 text-white/40'
                }`}
              >
                <span className="text-[9px] font-bold uppercase tracking-widest">{d.day}</span>
                <span className="text-2xl font-black">{d.date}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Payment Method - Matching Pic 2 Exactly */}
        <section>
          <h2 className="font-bold text-xl tracking-tight mb-5">Payment Method</h2>
          <div className="space-y-3">
            {paymentOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                className={`w-full flex items-center gap-4 py-4 px-5 rounded-[1.25rem] border-2 transition-all ${
                  paymentMethod === opt.id
                    ? 'bg-[#111812] border-primary'
                    : 'bg-[#111812] border-white/5'
                }`}
              >
                <div className="flex items-center gap-3.5 flex-grow">
                  <span className="material-symbols-outlined text-white/40 text-[22px]">
                    {opt.icon}
                  </span>
                  <div className="flex items-center gap-2">
                    {opt.prefix && (
                      <span className="text-[10px] font-black uppercase text-white/40 tracking-tighter">
                        {opt.prefix}
                      </span>
                    )}
                    <span className={`font-bold text-[15px] tracking-tight ${paymentMethod === opt.id ? 'text-white' : 'text-white/80'}`}>
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

        {/* Eco-friendly info box - CLEANED UP to match Pic 2 */}
        <div className="bg-[#0e1810] border border-primary/10 rounded-[1.5rem] p-6 flex gap-4">
          <div className="size-11 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-primary text-3xl">eco</span>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white text-[17px]">Eco-friendly packaging</h4>
            <p className="text-xs text-white/40 leading-relaxed">Your order is packed in 100% compostable and infinitely recyclable materials.</p>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#060b07]/95 backdrop-blur-xl border-t border-white/5 px-6 pt-6 pb-8 z-50">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-end mb-6">
            <div className="space-y-0.5">
              <span className="text-[10px] text-white/40 uppercase font-black tracking-widest block mb-1">TOTAL AMOUNT</span>
              <span className="text-[2.5rem] font-black leading-none">${total.toFixed(2)}</span>
            </div>
            <button className="text-primary font-bold text-sm hover:underline mb-1 transition-all">View breakdown</button>
          </div>
          <button
            onClick={handleConfirm}
            disabled={isProcessing || cart.length === 0 || showToast}
            className={`w-full py-5 rounded-[1.5rem] font-bold text-lg flex items-center justify-center transition-all ${
              isProcessing 
              ? 'bg-primary/20 text-luxury-dark/40 cursor-wait' 
              : showToast ? 'bg-primary/50 text-luxury-dark/50' : 'bg-primary text-luxury-dark hover:scale-[1.01] active:scale-[0.98] shadow-[0_15px_40px_rgba(19,236,91,0.15)]'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Processing Order...
              </div>
            ) : showToast ? 'Redirecting...' : 'Confirm Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;