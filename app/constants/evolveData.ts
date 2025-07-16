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
    desc: "Revving up innovation from interior to exterior.",
    video: "/car.mp4",
    icons: [
      { src: "/car-body.png", label: "Complete body", clip: "/car.mp4" },
      { src: "/car-front.png", label: "Front", clip: "/car-front.mp4" },
      { src: "/car-cabin.png", label: "Cabin", clip: "/car-cabin.mp4" },
      { src: "/car-trunk.png", label: "Trunk", clip: "/car-trunk.mp4" },
      {
        src: "/car-exterior.png",
        label: "Exterior",
        clip: "/car-exterior.mp4",
      },
    ],
  },
  commercial: {
    title: "Commercial vehicles",
    desc: "Advancing engineering for heavy‑duty vehicles.",
    video: "/commercial.mp4",
    icons: [
      {
        src: "/commercial-body.svg",
        label: "Complete Body",
        clip: "/commercial.mp4",
      },
      {
        src: "/commercial-engine.svg",
        label: "Engine",
        clip: "/commercial-engine.mp4",
      },
      {
        src: "/commercial-cabin.svg",
        label: "Cabin",
        clip: "/commercial-cabin.mp4",
      },
    ],
  },
};

export { evolveData };
