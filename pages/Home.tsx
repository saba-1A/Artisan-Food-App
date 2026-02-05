import React, { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform, Variants } from 'framer-motion';
import { RoutePath } from '../types';

// --- TYPES ---
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

interface CheckItemProps {
  text: string;
  delay: number;
}

// --- ICONS ---
const LeafIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="none" /> 
    <path d="M2 22C2 22 5 13 13 5C13 5 16 13 8 21" />
    <path d="M12 12L2 22" />
  </svg>
);

const DropIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2" /><path d="M12 21v2" />
    <path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" />
    <path d="M1 12h2" /><path d="M21 12h2" />
    <path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" />
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#E3D5CA]">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// --- HELPER COMPONENTS ---

// 1. Spotlight Card
const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-gray-900/50 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// 2. Trendy Button
const TrendyButton = ({ text, onClick, primary = false }: { text: string, onClick: () => void, primary?: boolean }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full py-4 rounded-xl overflow-hidden group border ${
        primary ? 'border-primary' : 'border-white/20'
      }`}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out ${
          primary ? 'bg-primary' : 'bg-white'
        }`}
      />
      <span className={`relative z-10 font-bold text-lg tracking-wider uppercase transition-colors duration-300 ${
        primary ? 'text-primary group-hover:text-black' : 'text-white group-hover:text-black'
      }`}>
        {text}
      </span>
    </motion.button>
  );
};

