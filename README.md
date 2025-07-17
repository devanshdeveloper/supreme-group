# Supreme Group

A modern, interactive, and performance-optimized React component for showcasing video content with variant-based navigation and dynamic UI behaviors. This project demonstrates responsive layout techniques, rich animations with Framer Motion, and seamless UX interactivity built with Next.js and Tailwind CSS.

---

## 🚀 Live Demo

View the live deployment: [https://supreme-group.vercel.app](https://supreme-group.vercel.app)


## 📦 Repository

Clone or explore the source code on GitHub:

```bash
git clone https://github.com/devanshdeveloper/supreme-group.git
cd supreme-group
````

---

## 🛠️ Project Setup

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview production build**

   ```bash
   npm run start
   ```

---

## 🧩 Component Architecture Overview

```
supreme-group/
├── components/
│   └── EvolvingSection.tsx        # Main UI logic and video controls
├── lib/
│   └── constants.ts               # Variant definitions and icon mappings
├── pages/                         # Next.js page routes
│   └── index.tsx                  # Entry point integrating EvolvingSection
├── public/
│   └── assets/                    # Icon and video files
└── styles/
    └── globals.css               # Tailwind base and custom utilities
```

* **EvolvingSection.tsx**: Scroll-aware container using `useRef`, `useEffect`, and `useState` to manage variant states, media playback, and animations.
* **constants.ts**: Defines the `evolveData` structure for `passenger` and `commercial` variants, including titles, descriptions, icons, and video sources.

---

## 🎨 Design Adherence

* Pixel-perfect implementation based on the Figma design, including:

  * **Typography**: Font sizes, weights, and line heights.
  * **Spacing**: Margin and padding values matching design tokens.
  * **Color Scheme**: Tailwind theme extended to mirror brand colors.
  * **Layout**: Flex and grid structures for content alignment.

---

## 📱 Responsive Design Strategy

* **Mobile-first** approach using Tailwind CSS breakpoints.
* **Utility Classes**: `w-full`, `max-w-*`, `px-4`, `py-6`, `sm:px-6`, `lg:grid-cols-2`, etc.
* Thorough cross-browser testing on Chrome, Firefox, Safari (macOS & iOS) and major Android browsers.

---

## ⚡ Performance Optimization

* **Code Splitting**: Dynamic imports for non-critical components.
* **Lazy Loading**: Video elements and images using Next.js `<Image>` and native `loading="lazy"`.
* **Memoization**: `useCallback` and `React.memo` to prevent unnecessary renders.
* **Asset Optimization**: Compressed video files and icon SVGs.

---

## ♿ Accessibility

* Semantic HTML elements (`<section>`, `<button>`, `<h2>`, `<p>`).
* ARIA attributes for interactive controls (e.g., `aria-label`, `role="button"`).
* Keyboard navigation support and focus outlines.
* Color contrast tested against WCAG AA standards.

---

## ✨ Animations

* Powered by `framer-motion` for:

  * Smooth fade-in/fade-out of video clips.
  * Slide transitions between variant sections.
  * Conditional presence animations with `AnimatePresence`.

---

## 🧪 Testing (Optional)

*(No tests included in initial release)*

Suggested future testing approaches:

* **Unit Tests**: Jest + React Testing Library for component logic.
* **Integration Tests**: Cypress for end-to-end user flows (scroll interactions, video playback).

---

## 📚 Third-Party Libraries

* [`framer-motion`](https://www.framer.com/motion/) - UI animations
* [`next/image`](https://nextjs.org/docs/api-reference/next/image) - Optimized image handling
* [`tailwindcss`](https://tailwindcss.com/) - Utility-first styling

---

## ⚙️ Assumptions & Decisions

* Two initial variants: `passenger` and `commercial`, with room to extend via `evolveData`.
* Client-side rendering for immediate scroll and playback interactivity.
* Videos hosted in `/public/assets` for predictable caching.

---

## ⚠️ Challenges Faced

1. **Scroll Syncing**

   * *Issue*: Inconsistent trigger points for section visibility.
   * *Solution*: IntersectionObserver with `threshold: 0.6` ensured stable variant toggles.

2. **Video Synchronization**

   * *Issue*: Abrupt restarts when switching variants.
   * *Solution*: Explicit control via `ref.pause()`, `ref.currentTime = 0`, and `ref.play()`.

---

## 🔮 Future Improvements

* Keyboard & focus navigation enhancements.
* Asynchronous video loading with fallback/error states.
* Internationalization (i18n) support.
* Integration with a headless CMS for dynamic content.
* Comprehensive unit and E2E tests.
* Lazy loading for non-critical icons and sections.

---