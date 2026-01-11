import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../types';

const Subscription: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: string, price: number) => {
    navigate(RoutePath.SubscriptionCheckout, { state: { plan, price } });
  };

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto min-h-screen relative text-white">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">Subscribe</span>
        <h1 className="font-serif text-5xl md:text-7xl font-black mt-4 mb-6 tracking-tighter">Elevate Your Lifestyle</h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          Choose a frequency that fits your wellness goals. Each plan is flexible, sustainable, and curated for the senses.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Essential Plan */}
        <div className="p-10 rounded-[2.5rem] bg-accent-dark/30 border border-white/10 hover:border-white/20 transition-all flex flex-col h-full group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Essential</h3>
            <p className="text-white/50">Perfect for daily wellness</p>
          </div>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-black text-white">$49</span>
            <span className="text-white/40 font-medium">/mo</span>
          </div>
          <ul className="space-y-5 mb-12 flex-grow">
            {[
              "2 Juices & 1 Chocolate Bar",
              "Standard Eco-Shipping",
              "Cancel or Skip Anytime",
              "Access to Daily Journaling App"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => handleSelectPlan('Essential', 49)}
            className="w-full py-5 rounded-2xl border border-white/20 font-bold hover:bg-white hover:text-luxury-dark transition-all active:scale-95 text-white"
          >
            Select Plan
          </button>
        </div>

        {/* Premium Plan (Recommended) */}
        <div className="p-10 rounded-[2.5rem] bg-accent-dark border-2 border-primary relative overflow-hidden shadow-[0_20px_50px_rgba(19,236,91,0.1)] flex flex-col h-full scale-105 z-10 transition-all animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="absolute top-0 right-0 bg-primary text-luxury-dark px-6 py-2 text-xs font-black uppercase tracking-widest rounded-bl-2xl">Recommended</div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <p className="text-white/50">Our most popular experience</p>
          </div>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-black text-primary">$89</span>
            <span className="text-white/40 font-medium">/mo</span>
          </div>
          <ul className="space-y-5 mb-12 flex-grow">
            {[
              "5 Juices & 2 Selection Boxes",
              "Priority Express Shipping",
              "Exclusive Seasonal Access",
              "Limited Edition Harvest Releases",
              "Complimentary Tasting Mat"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80 font-semibold">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => handleSelectPlan('Premium', 89)}
            className="w-full py-5 rounded-2xl bg-primary text-luxury-dark font-black hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Get Started
          </button>
        </div>

        {/* Collector Plan */}
        <div className="p-10 rounded-[2.5rem] bg-accent-dark/30 border border-white/10 hover:border-white/20 transition-all flex flex-col h-full md:col-span-2 lg:col-span-1 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Collector</h3>
            <p className="text-white/50">The ultimate luxury curation</p>
          </div>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-black text-white">$159</span>
            <span className="text-white/40 font-medium">/mo</span>
          </div>
          <ul className="space-y-5 mb-12 flex-grow">
            {[
              "Daily Juices & Unlimited Craft",
              "Personal Concierge Support",
              "Invite to Exclusive Tasting Events",
              "Hand-Painted Ceramic Box",
              "Custom Flavor Profiles"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => handleSelectPlan('Collector', 159)}
            className="w-full py-5 rounded-2xl border border-white/20 font-bold hover:bg-white hover:text-luxury-dark transition-all active:scale-95 text-white"
          >
            Select Plan
          </button>
        </div>
      </div>

      <div className="mt-32 max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h4 className="font-bold mb-2">Can I customize my box?</h4>
            <p className="text-white/50 text-sm">Yes! After subscribing, you can use our 'Build Your Box' portal to swap flavors and select specific seasonal favorites each month.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h4 className="font-bold mb-2">Is the packaging sustainable?</h4>
            <p className="text-white/50 text-sm">Every element of our packaging is compostable or infinitely recyclable, including the glass bottles and organic fiber box liners.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;