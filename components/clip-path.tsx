import React, { useRef } from 'react';
import { useMotionValue, useTransform, motion, useSpring } from 'motion/react';

export const ClipPathCircle = () => {
  return <div className="size-64 circle bg-yellow-500" />;
};

export const ComparisonSlider = () => {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (containerRef.current === null) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    x.set(mouseX);
  };

  const springX = useSpring(x, { stiffness: 50, damping: 10 });
  const clipPath = useTransform(
    springX,
    (latest) => `inset(0% 0% 0% ${latest * 100}%)`
  );
  const left = useTransform(springX, (latest) => `${latest * 100}%`);

  return (
    <div
      onMouseMove={onMouseMove}
      ref={containerRef}
      className="relative aspect-video w-164"
    >
      <motion.span
        className="w-1 h-full bg-linear-to-b from-indigo-500 via-pink-500 to-red-400 absolute z-20"
        style={{ left }}
      />
      <motion.img
        src="./spider-two.png"
        className="w-full z-10 absolute top-0 left-0"
        style={{
          clipPath,
        }}
      />
      <img src="./spider-one.jpeg" className="w-full absolute top-0 left-0" />
    </div>
  );
};
