import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex items-center justify-center relative mb-8">
      <motion.div
        className="bg-gradient-to-r from-cyan-200 to-cyan-400 size-[160px] rounded-xl"
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["20%", "0%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      <h1
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      font-bold text-black select-none"
      >
        Loading...
      </h1>
    </div>
  );
}
