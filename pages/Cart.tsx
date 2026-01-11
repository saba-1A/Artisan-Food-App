import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem, RoutePath } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdate: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onUpdate, onRemove }) => {
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="px-6 py-40 max-w-7xl mx-auto text-center min-h-screen">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-8">Your box is empty.</h1>
        <Link to={RoutePath.Shop} className="inline-block px-10 py-5 bg-primary text-luxury-dark font-black rounded-2xl hover:scale-105 transition-all">
          Explore the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-32 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-serif text-5xl font-black mb-16">Your Selection</h1>
      <div className="space-y-8 mb-16">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row gap-8 items-center bg-white/5 p-8 rounded-[2rem] border border-white/10">
            <div className="size-32 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="size-full object-cover" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
              <p className="text-white/40 text-sm mb-4">{item.tagline}</p>
              <button onClick={() => onRemove(item.id)} className="text-red-400 text-xs font-bold hover:underline">Remove</button>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-xl">
                <button onClick={() => onUpdate(item.id, -1)} className="text-white/40 hover:text-white">-</button>
                <span className="font-bold w-4 text-center">{item.quantity}</span>
                <button onClick={() => onUpdate(item.id, 1)} className="text-white/40 hover:text-white">+</button>
              </div>
              <span className="text-xl font-black text-primary">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <span className="text-white/40 uppercase tracking-widest text-xs font-bold block mb-2">Total Amount</span>
          <span className="text-5xl font-black">${total.toFixed(2)}</span>
        </div>
        <button 
          onClick={() => navigate(RoutePath.Checkout)}
          className="px-12 py-6 bg-primary text-luxury-dark font-black rounded-2xl text-xl hover:brightness-110 shadow-xl shadow-primary/20 transition-all active:scale-95"
        >
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default Cart;