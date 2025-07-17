interface IconMeta {
  src: string;
  label: string;
  clip?: string;
}
export type VariantKey = "passenger" | "commercial";
export const variants = ["passenger", "commercial"] as VariantKey[];

interface VariantMeta {
  title: string;
  desc: string;
  video: string;
  icons: IconMeta[];
}

const evolveData: Record<VariantKey, VariantMeta> = {
  passenger: {
    title: "Passenger vehicles",
    desc: "Revving up innovation from interior to exterior",
    video: "/car.mp4",
    icons: [
      { src: "/Cabin 1.svg", label: "Complete body", clip: "/Passenger Alpha.bc06b347f5b526ad9a60.mp4" },
      { src: "/front.svg", label: "Front", clip: "/Front.8f5fda304d3095ab6b02.mp4" },
      {
        src: "/car-cabin.png",
        label: "Cabin",
        clip: "/Cabin.3260d3e4f52b3804dae5.mp4",
      },
      { src: "/truck.svg", label: "Trunk", clip: "/Trunk.54bfaa734c0395172c08.mp4" },
      {
        src: "/exterior.svg",
        label: "Exterior",
        clip: "/Exterior.a127ebb308e655c7e32c.mp4",
      },
    ],
  },
  commercial: {
    title: "Commercial vehicles",
    desc: "Advancing engineering for heavy-duty vehicles",
    video: "/commercial.mp4",
    icons: [
      {
        src: "/",
        label: "Complete Body",
        clip: "/Commercial Alpha.92c92d40f9116c837d1d.mp4",
      },
      {
        src: "/commercial-engine.svg",
        label: "Engine",
        clip: "/Commercial-Engine.d8957f7c027ca396858e.mp4",
      },
      {
        src: "/commercial-cabin.svg",
        label: "Cabin",
        clip: "/Commercial-Cabin.69adf15a8021267cbe8c.mp4",
      },
    ],
  },
};

export { evolveData };
