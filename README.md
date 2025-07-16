# Supreme Group
A modern, interactive, and performance-optimized React component for showcasing video content with variant-based navigation and dynamic UI behaviors. This project demonstrates responsive layout techniques, rich animation with Framer Motion, and seamless UX interactivity built with Next.js and Tailwind CSS.
---
## 🚀 Project Setup
1. **Clone the repository**
 `bash
   git clone https://github.com/yourusername/supreme-group.git
   cd supreme-group
   `
2. **Install dependencies**
 `bash
   npm install
   # or
   yarn install
   `
3. **Start the development server**
 `bash
   npm run dev
   # or
   yarn dev
   `
4. **Build for production**
 `bash
   npm run build
   `
---
## 🧩 Component Architecture Overview
`
supreme-group/
├── components/
│   └── EvolvingSection.tsx        # Main UI logic and video controls
├── lib/
│   └── constant.ts                # Data structure for variants and icons
├── public/
│   └── assets/                    # Icon and video assets
└── styles/
    └── globals.css               # Tailwind and global styling
`
The core UI lives in `EvolvingSection.tsx`, designed as a fully responsive, scroll-aware, video-driven display component. It uses `useRef`, `useEffect`, and `useState` to control scroll interaction, media playback, and animation behaviors.
---
## 📱 Responsive Design Strategy
- Utilizes **Tailwind CSS** utility classes for responsive layouts.
- Implements **flex** and **grid** strategies to support both mobile-first and desktop experiences.
- Ensures that all media and layout containers scale and reposition based on screen size using `w-full`, `max-w-*`, and breakpoint-aware `px`, `py`, `text-*` classes.
---
## ⚡ Performance Optimization
- **Lazy loading** of media: video elements use `load`, `autoplay`, and conditional rendering with `AnimatePresence`.
- **Reusing refs** via `useCallback` to reduce re-rendering.
- Video clip switching only reloads when needed, avoiding unnecessary DOM updates.
---
## ♿ Accessibility Considerations
- Video player supports play/pause toggling with visible feedback.
- Text contrast adheres to WCAG standards using `text-white`, `text-white/30`.
- Interactive elements use visible cues and hover feedback.
- Icons and interactive buttons are keyboard-accessible.
---
## 🧰 Third-party Libraries Used
- [`framer-motion`](https://www.framer.com/motion/) - For animating UI transitions and video appearance.
- [`next/image`](https://nextjs.org/docs/api-reference/next/image) - Optimized image rendering and automatic lazy loading.
- [`tailwindcss`](https://tailwindcss.com/) - Utility-first CSS for styling and responsive design.
---
## 📌 Assumptions & Implementation Decisions
- **Variants** are limited to two types: `passenger` and `commercial`, but the architecture supports dynamic expansion.
- Media files are assumed to be locally available; no streaming or async fetches.
- UI is built with client-side rendering in mind, ideal for dynamic interactions.
---
## ⚠️ Challenges Faced
### Scroll Syncing with IntersectionObserver
- **Issue**: Ensuring scroll-based switching of content was smooth and consistent.
- **Solution**: Leveraged `IntersectionObserver` with `threshold: 0.6` to detect section visibility and toggle variant state accordingly.
### Video Playback Synchronization
- **Issue**: Video had to restart seamlessly when switching clips or variants.
- **Solution**: Explicit pause, set `currentTime`, and replay using `ref` control.
---
## 🔮 Upcoming Features & Improvements
- Add keyboard navigation and focus outlines for improved accessibility.
- Support for asynchronous video loading and error handling.
- Internationalization (i18n) support for multilingual descriptions.
- Add unit and integration tests for scroll behavior and UI updates.
- Expand `evolveData` dynamically via CMS integration.
---
## 💬 Additional Remarks
This component is optimized for marketing or showcase pages that need immersive, interactive storytelling. Its modular design makes it easy to plug into a broader application layout and customize with new media assets or data sources.
We welcome contributions, suggestions, and issues to help improve the project further!
---
