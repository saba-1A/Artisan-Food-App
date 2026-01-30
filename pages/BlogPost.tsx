import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- DATA: Content for all 4 Articles ---
const BLOG_CONTENT: Record<string, any> = {
  'caring-for-cacao': {
    title: "Caring for your cacao products",
    subtitle: "Essential maintenance",
    date: "Jan 4, 2026",
    readTime: "7 min read",
    image: "https://i.pinimg.com/originals/a8/ae/df/a8aedfc1c016418d6c2c0df7af7fa620.jpg", // Strawberries/Choco
    intro: "High-quality organic cacao is an investment in your wellness, and with proper care, it can maintain its potency and flavor profile for months. Here’s how to keep your cacao looking and tasting as good as new.",
    sections: [
      {
        heading: "Proper Storage for Lasting Freshness",
        text: "Heat and humidity can compromise the delicate structures of raw cacao. Store your products in a cool, dry place—ideally between 60°F and 70°F (15°C–21°C). Avoid the refrigerator unless absolutely necessary, as condensation can lead to 'sugar bloom,' where sugar crystals rise to the surface."
      },
      {
        heading: "Protecting Against Oxidation",
        text: "Cacao is sensitive to air and strong odors. Always reseal your package tightly after every use to prevent oxidation, which can dull the rich flavor notes. If transferring to a new container, ensure it is an airtight glass jar or a high-quality tin to lock in the aroma."
      },
      {
        heading: "Serving the Right Way",
        text: "When not in use, keep your cacao away from direct sunlight. UV rays can degrade the antioxidants found in raw chocolate. Allow refrigerated chocolate to reach room temperature before opening to prevent condensation from forming on the surface."
      }
    ]
  },
  'customer-favorites': {
    title: "Tropical Dragonfruit Press",
    subtitle: "Trending Now",
    date: "Jan 12, 2026",
    readTime: "5 min read",
    image: "https://www.eatingonadime.com/wp-content/uploads/2024/03/DragonFruitSmoothieLR-13.jpg", // Dragonfruit
    intro: " Perfect for mornings, post-workout hydration, or a midday reset, the Tropical Dragonfruit Press fits seamlessly into any wellness routine. Light yet satisfying, it refreshes the body while gently uplifting the mind.",
    sections: [
      {
        heading: "A Fruit That Does More",
        text: "Vibrant, refreshing, and packed with antioxidants, our Dragonfruit press has taken the top spot this season. Sourced from sustainable orchards, it offers a natural energy boost without the caffeine crash, making it the perfect morning companion."
      },
      {
        heading: "Cold-Pressed for Purity",
        text: "Our Tropical Dragonfruit Press is crafted using cold-press extraction to preserve the fruit’s natural enzymes and nutrients. By avoiding heat, we maintain the integrity of its flavor profile—resulting in a smooth, clean taste that feels as fresh as it looks."
      },
      {
        heading: "Sustainably Sourced Ingredients",
        text: "Every bottle begins at responsible farms that prioritize ethical practices and soil health. We work closely with growers to ensure our dragonfruit is harvested at peak ripeness, delivering optimal flavor while supporting long-term sustainability."
      }
    ]
  },
  'brand-story': {
    title: "Choco Belgium Delight",
    subtitle: "Our Mission",
    date: "Feb 28, 2026",
    readTime: "9 min read",
    image: "https://i.pinimg.com/originals/0d/5c/e0/0d5ce050712feb9bfb907a80671cef06.jpg", // Dark Chocolates
    intro: "Choco Belgium Delight was created with a simple belief: exceptional chocolate begins with patience, purpose, and respect for origin. In an industry driven by speed and scale, we chose a slower path—one rooted in craftsmanship, sustainability, and uncompromising quality.",
    sections: [
      {
        heading: "Crafted the Belgian Way",
        text: "True Belgian chocolate is defined by balance—depth without bitterness, richness without excess. Our chocolatiers follow traditional techniques, carefully roasting and tempering each batch to achieve a smooth texture, refined snap, and natural sheen that signals quality at first glance."
      },
      {
        heading: "Small Batches, Greater Care",
        text: "Rather than mass production, we produce in small batches to maintain precision and consistency. This approach allows us to adjust, refine, and perfect every detail—from flavor development to mouthfeel—ensuring each piece meets our exacting standards."
      },
      {
        heading: "Chocolate with Purpose",
        text: "For us, chocolate is not just indulgence; it’s intention. Choco Belgium Delight represents a commitment to mindful enjoyment—where every bite reflects craftsmanship, sustainability, and a deep respect for the people and processes behind it."
      }
    ]
  },
  'perfect-cleanse': {
    title: "Ruby Berry Pralines",
    subtitle: "Wellness Guide",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    image: "https://www.funkypigeon.com/gallery/otherproducts/158507.jpg", // Heart Chocolates
    intro: "Ruby Berry Pralines are a celebration of balance—where indulgence meets intention. Designed for those who believe wellness doesn’t have to feel restrictive, these pralines offer a thoughtful way to enjoy sweetness while staying aligned with your body’s needs.",
    sections: [
      {
        heading: "When Wellness Meets Comfort",
        text: "Whether you’re seeking an energy lift, a moment of calm, or a comforting treat after a long day, Ruby Berry Pralines adapt effortlessly to your routine. They pair beautifully with quiet mornings, afternoon pauses, or evening wind-downs."
      },
      {
        heading: "A Thoughtful Treat",
        text: "Wellness is not about elimination—it’s about intention. Ruby Berry Pralines invite you to enjoy chocolate in a way that feels nourishing, balanced, and emotionally satisfying."
      },
      {
        heading: "Indulgence Without Excess",
        text: "Unlike traditional confections, these pralines are carefully formulated to feel satisfying without heaviness. Each piece is designed to be savored—encouraging mindful enjoyment rather than overindulgence."
      }
    ]
  }
};

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Get data based on slug
  const article = slug ? BLOG_CONTENT[slug] : null;

  // Handle 404 if slug doesn't exist
  if (!article) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-serif mb-4">Article Not Found</h1>
        <button onClick={() => navigate('/')} className="text-priJany hover:underline">Return Home</button>
      </div>
    );
  }

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-32 pb-24">
      <article className="max-w-[800px] mx-auto px-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8 uppercase tracking-wider font-medium">
          <Link to="/" className="hover:text-priJany transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-white/60">{article.subtitle}</span>
        </div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8"
        >
          {article.title}
        </motion.h1>

        {/* Author & Meta */}
        <div className="flex items-center justify-between border-t border-b border-white/10 py-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
              <img 
                src="https://randomuser.me/api/portraits/women/67.jpg" 
                alt="Sophia Laurent" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white">Sophia Laurent</span>
              <span className="text-sm text-white/50">Health Expert</span>
            </div>
          </div>
          <div className="text-sm text-white/40 font-medium">
            {article.date} · {article.readTime}
          </div>
        </div>

        {/* Main Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full aspect-[16/9] rounded-sm overflow-hidden mb-16 bg-[#111]"
        >
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <div className="space-y-16">
          
          {/* Intro Paragraph */}
          <p className="text-lg md:text-xl text-white/90 font-normal leading-relaxed">
            {article.intro}
          </p>

          {/* Subsections */}
          {article.sections.map((section: any, index: number) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <h2 className="font-serif text-3xl text-white mb-4 font-medium">
                {section.heading}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed font-light">
                {section.text}
              </p>
            </motion.section>
          ))}

          <div className="pt-8 border-t border-white/10">
            <p className="text-white/60 italic">
              Our promise is simple—to help you savour better health without ever taking away the joy of indulgent, wholesome delights.
            </p>
          </div>
        </div>

      </article>
    </main>
  );
};

export default BlogPost;