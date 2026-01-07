"use client";

import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";

const FRAME_COUNT = 40; // Total frames in the sequence

export default function HeadphoneScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0-1 scroll progress to 1-40 frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  // Transform values for text overlays
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const precisionOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.3, 0.45, 0.5],
    [0, 1, 1, 0]
  );
  const titaniumOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.6, 0.75, 0.8],
    [0, 1, 1, 0]
  );
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/images/sequence/frame-${i}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setIsLoading(false);
          // Draw initial frame
          setTimeout(() => renderFrame(1), 100);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        loadedCount++; // Still increment to avoid stuck loading
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgIndex = Math.min(
      Math.max(Math.round(index) - 1, 0),
      FRAME_COUNT - 1
    );
    const img = images[imgIndex];
    if (!img) return;

    // Responsive scaling (contain)
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;

    // Clear canvas with background color to ensure seamless blending
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, cw, ch);

    const ratio = Math.min(cw / iw, ch / ih);
    const nw = iw * ratio;
    const nh = ih * ratio;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.drawImage(img, nx, ny, nw, nh);
  };

  // Handle scroll updates
  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(latest);
    setCurrentFrame(Math.round(latest));
  });

  // Update canvas size on resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        renderFrame(frameIndex.get());
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh] bg-[#050505] selection:bg-white/20"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#050505]">
            <div className="w-16 h-16 border-2 border-white/10 border-t-white rounded-full animate-spin mb-4" />
            <p className="text-white/40 text-sm tracking-widest uppercase">
              Initializing Sound
            </p>
          </div>
        )}

        <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none px-10 md:px-20">
          {/* 0% - AIOVA. Pure Sound. */}
          <motion.div
            style={{ opacity: titleOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
              AIOVA
            </h1>
            <p className="text-xl md:text-2xl text-white/60 mt-4 tracking-wide font-light">
              PURE SOUND.
            </p>
          </motion.div>

          {/* 30% - Precision Engineering. */}
          <motion.div
            style={{ opacity: precisionOpacity }}
            className="absolute inset-y-0 left-10 md:left-20 flex flex-col justify-center max-w-md"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              PRECISION
              <br />
              ENGINEERING.
            </h2>
            <p className="text-lg text-white/60 mt-6 leading-relaxed">
              Every curve, every component, crafted for acoustic perfection.
            </p>
          </motion.div>

          {/* 60% - Titanium Drivers. */}
          <motion.div
            style={{ opacity: titaniumOpacity }}
            className="absolute inset-y-0 right-10 md:right-20 flex flex-col justify-center text-right max-w-md items-end"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              TITANIUM
              <br />
              DRIVERS.
            </h2>
            <p className="text-lg text-white/60 mt-6 leading-relaxed">
              Lightweight strength for unparalleled dynamic range and clarity.
            </p>
          </motion.div>

          {/* 90% - Hear Everything. */}
          <motion.div
            style={{ opacity: ctaOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
              HEAR EVERYTHING.
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-black font-semibold rounded-full text-lg tracking-tight pointer-events-auto shadow-2xl shadow-white/10"
            >
              Experience Zenith
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="w-px h-12 bg-linear-to-b from-transparent to-white/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Scroll
          </span>
        </motion.div>
      </div>
    </div>
  );
}
