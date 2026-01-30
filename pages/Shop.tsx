import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { PRODUCTS as ORIGINAL_PRODUCTS } from '../constants';

// --- 1. EXTENDED TYPE DEFINITION ---
// Added fields for specific accordion details
interface ExtendedProduct extends Product {
  hoverImage?: string;
  detailsContent?: string;
  sizeContent?: string;
  shippingContent?: string;
}

// --- 2. DATA MAPPINGS ---

// A. Hover Images
const HOVER_IMAGES: Record<string, string> = {
  'Green Orchard Press': 'https://cdn.shopify.com/s/files/1/0972/2024/products/08_1024x1024.png?v=1642767603',
  'Valencia Orange Sunrise': 'https://th.bing.com/th/id/R.53e501b0b67ebe7a405613751b3aed45?rik=jBBzwYTevKOyMA&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0434%2f5338%2f2808%2fproducts%2f137971-1-1.jpg%3fv%3d1635038707&ehk=6SfMagmI5oYjW0wuTxUFBasBbDUjaM1jyUI70UNXqNo%3d&risl=&pid=ImgRaw&r=0',
  'The Connoisseur Selection': 'https://www.luxury-paper-box.com/wp-content/uploads/2020/10/w-6.jpg',
  'Ruby Berry Pralines': 'https://www.ukweddingfavours.co.uk/media/image/8629/pink-chocolate-hearts.jpg',
  'Hazelnut Belgian Velvet': 'https://static.vecteezy.com/system/resources/previews/030/634/573/non_2x/chocolate-hazelnut-image-hd-free-photo.jpg',
  'Signature Gift Box': 'https://www.newtownchoc.com/image/cache/catalog/GiftBoxes/GiftBox30pc-800x800w.jpg',
  'Tropical Dragonfruit Press': 'https://tse4.mm.bing.net/th/id/OIP.UcmobLkVp8WBJrzHux_JtgHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3',
  'Master Belgian Truffles': 'https://thumbs.dreamstime.com/b/exquisite-chocolate-truffles-delight-exquisite-chocolate-truffles-where-decadent-cocoa-delights-gourmet-chocolate-297603353.jpg',
  'Vanilla Chocolate': 'https://tse2.mm.bing.net/th/id/OIP.FQF98yMYlOVYIGxwHGMNjAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3',
};

// B. Specific Product Details (Accordion Content)
const PRODUCT_SPECIFIC_INFO: Record<string, { details: string; size: string; shipping: string }> = {
  'Master Belgian Truffles': {
    details: "Hand-rolled in Brussels using 75% dark single-origin cocoa. Each truffle is dusted with premium organic cocoa powder for a bitter-sweet finish that melts effortlessly.",
    size: "Box of 16 Truffles (Approx. 240g total weight).",
    shipping: "Shipped in climate-controlled insulation to ensure they arrive without melting. Next-day delivery recommended."
  },
  'Valencia Orange Sunrise': {
    details: "Cold-pressed from 100% organic Valencia oranges. No added sugar, no preservatives, and never heated. This juice retains maximum enzyme activity and vitamin C content.",
    size: "500ml Glass Bottle (Recyclable).",
    shipping: "Ships refrigerated. Must be kept cool upon arrival. Consumed within 3 days of opening."
  },
  'The Connoisseur Selection': {
    details: "An award-winning assortment featuring pistachio ganache, salted caramel, and coffee-infused pralines. Designed for the true chocolate aficionado.",
    size: "Luxury Box of 24 pieces.",
    shipping: "Standard shipping available. Gift wrapping included."
  },
  'Ruby Berry Pralines': {
    details: "Made from the rare Ruby cocoa bean, offering a naturally pink color and berry flavor. Filled with a fresh wild strawberry reduction and white chocolate cream.",
    size: "Heart-shaped box of 12 pieces.",
    shipping: "Temperature sensitive. Shipped with cool-packs during summer months."
  },
  'Green Orchard Press': {
    details: "The ultimate detox blend. Granny Smith apples provide sweetness to balance the earthy kale and spicy ginger. Cold-pressed to retain all micronutrients.",
    size: "300ml Glass Bottle.",
    shipping: "Fresh produce item. Ships Monday-Wednesday only to ensure weekday delivery."
  },
  'Hazelnut Belgian Velvet': {
    details: "Slow-roasted Piedmont hazelnuts ground into a fine gianduja paste, encased in our signature 40% milk chocolate shell.",
    size: "Box of 18 Pralines.",
    shipping: "Standard shipping. Store in a cool, dry place (18°C)."
  },
  'Tropical Dragonfruit Press': {
    details: "A vibrant blend of pink dragonfruit (pitaya), lime, and coconut water. Rich in antioxidants and electrolytes, perfect for post-workout hydration.",
    size: "350ml Glass Bottle.",
    shipping: "Ships refrigerated. Shelf life of 10 days."
  },
  'Signature Gift Box': {
    details: "Our most comprehensive collection, featuring a tiered selection of truffles, pralines, and fruit cremes. The box is finished with a satin ribbon.",
    size: "Large Tiered Box (30 pieces). Dimensions: 10x10x4 inches.",
    shipping: "Fragile item. Shipped with extra padding and insurance."
  },
  'Vanilla Chocolate': {
    details: "A delicate white chocolate exterior filled with a creamy vanilla bean ganache and rolled in a crunchy sugar cookie crumble.",
    size: "Box of 12 Truffles.",
    shipping: "Standard shipping available."
  }
};

