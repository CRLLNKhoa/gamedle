"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const MAGNIFIER_SIZE = 100;
const ZOOM_LEVEL = 2.5;

export default function ImageEffect(_props: { src: string; hint: string }) {
  // State variables
  const [zoomable, setZoomable] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  });
  const handleMouseEnter = (e: MouseEvent) => {
    let element = e.currentTarget;
    let { width, height } = element.getBoundingClientRect();
    setImageSize({ width, height });
    setZoomable(true);
    updatePosition(e);
  };
  const handleMouseLeave = (e: MouseEvent) => {
    setZoomable(false);
    updatePosition(e);
  };
  const handleMouseMove = (e: MouseEvent) => {
    updatePosition(e);
  };
  const updatePosition = (e: MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - left;
    let y = e.clientY - top;
    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    });
  };
  return (
    <motion.div
      key={_props.src}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex justify-center items-center w-full rounded-lg overflow-hidden">
        <div
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          className="w-full h-[280px] relative overflow-hidden"
        >
          {_props.hint !== "" && (
            <span className="absolute top-0 left-0 z-20 bg-black/20 py-1 px-2 rounded-ee-lg text-white text-sm">
              {_props.hint}
            </span>
          )}
          <Image
            className="object-cover border z-10"
            alt=""
            src={_props.src}
            fill
          />
          <div
            style={{
              backgroundPosition: `${position.x}px ${position.y}px`,
              backgroundImage: `url(${_props.src})`,
              backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${
                imageSize.height * ZOOM_LEVEL
              }px`,
              backgroundRepeat: "no-repeat",
              display: zoomable ? "block" : "none",
              top: `${position.mouseY}px`,
              left: `${position.mouseX}px`,
              width: `${MAGNIFIER_SIZE}px`,
              height: `${MAGNIFIER_SIZE}px`,
            }}
            className={`z-50 border-2 border-white rounded-full pointer-events-none absolute `}
          />
        </div>
      </div>
    </motion.div>
  );
}
