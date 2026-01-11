# ARTISAN — Premium Indulgence Platform

An ultra-luxury, high-end artisan food subscription service designed for the modern connoisseur. This platform redefines the "SaaS for Food" experience, blending editorial-grade aesthetics with a seamless, subscription-based wellness journey.

## 💎 Tech Stack

*   **Core Framework**: [React 19](https://react.dev/) (leveraging the latest Concurrent Rendering features and ESM modules).
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for robust type safety and developer productivity.
*   **Styling & UI**: [Tailwind CSS](https://tailwindcss.com/) with a custom "Luxury Dark" color palette and sophisticated typography.
*   **Routing**: [React Router Dom v7](https://reactrouter.com/) for fluid, single-page navigation.
*   **Icons**: [Google Material Symbols](https://fonts.google.com/icons) for a clean, modern iconography set.
*   **Typography**: 
    *   *Playfair Display*: For high-end, serif-led editorial headings.
    *   *Inter*: For clean, accessible sans-serif body text.

## 🚀 Key Features

### 1. Immersive Product Tour
A flagship experience featuring a vertical-scroll snap tour.
*   **Dynamic Theme Switching**: The entire UI background and accent colors shift smoothly based on the active product.
*   **Adaptive Scale Controls**: Users can toggle "Selection Magnitudes" (35ml to 55ml) which physically scales the 3D-effect product imagery in real-time.
*   **Background Typography**: Large-scale, high-opacity background text that repositions itself precisely to create a professional magazine layout.

### 2. Artisan Shop & Filtering
A curated marketplace for limited-batch items.
*   **Multi-Category Filtering**: Instantly switch between *Organic Chocolates*, *Cold-Pressed Juices*, and *Artisan Boxes*.
*   **Animated Product Cards**: Smooth hover transitions, scaling effects, and stateful "Added to Box" feedback.

### 3. Connoisseur Profiles
A dedicated space for members to manage their journey.
*   **Membership Tiers**: Custom dashboard tracking status as an *Essential*, *Premium*, or *Collector* member.
*   **Wellness Dashboard**: Integrated stats for "Daily Hydration" and "Taste History."
*   **Taste Journey**: A historical log of previous deliveries with integrated rating systems.

### 4. Optimized Subscription Flow
*   **Tiered Pricing**: Three distinct membership levels with detailed feature breakdowns and FAQ support.
*   **Premium Checkout**: A mobile-first checkout experience including delivery date scheduling and multiple modern payment methods (Apple Pay, UPI, Card).
*   **Stateful Cart**: Persistant cart management across the entire routing lifecycle.

### 5. Brand Storytelling
*   **Philosophy Section**: A dedicated "About" page highlighting regenerative farming, cryo-pressing techniques, and social impact commitments.
*   **Sustainability Native**: The design emphasizes eco-friendly packaging and carbon-neutral delivery logistics.

## 📂 Project Structure

```text
/
├── App.tsx             # Main application entry, routing, and state management
├── index.tsx           # React DOM mounting
├── index.html          # Global styles, fonts, and Tailwind configuration
├── types.ts            # Core TypeScript interfaces (Product, CartItem, etc.)
├── constants.tsx       # Centralized product catalog and business logic constants
└── pages/              # Modularized page components
    ├── Home.tsx        # High-conversion landing page
    ├── Shop.tsx        # Filterable collection view
    ├── ProductTour.tsx # Immersive scrolling experience
    ├── Profile.tsx     # Member dashboard and settings
    ├── Cart.tsx        # Selection management
    ├── Checkout.tsx    # Transactional logic
    └── ...             # Subscription, Login, Signup
```

## ✨ Design Philosophy
The platform utilizes a **"Luxury-First"** approach:
*   **High Contrast**: Deep blacks (`#0a140d`) paired with a vibrant primary green (`#13ec5b`) for maximum visual impact.
*   **Micro-interactions**: Subtle `animate-in`, `blur-xl`, and `backdrop-blur` effects to ensure every interaction feels premium.
*   **Editorial Layouts**: Generous whitespace and vertical typography inspired by high-end fashion journals.

---
*Crafted for the soul, delivered to your door.*