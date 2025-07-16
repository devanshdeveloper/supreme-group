"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { evolveData } from "@/app/constants/evolveData";

type VariantKey = "passenger" | "commercial";

export default function EvolvingSection() {
  const [variant, setVariant] = useState<VariantKey>("passenger");
  const [iconIndex, setIconIdx] = useState(0);
  const [isPlaying, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const passengerRef = useRef<HTMLDivElement | null>(null);
  const commercialRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const onTime = () => {
    const v = videoRef.current;
    if (v && v.duration) {
      setProgress(v.currentTime / v.duration);
    }
  };

  const onEnded = () => {
    setProgress(1);
    setPlaying(false);
  };

  const attachVideo = useCallback((node: HTMLVideoElement | null) => {
    if (videoRef.current) {
      videoRef.current.removeEventListener("timeupdate", onTime);
      videoRef.current.removeEventListener("ended", onEnded);
    }
    if (node) {
      node.addEventListener("timeupdate", onTime);
      node.addEventListener("ended", onEnded);
    }
    videoRef.current = node;
  }, []);

  const restartAndPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    v.play();
    setPlaying(true);
    setProgress(0);
  };

  const activeVariant = evolveData[variant]; // ✅ safe access
  const activeClip =
    activeVariant?.icons?.[iconIndex]?.clip || activeVariant.video;

  useEffect(() => {
    setIconIdx(0);
    restartAndPlay();
  }, [variant]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.currentTime = 0;
    setProgress(0);
    if (isPlaying) v.play();
  }, [activeClip, isPlaying]);

  useEffect(() => {
    if (!hasScrolled) return;
    const root = scrollAreaRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (e.target === passengerRef.current) setVariant("passenger");
            if (e.target === commercialRef.current) setVariant("commercial");
          }
        });
      },
      { threshold: 0.6, root }
    );

    if (passengerRef.current) io.observe(passengerRef.current);
    if (commercialRef.current) io.observe(commercialRef.current);

    return () => io.disconnect();
  }, [hasScrolled]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.pause();
    } else {
      v.play();
    }
    setPlaying(!isPlaying);
  };

  const R = 24;
  const CIRC = 2 * Math.PI * R;

  return (
    <section className="relative min-h-screen bg-black text-white px-6 md:px-12 py-40 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl md:text-4xl lg:text-5xl font-light max-w-4xl mx-auto mb-32">
          Evolving the drive with
          <span className="font-semibold">360-degree</span>
          <br />
          comprehensive solutions
        </h2>

        <div className="flex flex-col md:flex-row gap-12">
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/3">
            <div
              ref={scrollAreaRef}
              className="max-h-screen overflow-y-auto pr-3"
              onScroll={() => setHasScrolled(true)}
            >
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-px bg-white/60" />
                {(["passenger", "commercial"] as VariantKey[]).map((key) => (
                  <div
                    key={key}
                    ref={key === "passenger" ? passengerRef : commercialRef}
                    className="pl-6 py-10 cursor-pointer select-none relative"
                    onClick={() => setVariant(key)}
                  >
                    {variant === key && (
                      <motion.div
                        layoutId="rail"
                        className="absolute left-0 top-0 h-full w-[3px] bg-white"
                      />
                    )}
                    <h3
                      className={`text-2xl md:text-3xl font-semibold ${
                        variant === key ? "text-white" : "text-white/30"
                      }`}
                    >
                      {evolveData[key].title}
                    </h3>
                    <p
                      className={`mt-3 max-w-xs text-md ${
                        variant === key ? "text-white" : "text-white/30"
                      }`}
                    >
                      {evolveData[key].desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-center md:w-2/3 w-full">
            <div className="h-[406px] w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.video
                  key={`${variant}-${iconIndex}`}
                  ref={attachVideo}
                  src={activeClip}
                  muted
                  playsInline
                  autoPlay
                  loop={false}
                  className="w-full max-w-2xl lg:max-w-3xl rounded-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45 }}
                />
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-10 flex-wrap justify-center">
              {activeVariant.icons.map((ic, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setIconIdx(i);
                    restartAndPlay();
                  }}
                  className={`flex flex-col items-center cursor-pointer ${
                    i === iconIndex ? "text-white" : "text-white/40"
                  }`}
                >
                  <Image
                    src={ic.src}
                    alt={ic.label}
                    width={64}
                    height={64}
                    className={i === iconIndex ? "opacity-100" : "opacity-40"}
                  />
                  <span className="text-xs mt-1">{ic.label}</span>
                </div>
              ))}

              <button
                onClick={togglePlay}
                className="relative w-14 h-14 flex items-center justify-center shrink-0"
              >
                <svg
                  width="56"
                  height="56"
                  className="absolute inset-0 rotate-[-90deg]"
                >
                  <circle
                    cx="28"
                    cy="28"
                    r={R}
                    stroke="white"
                    strokeOpacity="0.3"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r={R}
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={CIRC}
                    strokeDashoffset={CIRC * (1 - progress)}
                    style={{ transition: "stroke-dashoffset 0.1s linear" }}
                  />
                </svg>
                {isPlaying ? (
                  <div className="flex gap-1 z-10">
                    <span className="w-[5px] h-5 bg-white" />
                    <span className="w-[5px] h-5 bg-white" />
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[14px] border-t-[10px] border-b-[10px] border-l-white border-t-transparent border-b-transparent z-10" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
