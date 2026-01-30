import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion'; // IMPORTED FRAMER MOTION
import Home from './pages/Home';
import Shop from './pages/Shop';
import Subscription from './pages/Subscription';
import About from './pages/About';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Signup from './pages/Signup';
import SubscriptionCheckout from './pages/SubscriptionCheckout';
import BlogPost from './pages/BlogPost';
import { RoutePath, CartItem, Product } from './types';

// --- 1. GLOBAL CUSTOM CURSOR COMPONENT ---
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: globalThis.MouseEvent) => {
      // Offset by half width/height to center it (w-5 = 20px, so minus 10px)
      cursorX.set(e.clientX - 10); 
      cursorY.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    />
  );
};

// --- EXISTING COMPONENTS ---

const SearchOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-luxury-dark/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
      <button onClick={onClose} className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors cursor-none">
        <span className="material-symbols-outlined text-4xl">close</span>
      </button>
      <div className="w-full max-w-2xl">
        <input 
          autoFocus
          type="text" 
          placeholder="Search artisan treasures..." 
          className="w-full bg-transparent border-b-2 border-primary/30 text-4xl md:text-6xl font-serif text-white focus:outline-none focus:border-primary pb-4 placeholder:text-white/10 cursor-none"
        />
        <div className="mt-8 flex gap-4 text-white/40 text-sm">
          <span>Trending:</span>
          <Link to={RoutePath.Shop} onClick={onClose} className="text-primary hover:underline cursor-none">Dark Truffles</Link>
          <Link to={RoutePath.Shop} onClick={onClose} className="text-primary hover:underline cursor-none">Cold-Press</Link>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC<{ cartCount: number; isLoggedIn: boolean; onSearchOpen: () => void }> = ({ cartCount, isLoggedIn, onSearchOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  if (location.pathname === RoutePath.Checkout || location.pathname === RoutePath.SubscriptionCheckout) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 glass-header">
      <div className="flex items-center justify-between px-6 h-20 max-w-7xl mx-auto">
        <Link to={RoutePath.Home} className="flex items-center gap-3 cursor-none">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(19,236,91,0.3)]">
            <span className="material-symbols-outlined text-luxury-dark text-2xl font-bold">eco</span>
          </div>
          <span className="font-serif text-2xl font-black tracking-tighter text-white">ARTISAN</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link className={`text-sm font-medium transition-colors cursor-none ${isActive(RoutePath.Home) ? 'text-primary' : 'text-white/70 hover:text-primary'}`} to={RoutePath.Home}>Home</Link>
          <Link className={`text-sm font-medium transition-colors cursor-none ${isActive(RoutePath.Shop) ? 'text-primary' : 'text-white/70 hover:text-primary'}`} to={RoutePath.Shop}>Shop</Link>
          
          <Link className={`text-sm font-medium transition-colors cursor-none ${isActive(RoutePath.Subscription) ? 'text-primary' : 'text-white/70 hover:text-primary'}`} to={RoutePath.Subscription}>Subscription</Link>
          <Link className={`text-sm font-medium transition-colors cursor-none ${isActive(RoutePath.About) ? 'text-primary' : 'text-white/70 hover:text-primary'}`} to={RoutePath.About}>About</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-6 mr-4 border-r border-white/10 pr-6 text-white/70">
            <span onClick={onSearchOpen} className="material-symbols-outlined hover:text-white cursor-none transition-colors">search</span>
            <Link to={RoutePath.Cart} className="relative group cursor-none">
              <span className="material-symbols-outlined group-hover:text-white transition-colors">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 size-4 bg-primary text-luxury-dark text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to={isLoggedIn ? RoutePath.Profile : RoutePath.Login} className="cursor-none">
              <span className={`material-symbols-outlined ${isActive(RoutePath.Profile) || isActive(RoutePath.Login) ? 'text-primary' : 'hover:text-white'} transition-colors`}>account_circle</span>
            </Link>
          </div>
          <div className="md:hidden flex items-center gap-4 cursor-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="material-symbols-outlined text-white/90 text-2xl">menu</span>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-luxury-dark border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link className="text-lg font-medium text-white cursor-none" to={RoutePath.Home} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link className="text-lg font-medium text-white cursor-none" to={RoutePath.Shop} onClick={() => setIsMenuOpen(false)}>Shop</Link>
          
          <Link className="text-lg font-medium text-white cursor-none" to={RoutePath.Subscription} onClick={() => setIsMenuOpen(false)}>Subscription</Link>
          <Link className="text-lg font-medium text-white cursor-none" to={RoutePath.About} onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link className="text-lg font-medium text-white cursor-none" to={isLoggedIn ? RoutePath.Profile : RoutePath.Login} onClick={() => setIsMenuOpen(false)}>Profile</Link>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Hide footer on specialized fullscreen pages
  if (
    location.pathname === RoutePath.Checkout || 
    location.pathname === RoutePath.SubscriptionCheckout
  ) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowToast(true);
      setEmail('');
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative">
      {showToast && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[150] bg-primary text-luxury-dark font-black px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="material-symbols-outlined">mark_email_read</span>
          <span>Thank you for joining the circle!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-luxury-dark text-xl font-bold">eco</span>
              </div>
              <span className="font-serif text-xl font-black tracking-tight text-white">ARTISAN</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Redefining modern indulgence through organic subscription-based wellness. Crafted for the soul, delivered to your door.
            </p>
            <div className="flex gap-4">
              <a className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-luxury-dark transition-all text-white cursor-none" href="#"><span className="material-symbols-outlined text-lg">public</span></a>
              <a className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-luxury-dark transition-all text-white cursor-none" href="#"><span className="material-symbols-outlined text-lg">camera_alt</span></a>
              <a className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-luxury-dark transition-all text-white cursor-none" href="#"><span className="material-symbols-outlined text-lg">alternate_email</span></a>
            </div>
          </div>
          <div>
            <h5 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Shop Selection</h5>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><Link className="hover:text-primary transition-colors block cursor-none" to={RoutePath.Shop}>Organic Chocolates</Link></li>
              <li><Link className="hover:text-primary transition-colors block cursor-none" to={RoutePath.Shop}>Cold Pressed Juices</Link></li>
              <li><Link className="hover:text-primary transition-colors block cursor-none" to={RoutePath.Shop}>Limited Edition Bundles</Link></li>
              <li><Link className="hover:text-primary transition-colors block cursor-none" to={RoutePath.About}>Corporate Gifting</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Help & Support</h5>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><Link className="hover:text-primary transition-colors block cursor-none" to={RoutePath.About}>Contact Concierge</Link></li>
              <li><Link className="hover:text-primary transition-colors block cursor-none" to={RoutePath.About}>Shipping Logistics</Link></li>
              <li><Link className="hover:text-primary transition-colors block cursor-none" to={RoutePath.Subscription}>Subscription FAQ</Link></li>
              <li><Link className="hover:text-primary transition-colors block cursor-none" to={RoutePath.About}>Refund Policy</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="text-white font-bold uppercase tracking-widest text-xs">Join the Circle</h5>
            <p className="text-white/40 text-sm">Receive seasonal harvest updates and early access.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white cursor-none" 
                placeholder="Email address" 
                type="email"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-luxury-dark rounded-lg text-xs font-bold hover:brightness-110 transition-all active:scale-95 cursor-none"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
         <p className="text-white text-[10px] uppercase tracking-[0.2em]">
            © 2025 Artisan Food SaaS. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <Link className="hover:text-white cursor-none" to={RoutePath.About}>Privacy Policy</Link>
            <Link className="hover:text-white cursor-none" to={RoutePath.About}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; plan?: string } | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(1, item.quantity + delta) };
      return item;
    }));
  };
  const clearCart = () => setCart([]);

  const handleLogin = (name: string) => setUser({ name });
  const handleLogout = () => setUser(null);
  const handleUpdatePlan = (plan: string) => {
    setUser(prev => prev ? { ...prev, plan } : { name: 'Sfatfima', plan });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <HashRouter>
      <ScrollToTop />
      <CustomCursor /> {/* CURSOR ADDED HERE */}
      
      {/* Added cursor-none class to hide default cursor */}
      <div className="min-h-screen flex flex-col relative text-white cursor-none">
        <Navbar cartCount={cartCount} isLoggedIn={!!user} onSearchOpen={() => setIsSearchOpen(true)} />
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <main className="flex-grow">
          <Routes>
            <Route path={RoutePath.Home} element={<Home />} />
            <Route path={RoutePath.Shop} element={<Shop onAddToCart={addToCart} />} />
            <Route path={RoutePath.Subscription} element={<Subscription />} />
            <Route path={RoutePath.About} element={<About />} />
            <Route path={RoutePath.Cart} element={<Cart cart={cart} onUpdate={updateQuantity} onRemove={removeFromCart} />} />
            <Route path={RoutePath.Login} element={<Login onLogin={handleLogin} />} />
            <Route path={RoutePath.Signup} element={<Signup />} />
            <Route path={RoutePath.Profile} element={<Profile user={user} onLogout={handleLogout} />} />
            <Route path={RoutePath.Checkout} element={<Checkout cart={cart} onComplete={clearCart} />} />
            <Route path={RoutePath.SubscriptionCheckout} element={<SubscriptionCheckout onComplete={clearCart} onUpdatePlan={handleUpdatePlan} />} />
            <Route path="/journal/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
        <div className="fixed bottom-6 left-6 right-6 md:hidden z-50">
          <Link to={RoutePath.Shop} className="w-full py-4 bg-primary text-luxury-dark font-black rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-none">
            Build Your Box
            <span className="material-symbols-outlined">add_box</span>
          </Link>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;