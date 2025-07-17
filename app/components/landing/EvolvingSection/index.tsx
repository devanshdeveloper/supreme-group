"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { evolveData, variants } from "@/app/constants/evolveData";
import { useVideoPlayer } from "@/app/hooks/useVideoPlayer";
import { useTranslations } from "next-intl";
import gsap, { Power1 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
gsap.registerPlugin(ScrollTrigger);

type VariantKey = "passenger" | "commercial";

export default function EvolvingSection() {
  const t = useTranslations();
  const [variant, setVariant] = useState<VariantKey>("passenger");
  const [currentScrollController, setCurrentScrollController] =
    useState<null | ScrollTrigger>(null);
  const [iconIndex, setIconIdx] = useState(0);
  const { isPlaying, progress, attachVideo, restartAndPlay, togglePlay } =
    useVideoPlayer();

  const activeVariant = evolveData[variant];
  const activeClip =
    activeVariant.icons[iconIndex]?.clip || activeVariant.video;

  const onScroll = (update: number) => {
    if (!currentScrollController) return;
    currentScrollController?.scroll(
      currentScrollController.start +
        (update / 2) *
          (currentScrollController.end - currentScrollController.start)
    );
  };

  const handleChangeVariant = (key: VariantKey, index: number) => {
    setVariant(key);
    setIconIdx(0);
    restartAndPlay();
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isLargeDevice = window.innerWidth >= 1024;
    if (!isLargeDevice) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const animPhase1 = gsap.from(container, {});
      const newController = ScrollTrigger.create({
        animation: animPhase1,
        trigger: container,
        start: "top top",
        end: "bottom top",
      });

      const timelinePhase1 = gsap.timeline({ paused: true });

      timelinePhase1
        .from(".animated-heading", {
          y: "10vh",
          duration: 2,
          ease: Power1.easeInOut,
        })
        .addLabel("lbl-1", 4)
        .from(
          ".slider-parent",
          {
            y: "40vh",
            opacity: 0,
            duration: 2.5,
            ease: Power1.easeInOut,
          },
          0.5
        )
        .from(
          ".card-details-1",
          {
            y: "40vh",
            opacity: 0,
            duration: 2,
            ease: Power1.easeInOut,
          },
          0.7
        )
        .from(
          ".card-details-2",
          {
            y: "40vh",
            opacity: 0,
            duration: 2,
            ease: Power1.easeInOut,
          },
          0.8
        )
        .from(
          ".video-slide-1",
          {
            y: "50vh",
            opacity: 0,
            duration: 2,
            ease: Power1.easeInOut,
          },
          1.1
        )
        .from(
          ".controls-slide-1",
          {
            y: 50,
            opacity: 0,
            duration: 2,
            ease: Power1.easeInOut,
          },
          2
        )
        .from(
          ".video-control-1",
          {
            y: 100,
            opacity: 0,
            duration: 2,
            ease: Power1.easeInOut,
          },
          2
        )
        .to(
          ".video-slide-1",
          {
            y: 0,
            duration: 2,
            ease: Power1.easeInOut,
          },
          4.1
        )
        .to(
          ".video-slide-1",
          {
            y: -100,
            opacity: 0,
            scale: 0.5,
            duration: 3,
            ease: Power1.easeInOut,
          },
          5.5
        )
        .to(
          ".controls-slide-1",
          {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: Power1.easeInOut,
          },
          6
        )
        .addLabel("lbl-2", 12)
        .to(
          ".video-slide-2",
          {
            top: -20,
            opacity: 1,
            scale: 1,
            duration: 4,
            ease: Power1.easeInOut,
          },
          6.1
        )
        .to(
          ".card-details-1",
          {
            opacity: 0.2,
            duration: 2,
            ease: Power1.easeInOut,
          },
          6.5
        )
        .to(
          ".slider-height",
          {
            y: "100%",
            duration: 2,
            ease: Power1.easeInOut,
          },
          6.5
        )
        .to(
          ".card-details-2",
          {
            opacity: 1,
            duration: 2,
            ease: Power1.easeInOut,
          },
          6.5
        )
        .to(
          ".video-slide-2",
          {
            opacity: 1,
            duration: 5,
            ease: Power1.easeInOut,
          },
          8
        )
        .from(
          ".controls-slide-2",
          {
            y: 50,
            delay: 0.8,
            opacity: 0,
            duration: 1,
            ease: Power1.easeInOut,
          },
          8.2
        );

      const controller = ScrollTrigger.create({
        animation: timelinePhase1,
        trigger: container,
        start: "top top",
        end: "bottom -100%",
        scrub: 3,
        pin: true,
        snap: {
          snapTo: "labelsDirectional",
          delay: 0,
          duration: 1,
          ease: Power1.easeInOut,
        },
      });
      setCurrentScrollController(controller);
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [variant, activeVariant.icons]);

  const R = 24;
  const CIRC = 2 * Math.PI * R;

  const onVariantChange = (swiper: any) => {
    const idx = swiper.activeIndex;
    const key = variants[idx] as VariantKey;
    handleChangeVariant(key, 2);
  };

  return (
    <>
      <div className="block md:hidden relative min-h-screen bg-black text-white px-6 md:px-12 py-40 overflow-hidden">
        <h2 className="animated-heading text-center text-2xl md:text-4xl lg:text-5xl font-light max-w-4xl mx-auto mb-32">
          {t("Evolving the drive with")}{" "}
          <span className="font-semibold">{t("360-degree")}.</span>
          <br />
          {t("comprehensive solutions")}
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          pagination={{
            clickable: true,
          }}
          speed={600}
          spaceBetween={20}
          className="cursor-grab my-4"
        >
          {activeVariant.icons.map((item) => {
            return (
              <SwiperSlide
                key={item.label}
                className="pb-16 flex flex-col justify-end"
              >
                <div className="text-white flex flex-col justify-between text-center">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover mb-8 mt-10"
                  >
                    <source src={item.clip} />
                  </video>

                  <span className="font-semibold">{item.label}</span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <section
        ref={containerRef}
        className="hidden md:block relative min-h-screen bg-black text-white px-6 md:px-12 py-40 overflow-hidden"
      >
        <div className="container mx-auto">
          <h2 className="animated-heading text-center text-2xl md:text-4xl lg:text-5xl font-light max-w-4xl mx-auto mb-32">
            {t("Evolving the drive with")}{" "}
            <span className="font-semibold">{t("360-degree")}.</span>
            <br />
            {t("comprehensive solutions")}
          </h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <div className="max-h-screen pr-3">
                <div className="relative">
                  <div className="absolute left-0 top-0 h-full w-px bg-white/60" />
                  <div className="slider-parent absolute left-0 h-full w-[2px] rounded-md bg-gray top-0 ">
                    <div className="slider-height h-[50%] w-[2px] bg-white rounded-md" />
                  </div>
                  {variants.map((key, index) => (
                    <div
                      key={key}
                      className={`card-details-${
                        index + 1
                      } pl-6 py-10 cursor-pointer select-none relative`}
                      onClick={() => handleChangeVariant(key, index)}
                    >
                      <h3
                        className={`text-2xl md:text-3xl font-semibold ${
                          variant === key ? "text-white" : "text-white/30"
                        }`}
                      >
                        {t(evolveData[key].title)}
                      </h3>
                      <p
                        className={`mt-3 max-w-xs text-md ${
                          variant === key ? "text-white" : "text-white/30"
                        }`}
                      >
                        {t(evolveData[key].desc)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`flex flex-col items-center md:w-2/3 w-full`}>
              <div
                className={`video-slide-${
                  iconIndex + 1
                } h-[406px] w-full flex items-center justify-center`}
              >
                <video
                  key={`${variant}-${iconIndex}`}
                  ref={attachVideo}
                  src={activeClip}
                  muted
                  playsInline
                  autoPlay
                  loop={false}
                  className="evolving-video w-full max-w-2xl lg:max-w-3xl rounded-md"
                />
              </div>
              <div
                className={`controls-slide-${
                  iconIndex + 1
                } mt-10 flex items-center gap-10 flex-wrap justify-center`}
              >
                {activeVariant.icons.map((ic, i) => (
                  <div
                    id={`icon-${i}`}
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
                    <span className="text-xs mt-1">{t(ic.label)}</span>
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
    </>
  );
}