// --- 3. DATA MERGING ---
const VANILLA_CHOCOLATE: Product = {
  id: 'vanilla-choc-01',
  name: 'Vanilla Chocolate',
  description: 'Creamy white chocolate truffles with a delicate sugar cookie crumble finish.',
  price: 26.00,
  category: 'Box',
  tagline: 'Velvet Sweetness',
  image: 'https://publish.purewow.net/wp-content/uploads/sites/2/2022/02/white-chocolate-recipes-sugar-cookie-truffles-recipe.jpeg?fit=680%2C860'
};

const ALL_RAW_PRODUCTS = [...ORIGINAL_PRODUCTS, VANILLA_CHOCOLATE];

// Map all data (Hover images AND text details) into the product objects
const PRODUCTS: ExtendedProduct[] = ALL_RAW_PRODUCTS.map((p) => {
  const info = PRODUCT_SPECIFIC_INFO[p.name] || { 
    details: "Crafted with quality and care.", 
    size: "Standard size.", 
    shipping: "Standard shipping apply." 
  };

  return {
    ...p,
    hoverImage: HOVER_IMAGES[p.name] || p.image,
    detailsContent: info.details,
    sizeContent: info.size,
    shippingContent: info.shipping
  };
});

// --- 4. ICONS ---
const ChevronDown = ({ isOpen }: { isOpen: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
);
const SearchIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const CartIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>);

// --- 5. MAIN SHOP COMPONENT ---
interface ShopProps {
  onAddToCart: (product: Product) => void; 
}

