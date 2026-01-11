import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '../types';

const Home: React.FC = () => {
  const heroImg1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuB7QbElXl9grVXzq_Nr5UgIDyhq7yO0G3Bc-h98fUcfro6duE67CSVk4KXjzSoxGjjh7Nb9-F0zimXYBhJkWeAl9FVyzU0kUlTguee8VTm2XGQuh-Me7JkGu-pdCLDkfuJqEbjAwiXCnUPy-G6WOQ3eGgakXF5uTAQ-XNkQzxnhWMIqBfr8V0uF1ZBeehnBubElgTL1ehLc5Y79zXpiBDYMOvsk7ogoq2ZSDgLZ2tGtBzK1q5JZI-g40Izhtl8TL2gu2fSKE2M0qibl";
  const heroImg2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuD6YMttjNVIr4cSuHjZc_dkzs553TLZpvANwUgG5ZU0hhPEsgEFJ9fznookAcZ5-YKZkxC5EzJVABvh4ojVVFffPqdT7l5gksxn_VfYJo0c82F2NZyU1zYGAkiMNr8x9pSWZzXq1KXlwaGdbJjFAwqmxpRr0B2SJ9rjY0_OMllHisERCn2Dzd86WIFLMt4H7gGlDvU0y6z1POSEkGcqeX83ow7UdvSiL5jILfel7zpB2_8nhTbI0XhdMViC-cMlF1C2cGvMTfuGJ1Ub";

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div className="max-w-[1440px] mx-auto lg:px-6 py-4 md:py-8 lg:py-12">
          <div className="relative w-full aspect-[4/5] md:aspect-[21/9] lg:rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 flex flex-col md:flex-row">
              <div 
                className="w-full h-1/2 md:h-full md:w-1/2 bg-cover bg-center relative" 
                style={{ backgroundImage: `url('${heroImg1}')` }}
              >
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div 
                className="w-full h-1/2 md:h-full md:w-1/2 bg-cover bg-center relative" 
                style={{ backgroundImage: `url('${heroImg2}')` }}
              >
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/40 to-transparent flex flex-col justify-end p-8 md:p-16 lg:p-24">
              <div className="max-w-2xl">
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-white">
                  Pure Indulgence,<br/><span className="text-primary italic">Naturally Crafted</span>
                </h1>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={RoutePath.Signup} className="px-10 py-5 bg-primary text-luxury-dark font-bold rounded-2xl text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    Get Started
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                  <Link to={RoutePath.Shop} className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center">
                    Build Your Box
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">Our Philosophy</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-white">From Earth to Soul,<br/>Hand-Delivered.</h2>
            </div>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              Founded on the principles of purity and craft. We source single-origin organic cacao and farm-fresh botanicals to create an experience that nourishes both the body and the spirit. Every delivery is a promise of uncompromising quality and seasonal delight.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-accent-dark/40 border border-white/5 flex flex-col gap-4">
                <span className="material-symbols-outlined text-primary text-4xl">potted_plant</span>
                <h3 className="font-bold text-xl text-white">100% Organic</h3>
                <p className="text-white/50 text-sm">Certified organic ingredients sourced directly from sustainable farms.</p>
              </div>
              <div className="p-8 rounded-3xl bg-accent-dark/40 border border-white/5 flex flex-col gap-4">
                <span className="material-symbols-outlined text-primary text-4xl">local_shipping</span>
                <h3 className="font-bold text-xl text-white">Eco Delivery</h3>
                <p className="text-white/50 text-sm">Carbon-neutral shipping in fully compostable packaging.</p>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-[3rem] overflow-hidden">
              <img alt="Product" className="w-full h-full object-cover" src={heroImg1}/>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-primary p-8 rounded-[2rem] text-luxury-dark max-w-[240px]">
              <span className="text-4xl font-black block mb-2">50k+</span>
              <p className="text-sm font-bold leading-tight">Artisanal boxes delivered to wellness seekers worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Collection Section */}
      <section className="py-24 bg-accent-dark/20 overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto flex justify-between items-end mb-12">
          <div>
            <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">Selected</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-white">The Collection</h2>
          </div>
          <Link to={RoutePath.Shop} className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
            View All <span className="material-symbols-outlined">trending_flat</span>
          </Link>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar gap-8 px-6 pb-4 max-w-[1440px] mx-auto">
          <div className="flex-none w-[280px] md:w-[360px] group">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative">
              <img alt="Dark Truffles" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4yK2QDx4e_enqo63FvlsKX0tctt-EeykWtzu6rF6ASGXmaUnMpfS2Tvb2xHstpN07nFQjkmFytOaWpBRf_-By258pORw2tyeTlD9qBsH-mJRcvJM_BOjLlf2hlmQKH9mbSrRiG_pMjMhrAPv_Ps2jh-S9G-5jOqtenohEAcniQnOBWnZUtmPlOKxnLI45xXeKI2_tILa0rnYqDvAfTwsvABIk9CVOSI10L6rvoLRbdtNwwhdO-J611sMbBiXEebF0hZynawF4nISg"/>
              <div className="absolute top-4 right-4 size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">favorite</span>
              </div>
            </div>
            <div className="flex justify-between items-start px-2">
              <div>
                <h4 className="font-bold text-2xl mb-1 text-white">75% Dark Truffles</h4>
                <p className="text-white/50">Organic Ecuadorian Cacao</p>
              </div>
              <span className="text-primary font-bold text-xl">$24.00</span>
            </div>
          </div>
          <div className="flex-none w-[280px] md:w-[360px] group">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative">
              <img alt="Green Juice" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDxrMvrHkA1pABX1Ti2jbRyOUDpVto4E6f02i8JxdKo4xJxZYj9H3TRiFjlwhQsZlE_4vW6p83no63YjAkzi8NYFyNpge_pLfaZ7_3R59lOrX83TWrGgPytSaLYIAkNkdmVVD_2-I3IRzdcy0-b_5q1dVRyt3cdN8tqsivYxnBIiNoBjPmPpPEUs51cSAR24vhOpwtlI5FcxZovncRhSlJqGeDGjZncNzVlNkVdUhN2zn2brz0T3zxYAaA5ImcbJ4kSnPW_kXVGOnN"/>
              <div className="absolute top-4 right-4 size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">favorite</span>
              </div>
            </div>
            <div className="flex justify-between items-start px-2">
              <div>
                <h4 className="font-bold text-2xl mb-1 text-white">Vitality Green</h4>
                <p className="text-white/50">Cold-Pressed Superfoods</p>
              </div>
              <span className="text-primary font-bold text-xl">$9.00</span>
            </div>
          </div>
          <div className="flex-none w-[280px] md:w-[360px] group">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative">
              <img alt="Artisan Box" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={heroImg1}/>
              <div className="absolute top-4 right-4 size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">favorite</span>
              </div>
            </div>
            <div className="flex justify-between items-start px-2">
              <div>
                <h4 className="font-bold text-2xl mb-1 text-white">Master Box</h4>
                <p className="text-white/50">Seasonal Curated Selection</p>
              </div>
              <span className="text-primary font-bold text-xl">$45.00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans & Pricing Section */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">Plans & Pricing</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-white">Elevate Your Lifestyle</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-10 rounded-[2.5rem] bg-accent-dark/30 border border-white/10 hover:border-white/20 transition-all flex flex-col h-full">
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-2 text-white">Essential</h3>
              <p className="text-white/50">Perfect for daily wellness</p>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-white">$49</span>
              <span className="text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-5 mb-12 flex-grow">
              <li className="flex items-center gap-3 text-white/80">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                2 Juices & 1 Chocolate Bar
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                Standard Eco-Shipping
              </li>
            </ul>
            <Link to={RoutePath.Shop} className="w-full py-5 rounded-2xl border border-white/20 font-bold hover:bg-white hover:text-luxury-dark transition-all text-center text-white">
              Select Plan
            </Link>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-accent-dark border-2 border-primary relative overflow-hidden shadow-[0_20px_50px_rgba(19,236,91,0.1)] flex flex-col h-full scale-105 z-10">
            <div className="absolute top-0 right-0 bg-primary text-luxury-dark px-6 py-2 text-xs font-black uppercase tracking-widest rounded-bl-2xl">Recommended</div>
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-2 text-white">Premium</h3>
              <p className="text-white/50">Our most popular experience</p>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-primary">$89</span>
              <span className="text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-5 mb-12 flex-grow">
              <li className="flex items-center gap-3 text-white/80 font-semibold">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                5 Juices & 2 Selection Boxes
              </li>
              <li className="flex items-center gap-3 text-white/80 font-semibold">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                Priority Express Shipping
              </li>
              <li className="flex items-center gap-3 text-white/80 font-semibold">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                Exclusive Seasonal Access
              </li>
            </ul>
            <Link to={RoutePath.Shop} className="w-full py-5 rounded-2xl bg-primary text-luxury-dark font-black hover:brightness-110 transition-all shadow-lg shadow-primary/20 text-center">
              Get Started
            </Link>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-accent-dark/30 border border-white/10 hover:border-white/20 transition-all flex flex-col h-full md:col-span-2 lg:col-span-1">
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-2 text-white">Collector</h3>
              <p className="text-white/50">The ultimate luxury curation</p>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-white">$159</span>
              <span className="text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-5 mb-12 flex-grow">
              <li className="flex items-center gap-3 text-white/80">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                Daily Juices & Unlimited Craft
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                Personal Concierge Support
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                Invite to Tasting Events
              </li>
            </ul>
            <Link to={RoutePath.Shop} className="w-full py-5 rounded-2xl border border-white/20 font-bold hover:bg-white hover:text-luxury-dark transition-all text-center text-white">
              Select Plan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;