// 3. Check Item
const CheckItem: React.FC<CheckItemProps> = ({ text, delay }) => (
  <motion.li 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-start gap-3 text-gray-300"
  >
    <div className="mt-1 flex-shrink-0 text-primary">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <span className="text-sm font-medium tracking-wide">{text}</span>
  </motion.li>
);

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  }
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // --- NEW WORKING LINES ---
const heroImg1 = "/hero2.png"; // Dark Chocolate
const heroImg2 = "/hero1.png"; // Cacao Pods


  // Parallax Effect for Hero
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const handleSelectPlan = (plan: string, price: number) => {
    navigate(RoutePath.SubscriptionCheckout, { state: { plan, price } });
  };

  const handleNavigation = (path: string) => {
    // Navigate to the article page (ensure you have these routes defined in your App)
    navigate(path);
    window.scrollTo(0, 0);
  };

  // --- NEW ARRIVALS DATA ---
  const NEW_ARRIVALS = [
    { 
      imgBefore: "https://truffles.com/cdn/shop/files/Dark_Collection-770.jpg?crop=center&height=1200&v=1728587862&width=1200",
      imgAfter: "https://thumbs.dreamstime.com/b/exquisite-chocolate-truffles-delight-exquisite-chocolate-truffles-where-decadent-cocoa-delights-gourmet-chocolate-297603353.jpg", 
      title: "Master Belgian Truffles", 
      price: "$32.00" 
    },
    { 
      imgBefore: "https://static.freshtohome.com/media/catalog/product/cache/1/image/18ae109e34f485bd0b0c075abec96b2e/v/a/valencia_orange_800x533_copy.jpg", 
      imgAfter: "https://th.bing.com/th/id/R.53e501b0b67ebe7a405613751b3aed45?rik=jBBzwYTevKOyMA&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0434%2f5338%2f2808%2fproducts%2f137971-1-1.jpg%3fv%3d1635038707&ehk=6SfMagmI5oYjW0wuTxUFBasBbDUjaM1jyUI70UNXqNo%3d&risl=&pid=ImgRaw&r=0", 
      title: "Valencia Orange Sunrise", 
      price: "$12.00" 
    },
    { 
      imgBefore: "https://publish.purewow.net/wp-content/uploads/sites/2/2022/02/white-chocolate-recipes-sugar-cookie-truffles-recipe.jpeg?fit=680%2C860", 
      imgAfter: "https://tse2.mm.bing.net/th/id/OIP.FQF98yMYlOVYIGxwHGMNjAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3", 
      title: "Vanilla Chocolate", 
      price: "$26.00" 
    }
  ];

  // --- FEATURES DATA ---
  const FEATURES = [
    {
      id: "01",
      title: "Deliver with quality",
      desc: "Every product is crafted with care and attention to detail, ensuring the best for your customers.",
      icon: <LeafIcon />
    },
    {
      id: "02",
      title: "Cryo-Pressing",
      desc: "Extracted at exactly 4°C to preserve cellular integrity and live enzymes.",
      icon: <DropIcon />
    },
    {
      id: "03",
      title: "Curated for you",
      desc: "Every delivery is a promise of uncompromising quality and seasonal delight.",
      icon: <SunIcon />
    }
  ];

  // --- COLLECTIONS DATA ---
  const COLLECTIONS = [
    {
      id: 1,
      title: "Signature Gift Box",
      desc: "A curated assortment for the ultimate connoisseur.",
      img: "https://www.kroger.com/product/images/large/front/0073017007598",
    },
    {
      id: 2,
      title: "Tropical Dragonfruit Press",
      desc: "Refreshing, vibrant, and packed with antioxidants.",
      img: "https://www.eatingonadime.com/wp-content/uploads/2024/03/DragonFruitSmoothieLR-13.jpg",
    },
    {
      id: 3,
      title: "Vanilla Chocolate",
      desc: "Creamy white chocolate with a delicate finish.",
      img: "https://tse2.mm.bing.net/th/id/OIP.FQF98yMYlOVYIGxwHGMNjAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    },
    {
      id: 4,
      title: "Ruby Berry Pralines",
      desc: "Naturally pink ruby cocoa with a berry reduction center.",
      img: "https://www.funkypigeon.com/gallery/otherproducts/158507.jpg",
    }
  ];

  // --- TESTIMONIALS DATA (7 Items) ---
  const TESTIMONIALS = [
    {
      name: "Sophia Nguyen",
      role: "Wellness Advocate",
      text: "I’ve tried several subscription services, but this one stands out. The ingredients are pristine, and the chocolate is sinfully good without the guilt.",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Daniel Reed",
      role: "Michelin Chef",
      text: "As a chef, I value flavor complexity. The master fermentation process truly unlocks notes I haven't found in commercial brands. Exceptional.",
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sophia Laurent",
      role: "Interior Designer",
      text: "The packaging is just as exquisite as the product. It’s the perfect balance of style and substance. My clients love receiving these as gifts.",
      img: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    {
      name: "Marcus Lewis",
      role: "Fitness Coach",
      text: "Finally, a juice cleanse that doesn't taste like grass. The Cryo-Pressing really makes a difference in freshness. My recovery has never been better.",
      img: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Isabella Rossi",
      role: "Event Planner",
      text: "I needed something unique for a high-end corporate retreat. The custom curation was flawless and left a lasting impression on everyone.",
      img: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      name: "Ethan Carter",
      role: "Sommelier",
      text: "The nuance in the single-origin cacao is comparable to fine wine. A truly sophisticated palate experience that I highly recommend.",
      img: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: "Lucas Silva",
      role: "Food Critic",
      text: "A masterclass in texture and taste. The pralines melt perfectly, and the juices are vibrant. Five stars for consistency and quality.",
      img: "https://randomuser.me/api/portraits/men/54.jpg"
    }
  ];

  return (
    <main className="bg-[#050505] text-white overflow-hidden">
      
{/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-12 overflow-hidden min-h-[90vh] flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full aspect-[4/5] md:aspect-[21/9] lg:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group"
          >
            <div className="absolute inset-0 flex flex-col md:flex-row">
              <div className="w-full h-1/2 md:h-full md:w-1/2 relative overflow-hidden">
                <motion.div 
                  style={{ y: y1, backgroundImage: `url('${heroImg1}')` }}
                  className="absolute inset-0 bg-cover bg-center scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700"/>
              </div>
              <div className="w-full h-1/2 md:h-full md:w-1/2 relative overflow-hidden">
                <motion.div 
                  style={{ y: y2, backgroundImage: `url('${heroImg2}')` }}
                  className="absolute inset-0 bg-cover bg-center scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700"/>
              </div>
            </div>
            
            {/* UPDATED: Changed justify-end to justify-center to move text UP */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-center p-8 md:p-16 lg:p-24">
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={stagger} 
                className="max-w-2xl"
              >
                <motion.h1 
                  variants={fadeInUp} 
                  className="font-serif text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8 tracking-tighter text-white drop-shadow-lg"
                >
                  Pure Indulgence,<br/>
                  <span className="text-primary italic">Naturally Crafted</span>
                </motion.h1>
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                  <Link to={RoutePath.Signup} className="px-10 py-5 bg-primary text-luxury-dark font-bold rounded-2xl text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                    Get Started
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                  <Link to={RoutePath.Shop} className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center">
                    Build Your Box
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">Our Philosophy</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-white">From Earth to Soul,<br/>Hand-Delivered.</h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-white/70 text-lg leading-relaxed max-w-xl">
              Founded on the principles of purity and craft. We source single-origin organic cacao and farm-fresh botanicals to create an experience that nourishes both the body and the spirit. Every delivery is a promise of uncompromising quality and seasonal delight.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: 'potted_plant', title: '100% Organic', text: 'Certified organic ingredients sourced directly from sustainable farms.' },
                { icon: 'local_shipping', title: 'Eco Delivery', text: 'Carbon-neutral shipping in fully compostable packaging.' }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col gap-4 hover:bg-white/[0.06] transition-colors">
                  <span className="material-symbols-outlined text-primary text-4xl">{item.icon}</span>
                  <h3 className="font-bold text-xl text-white">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10">
              <img alt="Product" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" src={heroImg1}/>
            </div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="absolute -bottom-10 -left-10 bg-primary p-8 rounded-[2rem] text-luxury-dark max-w-[240px] shadow-2xl shadow-primary/20"
            >
              <span className="text-4xl font-black block mb-2">50k+</span>
              <p className="text-sm font-bold leading-tight">Artisanal boxes delivered to wellness seekers worldwide.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- NEW ARRIVALS --- */}
      <section className="py-24 bg-white/[0.02]">
        {/* Header */}
        <div className="px-6 max-w-[1440px] mx-auto flex justify-between items-end mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-white mb-2">New arrivals</h2>
            <span className="text-white/40 font-medium text-sm uppercase tracking-widest">Fresh Selections</span>
          </motion.div>
          
          {/* View All Button */}
          <Link 
            to={RoutePath.Shop} 
            className="px-6 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-black transition-colors"
          >
            View all products
          </Link>
        </div>
        
        {/* Grid Structure */}
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {NEW_ARRIVALS.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col gap-4"
              onClick={() => navigate(RoutePath.Shop)}
            >
              {/* Image Container with Hover Effect */}
              <div className="aspect-[4/3] bg-[#111] w-full overflow-hidden relative rounded-sm">
                {/* Before Image (Visible by default) */}
                <img 
                  src={item.imgBefore} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                />
                
                {/* After Image (Visible on hover) */}
                <img 
                  src={item.imgAfter} 
                  alt={`${item.title} detail`} 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 scale-105"
                />

                {/* 'Shop Now' style button (Bottom Right) */}
                 <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                   <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded uppercase tracking-wider shadow-lg">
                     Shop Now
                   </button>
                 </div>
              </div>

              {/* Text Info - Left Aligned */}
              <div className="flex flex-col items-start gap-1">
                <h3 className="font-medium text-lg text-white">{item.title}</h3>
                <span className="text-white/50 text-base">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FEATURE COLUMNS --- */}
      <section className="py-24 border-t border-white/5 bg-[#080808]">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="group p-8 md:p-10 rounded-2xl bg-[#111] border border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                {/* Top Row: Icon Circle & Number */}
                <div className="flex justify-between items-start">
                  
                  {/* Icon Container - Animated Fill */}
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-[#E3D5CA] group-hover:border-[#E3D5CA] group-hover:scale-105">
                    <span className="text-white group-hover:text-[#111] transition-colors duration-500">
                      {feature.icon}
                    </span>
                  </div>

                  {/* Number */}
                  <span className="font-serif text-4xl text-white/10 font-bold group-hover:text-white/30 transition-colors duration-500">
                    {feature.id}
                  </span>
                </div>

                {/* Bottom Row: Text Content */}
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 group-hover:text-[#E3D5CA] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm md:text-base font-light">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- COLLECTIONS GRID --- */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
          
          {/* Cell 1: Text Header (Row 1, Col 1) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-start md:justify-center items-start p-4"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-white mb-4">
              Collections
            </h2>
            <p className="text-white/40 font-medium text-sm uppercase tracking-widest">
              Curated for Quality
            </p>
          </motion.div>

          {/* Cell 2, 3, 4, 5: Product Items */}
          {COLLECTIONS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group overflow-hidden rounded-md bg-[#111]"
            >
              {/* Image */}
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- NEW SECTION: TESTIMONIALS (Continuous Marquee) --- */}
      <section className="py-24 border-t border-white/5 bg-[#050505] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 mb-16 text-center">
           <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">Community</span>
           <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-white">What our members say</h2>
        </div>

        <div className="flex w-full">
           <motion.div 
             className="flex gap-8 px-4"
             animate={{ x: "-50%" }}
             transition={{ 
               repeat: Infinity, 
               ease: "linear", 
               duration: 40 // Adjust speed here (higher = slower)
             }}
             style={{ width: "max-content" }}
           >
             {/* Duplicate items for seamless loop */}
             {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
               <div 
                 key={idx} 
                 className="w-[350px] md:w-[450px] p-8 md:p-10 rounded-xl bg-[#111] border border-white/10 flex-shrink-0 flex flex-col justify-between gap-8 hover:border-white/30 transition-colors duration-300"
               >
                 {/* Stars & Text */}
                 <div className="flex flex-col gap-6">
                   <div className="flex gap-1">
                     {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                   </div>
                   <p className="text-white/80 text-lg leading-relaxed font-light">
                     "{item.text}"
                   </p>
                 </div>

                 {/* User Profile */}
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                     <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <h4 className="text-white font-medium text-base">{item.name}</h4>
                     <p className="text-white/40 text-sm">{item.role}</p>
                   </div>
                 </div>
               </div>
             ))}
           </motion.div>
        </div>
      </section>

      {/* --- PLANS & PRICING --- */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeInUp} 
          className="text-center mb-20"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">Plans & Pricing</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mt-4 text-white">Elevate Your Lifestyle</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          
          {/* ESSENTIAL PLAN */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <SpotlightCard className="rounded-[2rem] h-full bg-black/40 backdrop-blur-xl flex flex-col" spotlightColor="rgba(255, 255, 255, 0.15)">
              <div className="p-8 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Essential</h3>
                  <p className="text-gray-500 text-sm">The daily wellness standard.</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-bold tracking-tight">$49</span>
                  <span className="text-gray-500 ml-2">/ month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    "2 Juices & 1 Chocolate Bar",
                    "Standard Eco-Shipping",
                    "Cancel or Skip Anytime",
                    "Access to Journaling App"
                  ].map((item, i) => <CheckItem key={i} text={item} delay={0.2 + (i * 0.1)} />)}
                </ul>
                <TrendyButton text="Select Essential" onClick={() => handleSelectPlan('Essential', 49)} />
              </div>
            </SpotlightCard>
          </motion.div>

          {/* PREMIUM PLAN */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="h-full relative z-20 md:scale-105"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-[2rem] opacity-50 blur-sm pointer-events-none" />
            <SpotlightCard className="rounded-[2rem] h-full bg-[#0A0A0A] relative flex flex-col" spotlightColor="rgba(34, 197, 94, 0.4)">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              
              <div className="px-10 py-16 flex flex-col h-full relative">
                <div className="absolute top-6 right-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                </div>

                <div className="mb-6">
                  <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Recommended</span>
                  <h3 className="text-3xl font-bold text-white mb-2">Premium</h3>
                  <p className="text-gray-400 text-sm">Our most popular experience.</p>
                </div>
                
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight text-white">$89</span>
                  <span className="text-gray-500">/ month</span>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {[
                    "5 Juices & 2 Selection Boxes",
                    "Priority Express Shipping",
                    "Exclusive Seasonal Access",
                    "Limited Edition Harvest Releases",
                    "Complimentary Tasting Mat"
                  ].map((item, i) => <CheckItem key={i} text={item} delay={0.4 + (i * 0.1)} />)}
                </ul>

                <TrendyButton primary text="Get Started" onClick={() => handleSelectPlan('Premium', 89)} />
              </div>
            </SpotlightCard>
          </motion.div>

          {/* COLLECTOR PLAN */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <SpotlightCard className="rounded-[2rem] h-full bg-black/40 backdrop-blur-xl flex flex-col" spotlightColor="rgba(255, 255, 255, 0.15)">
              <div className="p-8 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Collector</h3>
                  <p className="text-gray-500 text-sm">The ultimate luxury curation.</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-bold tracking-tight">$159</span>
                  <span className="text-gray-500 ml-2">/ month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    "Daily Juices & Unlimited Craft",
                    "Personal Concierge Support",
                    "Invite to Exclusive Events",
                    "Hand-Painted Ceramic Box",
                    "Custom Flavor Profiles"
                  ].map((item, i) => <CheckItem key={i} text={item} delay={0.6 + (i * 0.1)} />)}
                </ul>
                <TrendyButton text="Select Collector" onClick={() => handleSelectPlan('Collector', 159)} />
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* --- NEW SECTION: OUR NEWS (EXACT STRUCTURE + INTERACTION) --- */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-white mb-2">Our news</h2>
              <span className="text-white/40 font-medium text-sm uppercase tracking-widest">EXPLORE THE TRENDS</span>
            </div>
            <button 
              onClick={() => handleNavigation('/journal')}
              className="px-6 py-3 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors hidden sm:block"
            >
              View all posts
            </button>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: Big Feature Item (Navigates to Cacao Article) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="flex flex-col gap-6 cursor-pointer group"
               onClick={() => handleNavigation('/journal/caring-for-cacao')}
            >
              <div className="w-full aspect-[16/9] lg:aspect-[3/2] rounded-lg overflow-hidden bg-[#111] relative">
                <img 
                  src="https://i.pinimg.com/originals/a8/ae/df/a8aedfc1c016418d6c2c0df7af7fa620.jpg" // Left side image
                  alt="Feature Article" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Guides Badge (Hover Effect) */}
                <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Guides
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-4xl font-medium text-white leading-tight group-hover:text-primary transition-colors">Caring for your cacao products</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  Essential maintenance and storage tips to extend the life and flavor profile of your favorite organic chocolate products.
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                    <img src={TESTIMONIALS[2].img} alt="Author" className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="text-white font-medium">Sophia Laurent</span>
                    <span className="text-white/40">Health Expert · Jan 4, 2026 · 7 min read</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: List of 3 items */}
            <div className="flex flex-col gap-8 justify-between">
              
              {/* Item 1 (Top - Dragonfruit - Navigates to Favorites) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-6 group cursor-pointer"
                onClick={() => handleNavigation('/journal/customer-favorites')}
              >
                <div className="w-full sm:w-1/2 aspect-[4/3] rounded-lg overflow-hidden bg-[#111] relative">
                  <img 
                    src="https://www.eatingonadime.com/wp-content/uploads/2024/03/DragonFruitSmoothieLR-13.jpg" // Top right image
                    alt="Customer Favorites" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Guides Badge */}
                  <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Trends
                  </div>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col justify-start pt-2 gap-2">
                  <h4 className="text-xl font-medium text-white group-hover:text-primary transition-colors leading-tight">Tropical Dragonfruit Press</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Bright, refreshing, and antioxidant-rich, our Dragonfruit Press has become a customer favorite. Discover why this vibrant blend is the go-to choice for clean energy and daily refreshment.</p>
                </div>
              </motion.div>

              {/* Item 2 (Middle - Chocolate - Navigates to Story) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-6 group cursor-pointer"
                onClick={() => handleNavigation('/journal/brand-story')}
              >
                <div className="w-full sm:w-1/2 aspect-[4/3] rounded-lg overflow-hidden bg-[#111] relative">
                  <img 
                    src="https://i.pinimg.com/originals/0d/5c/e0/0d5ce050712feb9bfb907a80671cef06.jpg" // Middle right image
                    alt="Brand Story" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Guides Badge */}
                  <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Story
                  </div>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col justify-start pt-2 gap-2">
                  <h4 className="text-xl font-medium text-white group-hover:text-primary transition-colors leading-tight">Choco Belgium Delight</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Step inside our philosophy of slow craftsmanship, ethical sourcing, and small-batch production. A closer look at what defines our chocolates—and why quality begins at the source.</p>
                </div>
              </motion.div>

              {/* Item 3 (Bottom - Cleanse - Navigates to Cleanse Guide) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-6 group cursor-pointer"
                onClick={() => handleNavigation('/journal/perfect-cleanse')}
              >
                <div className="w-full sm:w-1/2 aspect-[4/3] rounded-lg overflow-hidden bg-[#111] relative">
                  <img 
                    src="https://www.funkypigeon.com/gallery/otherproducts/158507.jpg" 
                    alt="Ruby Berry Pralines" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Guides Badge */}
                  <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Guides
                  </div>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col justify-start pt-2 gap-2">
                  <h4 className="text-xl font-medium text-white group-hover:text-primary transition-colors leading-tight">Ruby Berry Pralines</h4>
                  <p className="text-white/60 text-sm leading-relaxed">A thoughtful guide to choosing the right indulgence for your lifestyle. Whether you’re seeking energy, recovery, or a gentle reset, Ruby Berry Pralines bring balance to every moment.</p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;