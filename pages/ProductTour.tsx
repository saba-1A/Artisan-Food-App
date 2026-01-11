import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductTourProps {
  onAddToCart?: (product: Product) => void;
}

const ProductTour: React.FC<ProductTourProps> = ({ onAddToCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<35 | 45 | 55>(45);
  const [addedId, setAddedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Show all products in the tour now that category selection is removed
  const tourProducts = PRODUCTS;

  // Comprehensive theme mapping for every product
  const themes = useMemo(() => ({
    'Valencia Orange Sunrise': { text: 'OR ANGE', gradient: 'radial-gradient(at center, #FF4F78 40%, #D92A54 72%)', accent: '#FF4F78' },
    'Green Orchard Press': { text: 'GR EEN', gradient: 'radial-gradient(at center, #31D677 30%, #259B57 72%)', accent: '#31D677' },
    'Tropical Dragonfruit Press': { text: 'PI NK', gradient: 'radial-gradient(at center, #FFA94D 40%, #FF7E3D 72%)', accent: '#FFA94D' },
    'Master Belgian Truffles': { text: 'DA RK', gradient: 'radial-gradient(at center, #3d1c02 30%, #1a0c01 72%)', accent: '#3d1c02' },
    'Ruby Berry Pralines': { text: 'RU BY', gradient: 'radial-gradient(at center, #e11d48 30%, #4c0519 72%)', accent: '#fb7185' },
    'Hazelnut Belgian Velvet': { text: 'HA ZEL', gradient: 'radial-gradient(at center, #92400e 30%, #451a03 72%)', accent: '#f59e0b' },
    'The Connoisseur Selection': { text: 'CO NNO', gradient: 'radial-gradient(at center, #1e293b 30%, #0f172a 72%)', accent: '#38bdf8' },
    'Signature Gift Box': { text: 'SI GNA', gradient: 'radial-gradient(at center, #064e3b 30%, #022c22 72%)', accent: '#10b981' }
  }), []);

  // Intersection Observer for scroll snapping updates
  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current,
      threshold: 0.6,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('.tour-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [tourProducts]);

  const activeProduct = tourProducts[activeIndex] || tourProducts[0];
  const activeTheme = themes[activeProduct.name as keyof typeof themes] || themes['Green Orchard Press'];

  // Refined scaling logic: 35 is 0.45, 45 is slightly bigger, 55 is just a bit bigger than 45.
  const bottleScale = useMemo(() => {
    if (selectedSize === 35) return 0.45; // Smallest (User choice)
    if (selectedSize === 45) return 0.55; // Slightly larger
    if (selectedSize === 55) return 0.65; // Moderate largest
    return 0.55;
  }, [selectedSize]);

  const getUnit = () => {
    if (activeProduct.category === 'Juice') return 'ml';
    if (activeProduct.category === 'Chocolate') return 'g';
    return 'pc';
  };

  const handleAdd = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 2000);
    }
  };

  const displayCategory = activeProduct.category === 'Box' ? 'ARTISAN BOX' : activeProduct.category.toUpperCase();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-luxury-dark">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out -z-10"
        style={{ background: activeTheme.gradient }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none overflow-hidden">
          <h1 className="font-serif text-[40vw] font-black tracking-tighter text-white leading-none whitespace-nowrap animate-pulse transition-all duration-1000">
            {activeTheme.text}
          </h1>
        </div>
      </div>

      {/* MAIN OVERLAY: Expanded Left/Right Layout */}
      <div className="fixed top-48 left-0 right-0 z-50 pointer-events-none">
        <div className="w-full px-8 md:px-20 lg:px-40 flex flex-col md:flex-row justify-between items-start gap-16">
          
          {/* Left Side: Product Story */}
          <div className="pointer-events-auto bg-black/40 backdrop-blur-3xl p-10 md:p-12 rounded-[3.5rem] border border-white/10 max-w-md animate-in fade-in slide-in-from-left-8 shadow-2xl relative">
             <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] block mb-4 relative z-10">Artisan Batch {activeIndex + 1}</span>
             
             {/* Small cleaner label inside card */}
             <div className="flex items-center mb-2 z-10 relative">
                <span className="text-xs font-black text-white/40 uppercase tracking-[0.6em] border-b border-white/10 pb-1">
                  {displayCategory}
                </span>
             </div>

             <h2 className="text-4xl md:text-5xl font-serif font-black mb-6 leading-tight text-white relative z-10">{activeProduct.name}</h2>
             
             <p className="text-white/50 text-sm leading-relaxed mb-8">{activeProduct.description}</p>
             
             <div className="flex justify-between items-center pt-8 border-t border-white/5 gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-black block mb-1">Market Value</span>
                  <span className="text-4xl font-black text-white">${activeProduct.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => handleAdd(activeProduct)}
                  className={`flex-grow py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${addedId === activeProduct.id ? 'bg-white text-luxury-dark' : 'bg-primary text-luxury-dark hover:scale-105 active:scale-95 shadow-lg shadow-primary/20'}`}
                >
                   <span className="material-symbols-outlined">{addedId === activeProduct.id ? 'check' : 'shopping_bag'}</span>
                   {addedId === activeProduct.id ? 'Added' : 'Add to Box'}
                </button>
             </div>
          </div>

          {/* Right Side: Control Cluster */}
          <div className="pointer-events-auto flex flex-col gap-10 items-end">
             
             {/* Magnitude Selection - Individual Circles */}
             <div className="flex flex-col gap-3.5 items-end animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
                <span className="text-[10px] uppercase font-black text-white/30 tracking-[0.4em] text-right pr-1">Selection Magnitude</span>
                <div className="flex gap-4">
                  {[35, 45, 55].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size as any)}
                      className={`size-16 rounded-full flex flex-col items-center justify-center border transition-all ${
                        selectedSize === size 
                          ? 'bg-white text-luxury-dark border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-110' 
                          : 'bg-black/40 border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <span className="text-lg font-black leading-none">{size}</span>
                      <span className="text-[8px] uppercase font-black tracking-widest mt-0.5">{getUnit()}</span>
                    </button>
                  ))}
                </div>
             </div>

          </div>
        </div>
      </div>

      {/* THE SCROLLABLE CONTENT: CENTRAL STAGE */}
      <div 
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar relative z-0"
      >
        {tourProducts.map((p, index) => (
          <section 
            key={p.id}
            data-index={index}
            className="tour-section relative h-screen w-full flex items-center justify-center snap-start"
          >
            <div 
              className="relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `scale(${activeIndex === index ? bottleScale : 0.35})` }}
            >
              {/* Vertical Title Background Text - Strictly positioned in the gap between card and product */}
              {/* Shifted "lil more right" by reducing the negative offset from the previous values */}
              <div className={`absolute -left-[27rem] md:-left-[29rem] lg:-left-[24rem] top-1/2 -translate-y-1/2 rotate-90 w-[80vh] flex items-center justify-center transition-all duration-1000 -z-20 ${activeIndex === index ? 'opacity-15 translate-x-0' : 'opacity-0 -translate-x-32'}`}>
                <span className={`font-black text-white/80 tracking-tighter whitespace-nowrap uppercase select-none pointer-events-none leading-none ${p.category === 'Box' || p.category === 'Chocolate' ? 'text-[10rem] md:text-[12rem]' : 'text-[12rem] md:text-[15rem]'}`}>
                   {p.category === 'Box' ? 'ARTISAN BOX' : p.category}
                </span>
              </div>
              {/* Dynamic Pulse Aura */}
              <div 
                className={`absolute inset-0 blur-[150px] rounded-full scale-150 transition-opacity duration-1000 ${activeIndex === index ? 'opacity-40' : 'opacity-0'}`}
                style={{ background: activeTheme.accent }}
              ></div>

              <img 
                src={p.image} 
                alt={p.name} 
                className={`w-[280px] md:w-[480px] aspect-[4/6] object-cover rounded-[6rem] shadow-[0_80px_160px_rgba(0,0,0,0.8)] border border-white/20 transition-all duration-700 relative z-10 ${activeIndex === index ? 'rotate-0 opacity-100' : 'rotate-3 opacity-20 blur-lg'}`}
              />
            </div>
          </section>
        ))}
      </div>

      {/* BOTTOM FOOTER NAVIGATION: Cleaned up Navigation */}
      <div className="fixed bottom-12 left-0 right-0 z-50 pointer-events-none">
        <div className="w-full px-8 md:px-20 lg:px-40 flex justify-start items-end">
          <div className="pointer-events-auto bg-black/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/5">
             <div className="flex gap-2 mb-4">
               {tourProducts.map((_, i) => (
                 <div 
                   key={i} 
                   className={`h-2 transition-all duration-500 rounded-full ${activeIndex === i ? 'w-20 bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)]' : 'w-4 bg-white/10'}`}
                 />
               ))}
             </div>
             <span className="text-[11px] uppercase font-black tracking-[0.5em] text-white/40 block">
               Exploring {activeIndex + 1} of {tourProducts.length}
             </span>
          </div>
        </div>
      </div>

      {/* Master Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/5 z-[100]">
         <div 
           className="h-full bg-primary transition-all duration-700 shadow-[0_0_25px_rgba(19,236,91,0.6)]"
           style={{ width: `${((activeIndex + 1) / tourProducts.length) * 100}%` }}
         ></div>
      </div>
    </div>
  );
};

export default ProductTour;