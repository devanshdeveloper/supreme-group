"use client";

import { useTranslations } from "next-intl";
import Navbar from "../layout/Navbar";

export default function HeroSection() {
  const t = useTranslations();
    
  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/automotive.224e7418884105595114.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/60"></div>

    

      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-0rem)] px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4">
          {t("Performance in motion")}
        </p>

        <h1 className="font-semibold">
          <span className="block text-3xl sm:text-5xl md:text-[48px] lg:text-[48px]">
          {t("Soft Trims and NVH Solutions")}
            
          </span>
          <span className="block font-extralight text-3xl sm:text-5xl md:text-48px lg:text-[48px]">
            {t("for seamless rides")}
          </span>
        </h1>
      </div>
    </section>
  );
}