type ViewState = 'New arrivals' | 'All' | 'Chocolate' | 'Juice' | 'Box';

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const [activeView, setActiveView] = useState<ViewState>('All');
  const [selectedProduct, setSelectedProduct] = useState<ExtendedProduct | null>(null);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(true); 

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView, selectedProduct]);

  const getFilteredProducts = () => {
    switch (activeView) {
      case 'New arrivals': return PRODUCTS.slice(0, 3); 
      case 'All': return PRODUCTS;
      default: return PRODUCTS.filter(p => p.category === activeView);
    }
  };

  const handleProductClick = (product: ExtendedProduct) => {
    setSelectedProduct(product);
  };
  const getHeadingText = () => {
    switch (activeView) {
      case 'New arrivals': return 'New Arrivals.';
      case 'Chocolate': return 'Fine Chocolates.';
      case 'Juice': return 'Cold Pressed.';
      case 'Box': return 'Gift Sets.';
      default: return 'Artisan Provisioning.';
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      
      {selectedProduct ? (
        <ProductDetailView 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
          onSelectRelated={setSelectedProduct}
        />
      ) : (
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-48 pb-32">
          
          <div className="mb-32"> 
<motion.h1 
               key={activeView} // <--- IMPORTANT: Add this so it re-animates on change
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, ease: "easeOut" }} // Optional: Smooths it out
               className="font-serif italic text-7xl md:text-9xl tracking-tight text-white mb-8"
             >
               {getHeadingText()}  {/* <--- Call the function here */}
             </motion.h1>
             <div className="pl-2 border-l border-white/20">
               <p className="text-white/40 text-sm md:text-base font-sans leading-relaxed max-w-md ml-4">
                 A curated selection of small-batch chocolates, <br className="hidden md:block" />
                 cold-pressed juices, and gift sets.
               </p>
             </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
               <nav className="flex flex-col text-sm font-medium">
                 <NavItem label="All" active={activeView === 'All'} onClick={() => setActiveView('All')} />
                 <NavItem label="New arrivals" active={activeView === 'New arrivals'} onClick={() => setActiveView('New arrivals')} />
                 <div className="border-b border-white/10">
                   <div onClick={() => setIsCollectionsOpen(!isCollectionsOpen)} className="py-5 cursor-pointer flex items-center justify-between group">
                     <span className={`transition-colors ${['Chocolate', 'Juice', 'Box'].includes(activeView) ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>Collections</span>
                     <span className="text-white/50"><ChevronDown isOpen={isCollectionsOpen} /></span>
                   </div>
                   <AnimatePresence>
                      {isCollectionsOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-0 pb-6 flex flex-col gap-4">
                          <SubNavItem label="Chocolates" active={activeView === 'Chocolate'} onClick={() => setActiveView('Chocolate')} />
                          <SubNavItem label="Drinks" active={activeView === 'Juice'} onClick={() => setActiveView('Juice')} />
                          <SubNavItem label="Box Sets" active={activeView === 'Box'} onClick={() => setActiveView('Box')} />
                        </motion.div>
                      )}
                   </AnimatePresence>
                 </div>
               </nav>
            </aside>
            <main className="flex-1">
               <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                 <AnimatePresence mode='popLayout'>
                   {getFilteredProducts().map((product) => (
                     <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={onAddToCart} 
                        onClick={() => handleProductClick(product)}
                     />
                   ))}
                 </AnimatePresence>
               </motion.div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 6. DETAIL VIEW COMPONENT ---
interface DetailProps {
  product: ExtendedProduct;
  onBack: () => void;
  onAddToCart: (p: Product) => void;
  onSelectRelated: (p: ExtendedProduct) => void;
}

const ProductDetailView: React.FC<DetailProps> = ({ product, onBack, onAddToCart, onSelectRelated }) => {
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 2);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-32"
    >
      <div className="flex items-center gap-2 text-sm text-white/40 mb-12">
        <button onClick={onBack} className="hover:text-white transition-colors">Shop</button>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32 relative">
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
           <div className="aspect-square bg-[#111] w-full rounded overflow-hidden">
             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
           </div>
           <div className="aspect-square bg-[#111] w-full rounded overflow-hidden">
             <img src={product.hoverImage || product.image} alt={product.name + " detail"} className="w-full h-full object-cover" />
           </div>
        </div>

        <div className="w-full lg:w-[40%]">
          <div className="lg:sticky lg:top-32 flex flex-col gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h1>
              <p className="text-xl text-white/60">USD ${product.price}</p>
            </div>
            
            <p className="text-white/60 leading-relaxed text-lg">
              {product.description}
            </p>

            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-white text-black h-14 rounded font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors mt-4"
            >
              Add to Cart
            </button>

            {/* --- DYNAMIC ACCORDION SECTIONS --- */}
            <div className="mt-8 border-t border-white/10">
              <AccordionItem title="Product Details">
                <p className="text-white/50 text-sm leading-relaxed pb-4">
                  {product.detailsContent}
                </p>
              </AccordionItem>
              <AccordionItem title="Size">
                <p className="text-white/50 text-sm leading-relaxed pb-4">
                  {product.sizeContent}
                </p>
              </AccordionItem>
              <AccordionItem title="Shipping and Returns">
                <p className="text-white/50 text-sm leading-relaxed pb-4">
                  {product.shippingContent}
                </p>
              </AccordionItem>
            </div>

          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="border-t border-white/10 pt-24">
          <h2 className="text-3xl font-serif mb-12">Browse more</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onAddToCart={onAddToCart} 
                onClick={() => onSelectRelated(p)} 
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// --- HELPER COMPONENTS ---

const NavItem = ({ label, active, onClick }: any) => (
  <div onClick={onClick} className="group py-5 border-b border-white/10 cursor-pointer flex items-center justify-between">
    <span className={`transition-colors ${active ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>{label}</span>
    {active && <motion.div layoutId="activeDot" className="w-2 h-2 bg-white rounded-full" />}
  </div>
);

const SubNavItem = ({ label, active, onClick }: any) => (
  <button onClick={onClick} className={`text-left text-sm transition-colors ${active ? 'text-white' : 'text-white/40 hover:text-white'}`}>
    {label}
  </button>
);

const AccordionItem = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-white/80 transition-colors"
      >
        <span className="text-base font-medium">{title}</span>
        <ChevronDown isOpen={isOpen} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ProductCardProps {
  product: ExtendedProduct;
  onAddToCart: (p: Product) => void;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      className="group cursor-pointer flex flex-col gap-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} 
    >
      <div className="aspect-square bg-[#111] rounded-sm w-full overflow-hidden relative">
        <motion.div 
          className="w-full h-full relative"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
            <motion.img 
              src={product.hoverImage} 
              alt={`${product.name} view 2`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
        </motion.div>
        
        <div className="absolute bottom-4 left-4 right-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="w-full bg-white text-black py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gray-200 shadow-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-1">{product.name}</h3>
        <p className="text-sm text-white/50">USD ${product.price.toFixed(0)}</p>
      </div>
    </motion.div>
  );
};

export default Shop;