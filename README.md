# ITZFIZZ // Scroll-Driven Supercar Hero Section Animation

> A high-performance, scroll-synchronized motorsport motion experience recreating and elevating the reference demo with modern React, GSAP ScrollTrigger, and Tailwind CSS.

---

## 🔗 Submission Links

- 🌐 **Live Webpage**: [https://amankr-55.github.io/scroll-hero-animation/](https://amankr-55.github.io/scroll-hero-animation/)
- 💻 **GitHub Repository**: [https://github.com/amankr-55/scroll-hero-animation](https://github.com/amankr-55/scroll-hero-animation)
- 📌 **Original Reference**: [https://paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## 🎯 Assignment Overview & Compliance Checklist

| Requirement | Specification | Implementation Detail | Status |
| :--- | :--- | :--- | :---: |
| **1. Hero Section Layout** | Occupies above the fold (100vh) | Full viewport layout with status badge, headline & metrics | ✅ Complete |
| **1.1 Headline** | Letter-spaced `W E L C O M E   I T Z F I Z Z` | Styled in bold, wide-tracking typography | ✅ Complete |
| **1.2 Impact Metrics** | Percentages with short descriptions | 58%, 23%, 27%, 40% impact cards with dynamic counters | ✅ Complete |
| **2. Initial Load Animation** | Smooth load animation | Staggered reveal for headline characters & metric cards | ✅ Complete |
| **3. Scroll-Based Animation** | Respond directly to scroll progress | GSAP ScrollTrigger with `scrub: 1.2` dampening | ✅ Complete |
| **3.1 Vehicle Translation** | Supercar glides horizontally | McLaren 720S top-view moves from left to right along road | ✅ Complete |
| **3.2 Dynamic Letter Reveal** | Typography lights up as car passes | Spatial collision detection illuminates letters upon crossing | ✅ Complete |
| **3.3 Expanding Trail** | Velocity trail fills behind vehicle | High-intensity neon trail anchored to vehicle chassis | ✅ Complete |
| **3.4 Metric Milestone Cards** | Sequential statistic popups | Four glassmorphism metric cards staggered across scroll | ✅ Complete |
| **4. Motion & Performance** | 60+ FPS without layout reflows | Exclusively hardware-accelerated transforms (`translate3d`) | ✅ Complete |

---

## 🛠️ Mandatory Tech Stack

- **Framework**: [React 19](https://react.dev/) / Next.js architecture
- **Animation Engine**: [GSAP 3](https://greensock.com/gsap/) with [ScrollTrigger Plugin](https://greensock.com/scrolltrigger/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesis**: Native Web Audio API (real-time engine rev modulation)
- **Bundler & Deploy**: [Vite](https://vitejs.dev/) + GitHub Pages (`gh-pages`)

---

## ✨ Key Features & Engineering Enhancements

1. **Precision Scroll Interpolation (`scrub: 1.2`)**:
   - ScrollTrigger links window scroll progress smoothly with subtle inertia dampening, avoiding rigid steps or jerky frames.
2. **Dynamic Spatial Collision Detection**:
   - Calculates the exact leading edge coordinate of the supercar relative to each letter span's bounding box.
   - Letters dynamically pop and contrast against the velocity trail in real time, rewinding seamlessly when scrolling back up.
3. **Real-Time Telemetry HUD**:
   - Displays live speedometer calculation (`0 – 328 KM/H`) based on scroll velocity and position.
   - Dynamic gear indicator shifts sequentially (`1ST → 2ND → 3RD → 4TH → 5TH → 6TH`).
   - Scrub percentage bar showing real-time track progress.
4. **Interactive Theme Customizer**:
   - One-click palette switcher:
     - 🟢 **Emerald Nitro** (`#45db7d` reference default)
     - 🔵 **Electric Cyan** (`#06b6d4`)
     - 🟠 **McLaren Papaya** (`#fa7328`)
     - 🟣 **Ultraviolet Drift** (`#a855f7`)
5. **Synthesized Supercar Sound (Web Audio API)**:
   - Optional low-pass filtered sawtooth engine purr that accelerates and revs proportionally with scroll velocity. Muted by default.
6. **Auto-Cruise Demonstration Mode**:
   - For users on mobile devices or trackpads, the "Auto-Scrub" button smoothly animates the complete sprint with realistic acceleration curves.

---

## 📂 Project Structure

```text
scroll-hero-animation/
├── public/
│   ├── car.png               # McLaren 720S top-view cutout
│   └── favicon.svg           # Custom SVG favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation, telemetry indicator & links
│   │   ├── HeroIntro.jsx     # First screen above fold with initial load animations
│   │   ├── TrackSection.jsx  # Pinned scroll-driven highway & supercar animation
│   │   ├── TelemetrySpecs.jsx# Engineering report & performance verification
│   │   └── Footer.jsx        # Clean attribution, links & copyright
│   ├── App.jsx               # Root application layout
│   ├── index.css             # Tailwind v4 directives & custom glow utilities
│   └── main.jsx              # React 19 entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amankr-55/scroll-hero-animation.git
   cd scroll-hero-animation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 👤 Author

- **Aman Kumar**
- GitHub: [@amankr-55](https://github.com/amankr-55)
