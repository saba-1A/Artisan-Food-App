import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-primary font-bold text-sm uppercase tracking-[0.5em]">The Philosophy</span>
            <h1 className="font-serif text-6xl md:text-8xl font-black mt-6 mb-10 leading-[0.9] tracking-tighter">
              Crafted by <br/><span className="italic text-primary">Sun & Soil</span>
            </h1>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Our journey began in the volcanic soils of the High Andes, where we discovered that true luxury isn't found in a laboratory—it's harvested.
              </p>
              <p className="text-white/40">
                We believe that by honoring the earth's natural rhythms, we unlock flavors that nourish both the body and the spirit. Every product in your box represents a commitment to 100% organic, regenerative farming.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-16 border-t border-white/10 pt-16">
              {[
                { val: '240+', label: 'Artisan Farms' },
                { val: '100%', label: 'Sustainable' },
                { val: '72h', label: 'Fermentation' }
              ].map((stat, i) => (
                <div key={i}>
                  <span className="block text-3xl font-black text-primary mb-1">{stat.val}</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
                alt="Artisan Farm" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 size-48 bg-primary rounded-[3rem] rotate-12 flex items-center justify-center p-8 text-luxury-dark text-center font-serif italic text-xl font-bold border-8 border-luxury-dark">
              From Soil to Soul
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="bg-accent-dark/20 py-32 border-y border-white/5">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="max-w-xl mb-20">
            <span className="text-primary font-bold text-sm uppercase tracking-[0.5em]">The Journey</span>
            <h2 className="font-serif text-5xl font-bold mt-4">The Artisan Way</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { 
                step: '01', 
                title: 'Regenerative Sourcing', 
                desc: 'We partner with small-scale farmers who treat the soil as a living legacy, never using synthetic pesticides.' 
              },
              { 
                step: '02', 
                title: 'Cryo-Pressing', 
                desc: 'Our juices are extracted at exactly 4°C to preserve cellular integrity and live enzymes for maximum vitality.' 
              },
              { 
                step: '03', 
                title: 'Master Fermentation', 
                desc: 'Our cacao beans undergo a proprietary 72-hour fermentation process to unlock deep, complex flavor profiles.' 
              }
            ].map((p, i) => (
              <div key={i} className="group relative">
                <span className="text-8xl font-black text-white/5 absolute -top-12 -left-4 group-hover:text-primary/10 transition-colors">{p.step}</span>
                <h3 className="text-2xl font-bold mb-4 relative z-10">{p.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed relative z-10">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="px-6 py-32 max-w-7xl mx-auto text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-serif text-4xl md:text-6xl font-black">Indulgence with <span className="text-primary italic">Intent</span></h2>
          <p className="text-white/50 text-lg">
            1% of every subscription goes directly to soil reforestation projects in the Amazon Basin. We don't just take from nature; we give back.
          </p>
          <div className="pt-10">
            <button className="px-12 py-5 bg-white text-luxury-dark font-black rounded-2xl hover:bg-primary transition-all active:scale-95">
              Read Our Impact Report
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;