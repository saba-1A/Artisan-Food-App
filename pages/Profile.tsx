import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RoutePath } from '../types';

interface ProfileProps {
  user: { name: string; plan?: string } | null;
  onLogout: () => void;
}

type ProfileTab = 'Dashboard' | 'Subscriptions' | 'History' | 'Settings';

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTab>('Dashboard');

  if (!user) {
    React.useEffect(() => { navigate(RoutePath.Login); }, []);
    return null;
  }

  const tabs = [
    { label: 'Wellness Dashboard', id: 'Dashboard' as ProfileTab, icon: 'dashboard' },
    { label: 'My Subscriptions', id: 'Subscriptions' as ProfileTab, icon: 'card_membership' },
    { label: 'Taste History', id: 'History' as ProfileTab, icon: 'history' },
    { label: 'Shipping & Privacy', id: 'Settings' as ProfileTab, icon: 'settings' }
  ];

  const currentPlan = user.plan || 'Free Tier';

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="font-serif text-5xl md:text-7xl font-black mb-4">Welcome back,<br/><span className="text-primary italic">Connoisseur</span></h1>
              <p className="text-white/40 text-lg">Your next selection box is scheduled for dispatch on October 14th.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { val: '74%', label: 'Daily Hydration', color: 'primary' },
                { val: currentPlan, label: 'Active Tier', color: 'white' },
                { val: '12', label: 'Box Deliveries', color: 'primary' }
              ].map((stat, i) => (
                <div key={i} className="bg-accent-dark/30 p-8 rounded-[2rem] border border-white/5">
                  <span className={`block text-2xl md:text-3xl font-black mb-1 ${stat.color === 'primary' ? 'text-primary' : 'text-white'}`}>{stat.val}</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Featured Recommendation */}
            <div className="bg-gradient-to-br from-primary/20 to-accent-dark/40 rounded-[3rem] p-12 border border-primary/20 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 size-64 bg-primary rounded-full blur-[100px] opacity-20 -z-10"></div>
              <div className="size-48 rounded-[2rem] overflow-hidden shadow-2xl flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=600" className="size-full object-cover" alt="Rec" />
              </div>
              <div>
                <span className="bg-primary text-luxury-dark text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full mb-6 inline-block">Personal Peak Pick</span>
                <h3 className="text-3xl font-bold mb-4">Recommended for You:<br/>75% Dark Truffles</h3>
                <p className="text-white/60 text-sm mb-8 max-w-lg">Based on your recent preference for bold, earthy profiles, we've curated this Ecuadorian collection just for you.</p>
                <Link to={RoutePath.Shop} className="bg-white text-luxury-dark font-black px-8 py-3 rounded-xl hover:bg-primary transition-all active:scale-95 inline-block">Add to Next Box</Link>
              </div>
            </div>
          </div>
        );
      case 'Subscriptions':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-serif font-black">Active Plans</h2>
            <div className="bg-white/5 border border-primary/20 rounded-[2.5rem] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-luxury-dark px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">Renewal in 12 days</div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{currentPlan} Tier</h3>
                  <p className="text-white/40 mb-6">Billed monthly through secure portal</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-white/70">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      Customizable Seasonal Box
                    </li>
                    <li className="flex items-center gap-3 text-sm text-white/70">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      Priority Eco-Friendly Shipping
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <button className="bg-white text-luxury-dark font-bold px-8 py-3 rounded-xl hover:bg-primary transition-all">Manage Selection</button>
                  <button className="text-white/30 text-xs font-bold hover:text-white transition-colors py-2 text-center">Pause Subscription</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'History':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-serif font-black">Taste Journey</h2>
            <div className="space-y-4">
              {[
                { date: 'Sep 14, 2024', name: 'Valencia Orange Sunrise', type: 'Juice', status: 'Delivered', rating: 5 },
                { date: 'Aug 14, 2024', name: 'Master Belgian Truffles', type: 'Box', status: 'Delivered', rating: 4 },
                { date: 'Jul 14, 2024', name: 'Ruby Berry Pralines', type: 'Chocolate', status: 'Delivered', rating: 5 }
              ].map((order, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="size-14 bg-accent-dark rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">eco</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{order.name}</h4>
                      <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{order.date} • {order.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <span key={j} className={`material-symbols-outlined text-sm ${j < order.rating ? 'text-primary fill-1' : 'text-white/10'}`}>star</span>
                      ))}
                    </div>
                    <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-serif font-black">Preferences</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 border-b border-white/10 pb-2">Shipping Address</h3>
                <div className="bg-white/5 p-6 rounded-2xl space-y-2 border border-white/5">
                  <p className="font-bold">Primary Residence</p>
                  <p className="text-white/40 text-sm leading-relaxed">123 Luxury Lane, Apt 4B<br/>New York, NY 10001<br/>United States</p>
                  <button className="text-primary text-xs font-bold hover:underline pt-4">Change Address</button>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 border-b border-white/10 pb-2">Privacy & Notifications</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Harvest Updates', desc: 'Get notified when new seasonal fruits arrive.', checked: true },
                    { label: 'Early Access', desc: 'Be the first to know about limited truffles.', checked: true },
                    { label: 'Wellness Tips', desc: 'Weekly newsletter on organic lifestyle.', checked: false }
                  ].map((toggle, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                      <div>
                        <p className="font-bold text-sm">{toggle.label}</p>
                        <p className="text-white/40 text-[10px] leading-relaxed">{toggle.desc}</p>
                      </div>
                      <div className={`w-10 h-5 rounded-full p-1 transition-colors ${toggle.checked ? 'bg-primary' : 'bg-white/10'}`}>
                        <div className={`size-3 bg-luxury-dark rounded-full transition-transform ${toggle.checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 items-start">
        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-8 sticky top-32">
          <div className="bg-white/5 rounded-[3rem] p-10 border border-white/10 text-center">
            <div className="size-32 bg-primary/20 rounded-full mx-auto mb-6 flex items-center justify-center p-1 border-2 border-primary">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} className="size-full rounded-full" alt="Avatar" />
            </div>
            <h2 className="text-2xl font-bold capitalize mb-1">{user.name}</h2>
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">{currentPlan} Member</p>
            <button 
              onClick={() => { onLogout(); navigate(RoutePath.Home); }}
              className="mt-8 text-white/30 hover:text-red-500 text-xs font-bold transition-colors"
            >
              Sign Out
            </button>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-8 py-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-primary text-luxury-dark font-bold shadow-lg scale-105' : 'hover:bg-white/5 text-white/60'}`}
              >
                <span className="material-symbols-outlined">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;