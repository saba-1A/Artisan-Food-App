import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Leaf, Droplets, Sun, X, Download, MapPin, TreeDeciduous, Users } from 'lucide-react';

// --- SHARED UI COMPONENTS ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.04] mix-blend-overlay">
    <div className="absolute inset-0 bg-repeat w-full h-full" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
  </div>
);

const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative overflow-hidden px-8 py-4 rounded-full bg-[#E8E6D9] text-[#1A1A1A] font-sans font-bold tracking-wide transition-colors ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
        {children} <ArrowRight className="w-4 h-4" />
      </span>
      <div className="absolute inset-0 bg-[#D4C5A5] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
    </motion.button>
  );
};

// --- NEW COMPONENT: IMPACT REPORT MODAL ---

const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const node = nodeRef.current;
    const controls = { value: from };
    
    // Simple custom animation loop for the number
    const duration = 2000; // 2 seconds
    const start = performance.now();

    const animate = (time: number) => {
      const timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        if (node) node.textContent = to.toLocaleString();
        return;
      }
      
      const progress = 1 - Math.pow(1 - timeFraction, 3); // Ease out cubic
      const current = Math.floor(from + (to - from) * progress);
      
      if (node) node.textContent = current.toLocaleString();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, from, to]);

  return <span ref={nodeRef} />;
};

