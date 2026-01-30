import React, { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { RoutePath } from '../types';

// --- TYPES (Fixed: Removed 'key' from interfaces) ---

interface AccordionItemProps {
  question: string;
  answer: string;
  i: number;
}

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

interface CheckItemProps {
  text: string;
  delay: number;
}

// --- COMPONENTS ---


// 2. TRENDY BUTTON (Fill Up Motion)
const TrendyButton = ({ text, onClick, primary = false }: { text: string, onClick: () => void, primary?: boolean }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full py-4 rounded-xl overflow-hidden group border ${
        primary ? 'border-primary' : 'border-white/20'
      }`}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Fill Animation */}
      <motion.div
        className={`absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out ${
          primary ? 'bg-primary' : 'bg-white'
        }`}
      />
      
      {/* Text Layer */}
      <span className={`relative z-10 font-bold text-lg tracking-wider uppercase transition-colors duration-300 ${
        primary ? 'text-primary group-hover:text-black' : 'text-white group-hover:text-black'
      }`}>
        {text}
      </span>
    </motion.button>
  );
};

// 3. ACCORDION ITEM (New Clean FAQ)
const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, i }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="mb-4 border-b border-white/10 last:border-none"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left group"
      >
        <span className={`text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white group-hover:text-white/80'}`}>
          {question}
        </span>
        <span className="relative flex h-6 w-6 items-center justify-center">
            {/* Animated Plus/Minus Icon */}
            <motion.span 
              animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }} 
              className="absolute h-0.5 w-6 bg-white/50"
            />
            <motion.span 
              animate={{ rotate: isOpen ? 180 : 90 }} 
              className="absolute h-0.5 w-6 bg-white/50"
            />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // Elegant spring
            className="overflow-hidden"
          >
            <div className="pb-8 text-gray-400 leading-relaxed text-base max-w-2xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 4. SPOTLIGHT CARD
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

// 5. CHECK ITEM
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

// --- MAIN PAGE ---

const Subscription: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: string, price: number) => {
    navigate(RoutePath.SubscriptionCheckout, { state: { plan, price } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-primary selection:text-black cursor-none">
      

      {/* Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-20 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen opacity-20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary font-mono text-xs uppercase tracking-[0.2em] mb-6">
              Unlock Your Potential
            </span>
            <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent drop-shadow-2xl">
              Elevate Your <br className="hidden md:block" />
              <span className="italic font-light">Lifestyle.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Curated for the senses. Flexible, sustainable, and designed to fit your unique wellness architecture.
            </p>
          </motion.div>
        </div>

        {/* Pricing Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center"
        >
          {/* ESSENTIAL PLAN */}
          <motion.div variants={cardVariants} className="h-full">
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

          {/* PREMIUM PLAN (HERO - Middle) */}
          <motion.div variants={cardVariants} className="h-full relative z-20 md:scale-105">
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
          <motion.div variants={cardVariants} className="h-full">
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
        </motion.div>

        {/* FAQ SECTION (Clean & Animated) */}
        <div className="mt-40 max-w-3xl mx-auto">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-center mb-16"
          >
             <span className="text-primary text-sm font-mono uppercase tracking-widest">Support</span>
             <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3">Questions? Answers.</h2>
          </motion.div>
          
          <div className="space-y-2">
            {[
              { q: "Can I customize my box?", a: "Yes! After subscribing, you can use our 'Build Your Box' portal to swap flavors and select specific seasonal favorites each month." },
              { q: "Is the packaging sustainable?", a: "Every element of our packaging is compostable or infinitely recyclable, including the glass bottles and organic fiber box liners." },
              { q: "What is the cancellation policy?", a: "You can pause, skip, or cancel your subscription at any time directly from your dashboard with zero hidden fees." },
              { q: "Do you offer international shipping?", a: "Currently we ship to North America and select European countries. We are expanding our global reach quarterly." }
            ].map((item, i) => (
              <AccordionItem key={i} i={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;