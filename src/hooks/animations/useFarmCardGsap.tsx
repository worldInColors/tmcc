"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const useFarmCardGsap = (index: number) => {
  const [showRipple, setShowRipple] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  // Initial entrance animation
  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  // Hover animations
  useGSAP(() => {
    if (!cardRef.current || !imageRef.current || !contentRef.current) return;

    if (isHovered) {
      // Card hover animation
      gsap.to(cardRef.current, {
        scale: 1.02,
        y: -8,
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(20, 71, 153, 0.2)",
        duration: 0.2,
        ease: "power2.out",
      });

      // Image zoom
      gsap.to(imageRef.current, {
        scale: 1.04,
        duration: 0.3,
        ease: "power2.out",
      });

      // Content slide up
      gsap.to(contentRef.current, {
        y: -3,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      // Reset animations
      gsap.to(cardRef.current, {
        scale: 1,
        y: 0,
        boxShadow: "0 0 0 0 rgba(0,0,0,0)",
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(contentRef.current, {
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  // Ripple animation
  useGSAP(() => {
    if (!rippleRef.current || !showRipple) return;

    gsap.fromTo(
      rippleRef.current,
      {
        scale: 0,
        opacity: 0.3,
      },
      {
        scale: 1.5,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setShowRipple(false),
      }
    );
  }, [showRipple]);

  const handleClick = () => {
    setShowRipple(true);

    // Click animation
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.98,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    cardRef,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    imageRef,
    contentRef,
    showRipple,
    rippleRef,
  };
};