const ImpactReport: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F0F0F]/90 backdrop-blur-sm z-[90]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[90vh] bg-[#141414] z-[100] rounded-t-[2rem] overflow-hidden border-t border-[#D4C5A5]/20 shadow-2xl"
          >
            {/* Header Sticky */}
            <div className="sticky top-0 z-20 flex justify-between items-center p-8 bg-[#141414]/80 backdrop-blur-md border-b border-white/5">
              <div>
                <span className="text-[#D4C5A5] font-sans text-xs uppercase tracking-[0.3em]">Annual Report</span>
                <h2 className="text-[#E8E6D9] font-serif text-2xl">2024 Impact Overview</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 rounded-full border border-white/10 text-[#E8E6D9] hover:bg-white/5 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="h-full overflow-y-auto pb-32">
              <div className="max-w-5xl mx-auto px-6 pt-12">
                
                {/* 1. Hero Metrics */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                  {[
                    { label: "Trees Planted", val: 14203, icon: <TreeDeciduous className="w-5 h-5"/> },
                    { label: "Acres Restored", val: 850, icon: <MapPin className="w-5 h-5"/> },
                    { label: "Local Jobs Created", val: 124, icon: <Users className="w-5 h-5"/> },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5 text-center">
                      <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#2A3C24]/30 text-[#D4C5A5] mb-4">
                        {stat.icon}
                      </div>
                      <div className="text-5xl md:text-6xl font-serif text-[#E8E6D9] mb-2">
                        <AnimatedCounter from={0} to={stat.val} />
                      </div>
                      <p className="text-white/40 uppercase tracking-widest text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* 2. The Allocation Visualizer */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                  <div>
                    <h3 className="text-4xl font-serif text-[#E8E6D9] mb-6">Transparency in Action</h3>
                    <p className="text-[#E8E6D9]/60 font-light text-lg mb-8 leading-relaxed">
                      We believe you deserve to know exactly where your contribution goes. Not into administrative bloat, but directly into the soil.
                    </p>
                    <div className="space-y-6">
                      {[
                        { label: "Seedling Propagation", pct: "45%" },
                        { label: "Irrigation Infrastructure", pct: "30%" },
                        { label: "Community Wages", pct: "20%" },
                        { label: "Impact Monitoring", pct: "5%" },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm uppercase tracking-wider text-[#D4C5A5] mb-2">
                            <span>{item.label}</span>
                            <span>{item.pct}</span>
                          </div>
                          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: item.pct }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-[#D4C5A5]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
  <div className="relative aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 group">
    <img 
      src="https://img.freepik.com/premium-photo/agriculture-soil-hands-farmers-land-closes-hands-peat-mud-farmer-garden-nature-fertile-soil-ecology_697211-1686.jpg" 
      alt="Hands planting in soil" 
      className="object-cover w-full h-full scale-100 group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent opacity-80" />
    <div className="absolute bottom-8 left-8">
       <p className="text-[#D4C5A5] font-serif italic text-2xl">"Luxury rooted in responsibility."</p>
    </div>
  </div>
</div>

                {/* 3. Footer / Download */}
                <div className="bg-[#1A1A1A] p-12 rounded-2xl border border-[#D4C5A5]/20 text-center relative overflow-hidden">
                  <div className="relative z-10">
                     <h3 className="text-3xl font-serif text-[#E8E6D9] mb-4">Read the Full Ledger</h3>
                     <p className="text-white/50 mb-8 max-w-lg mx-auto">
                       Download our verified carbon offset certificates and detailed artisan payment records.
                     </p>
                     <button className="inline-flex items-center gap-3 px-8 py-3 bg-[#D4C5A5] text-[#0F0F0F] font-bold rounded-full hover:bg-white transition-colors">
                        <Download className="w-4 h-4" /> Download PDF (4.2MB)
                     </button>
                  </div>
                  {/* Decorative Background Blur */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#2A3C24] blur-[100px] opacity-30" />
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- MAIN PAGE COMPONENT ---

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // State for the Report Modal
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  // Parallax effects
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0F0F0F] text-[#E8E6D9] overflow-hidden selection:bg-[#D4C5A5] selection:text-[#0F0F0F]">
      <NoiseOverlay />
      
      {/* Insert the Impact Report Component */}
      <ImpactReport isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />

      {/* Ambient Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#2A3C24] rounded-full blur-[120px] opacity-20" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#5C4033] rounded-full blur-[100px] opacity-20" />

      {/* --- HERO SECTION (Unchanged) --- */}
      <section className="relative pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div style={{ y: yText }} className="lg:col-span-7 order-2 lg:order-1 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="h-[1px] w-12 bg-[#D4C5A5]/50"></span>
              <span className="text-[#D4C5A5] font-sans font-medium text-xs uppercase tracking-[0.4em]">The Philosophy</span>
            </motion.div>

            <h1 className="font-serif text-6xl md:text-8xl xl:text-9xl font-medium leading-[0.9] tracking-tight mb-12">
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="block">
                  Crafted by
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="block text-[#D4C5A5] italic font-light">
                  Sun & Soil
                </motion.span>
              </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-12 md:gap-20">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} className="max-w-md space-y-6 text-lg font-light text-[#E8E6D9]/70 leading-relaxed">
                <p>Our journey began in the volcanic soils of the High Andes, identifying that true luxury is harvested, not manufactured.</p>
                <p className="text-sm border-l border-[#D4C5A5]/30 pl-6 text-[#E8E6D9]/50">Every product represents a commitment to 100% organic, regenerative farming, honoring the earth's natural rhythms.</p>
              </motion.div>
              <div className="flex flex-col gap-8 justify-end">
                {[ { val: '240+', label: 'Artisan Farms' }, { val: '100%', label: 'Sustainable' } ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}>
                    <span className="block text-4xl font-serif text-[#D4C5A5]">{stat.val}</span>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="lg:col-span-5 order-1 lg:order-2 relative">
            <motion.div style={{ y: yImage }} className="relative aspect-[3/4] rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent z-10 opacity-60" />
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" alt="Artisan Farm" className="w-full h-full object-cover scale-110" />
            </motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -bottom-12 -left-12 z-20 hidden md:flex items-center justify-center size-40 bg-[#D4C5A5] rounded-full">
              <svg className="w-full h-full p-2 text-[#0F0F0F]" viewBox="0 0 100 100">
                <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="text-[11px] font-bold uppercase tracking-[0.15em]">
                  <textPath href="#curve">From Soil to Soul • From Soil to Soul •</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-[#0F0F0F]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION (Unchanged) --- */}
      <section className="py-40 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-[#E8E6D9]/10 pb-10">
            <div>
              <span className="text-[#D4C5A5] font-sans font-bold text-xs uppercase tracking-[0.4em]">The Methodology</span>
              <h2 className="font-serif text-5xl md:text-6xl mt-6">The Artisan Way</h2>
            </div>
            <p className="max-w-xs text-right text-[#E8E6D9]/50 mt-8 md:mt-0 font-light">We don't optimize for speed. <br/> We optimize for vitality.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[ { icon: <Leaf className="w-6 h-6"/>, title: 'Regenerative Sourcing', desc: 'Partnering with small-scale farmers who treat the soil as a living legacy.' }, { icon: <Droplets className="w-6 h-6"/>, title: 'Cryo-Pressing', desc: 'Extracted at exactly 4°C to preserve cellular integrity and live enzymes.' }, { icon: <Sun className="w-6 h-6"/>, title: 'Master Fermentation', desc: 'A proprietary 72-hour process unlocking deep, complex flavor profiles.' } ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="group p-10 bg-[#1A1A1A] border border-[#E8E6D9]/5 hover:border-[#D4C5A5]/30 transition-all duration-500 rounded-xl">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-4 bg-[#252525] rounded-full text-[#D4C5A5] group-hover:bg-[#D4C5A5] group-hover:text-[#1A1A1A] transition-colors duration-500">{p.icon}</div>
                  <span className="text-4xl font-serif text-[#E8E6D9]/10 font-black">0{i + 1}</span>
                </div>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-[#D4C5A5] transition-colors">{p.title}</h3>
                <p className="text-[#E8E6D9]/50 leading-relaxed font-light">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- IMPACT SECTION (Updated with State Trigger) --- */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2500&auto=format&fit=crop" alt="Amazon Basin" className="w-full h-full object-cover opacity-20 grayscale brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <h2 className="font-serif text-5xl md:text-7xl mb-8">Indulgence with <span className="text-[#D4C5A5] italic">Intent</span></h2>
            <p className="text-xl md:text-2xl font-light text-[#E8E6D9]/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              1% of every subscription goes directly to soil reforestation projects in the Amazon Basin.
            </p>
            <div className="flex justify-center">
              {/* Trigger the Modal */}
              <MagneticButton onClick={() => setIsReportOpen(true)}>
                View Impact Report
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;