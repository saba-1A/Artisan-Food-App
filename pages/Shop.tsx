import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const [filter, setFilter] = useState<'All' | 'Chocolate' | 'Juice' | 'Box'>('All');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const categories = ['All', 'Chocolate', 'Juice', 'Box'];

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="px-6 py-32 max-w-7xl mx-auto min-h-screen">
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="text-primary font-bold text-sm uppercase tracking-[0.4em]">Hand-Picked</span>
          <h1 className="font-serif text-6xl md:text-8xl font-black mt-4 mb-4 tracking-tighter">Pure Craft</h1>
          <p className="text-white/40 text-lg max-w-md">Small batches, organic farms, uncompromising soul. Discover the season's best.</p>
        </div>
        
        <div className="flex flex-wrap gap-3 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                filter === cat 
                  ? 'bg-primary text-luxury-dark shadow-xl' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative flex flex-col">
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden mb-8 relative bg-accent-dark/40 shadow-2xl transition-all duration-500 group-hover:rounded-[2rem] group-hover:-translate-y-2 border border-white/5">
              <img 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 animate-in fade-in fill-mode-forwards" 
                src={product.image}
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <button 
                  onClick={() => handleAdd(product)}
                  className={`w-full ${addedId === product.id ? 'bg-white text-luxury-dark' : 'bg-primary text-luxury-dark'} font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg`}
                >
                  <span className="material-symbols-outlined">{addedId === product.id ? 'done' : 'shopping_bag'}</span>
                  {addedId === product.id ? 'Added to Box' : 'Add to Selection'}
                </button>
              </div>
              <div className="absolute top-8 left-8">
                <span className="bg-black/50 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-white/10">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-start px-4">
              <div className="flex-1">
                <h4 className="font-serif text-3xl font-bold mb-2 group-hover:text-primary transition-colors leading-none tracking-tight">{product.name}</h4>
                <p className="text-white/40 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
              </div>
              <div className="text-right ml-6">
                <span className="text-primary font-black text-2xl tracking-tighter">${product.price.toFixed(2)}</span>
                <span className="block text-[10px] text-white/20 uppercase tracking-widest mt-1">Limited Batch</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;