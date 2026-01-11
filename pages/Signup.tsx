import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RoutePath } from '../types';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, logic would go here. For now, we simulate success.
    navigate(RoutePath.Login);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-6 relative overflow-hidden bg-luxury-dark">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 size-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 size-[500px] bg-accent-dark/30 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="size-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/20">
            <span className="material-symbols-outlined text-luxury-dark text-4xl font-bold">eco</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-black mb-2 text-white">Begin Your Journey</h1>
          <p className="text-white/40">Step into a world of curated organic craft</p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100"
        >
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 pl-2">Full Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Julian Artisan"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 pl-2">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="connoisseur@luxury.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 pl-2">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-white/10"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-5 bg-primary text-luxury-dark font-black rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all mt-4"
          >
            Create My Account
          </button>

          <div className="flex items-center justify-center text-xs text-white/30 pt-4">
            <p>By joining, you agree to our <a href="#" className="hover:text-primary underline">Terms</a></p>
          </div>
        </form>

        <p className="text-center mt-12 text-sm text-white/30">
          Already a member? <Link to={RoutePath.Login} className="text-primary font-bold hover:underline">Sign in to the Circle</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;