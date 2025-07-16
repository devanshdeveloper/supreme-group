import { useCallback, useEffect, useRef, useState } from "react";

export const useVideoPlayer = (initialPlaying = true) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setPlaying] = useState(initialPlaying);
  const [progress, setProgress] = useState(0);

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

  return {
    videoRef,
    isPlaying,
    progress,
    attachVideo,
    restartAndPlay,
    togglePlay,
    setPlaying,
    setProgress,
  };
};