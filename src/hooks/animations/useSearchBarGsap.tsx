"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";
export const useSearchBarGsap = () => {
  const [focused, setFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !iconRef.current) return;

      // Set initial states
      gsap.set(containerRef.current, {
        boxShadow: "0 0 0 1px rgba(107,114,128,0.2)",
        backgroundColor: "#313131",
      });
      gsap.set(iconRef.current, {
        scale: 1,
        color: "#6b7280",
      });

      // Animate based on focused state
      gsap.to(containerRef.current, {
        boxShadow: focused
          ? "0 0 0 2px rgba(59,130,246,0.5), 0 0 20px rgba(59,130,246,0.3)"
          : "0 0 0 1px rgba(107,114,128,0.2)",
        backgroundColor: focused ? "#363636" : "#313131",
        duration: 0.3,
        ease: "power1.out",
      });

      gsap.to(iconRef.current, {
        scale: focused ? 1.1 : 1,
        color: focused ? "#3b82f6" : "#6b7280",
        duration: 0.3,
        ease: "power1.out",
      });
    },
    { dependencies: [focused], scope: containerRef }
  );

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };
  return { containerRef, iconRef, handleFocus, handleBlur };
};
