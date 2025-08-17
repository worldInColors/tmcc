"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const useFarmCardGsap = (index: number) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

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

  const handleClick = contextSafe(() => {
    if (!cardRef.current || !rippleRef.current) return;

    // Click animation
    gsap.to(cardRef.current, {
      scale: 0.98,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

    gsap.fromTo(
      rippleRef.current,
      {
        scale: 0,
        opacity: 0.5,
        transformOrigin: "center center",
        visibility: "visible",
      },
      {
        scale: 1.8,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Hide the ripple after animation completes
          gsap.set(rippleRef.current, { visibility: "hidden" });
        },
      }
    );
  });

  const handleMouseEnter = contextSafe(() => {
    if (!cardRef.current || !imageRef.current || !contentRef.current) return;

    const tl = gsap.timeline();

    tl.to(cardRef.current, {
      scale: 1.02,
      y: -8,
      duration: 0.2,
      ease: "power2.out",
      filter: "drop-shadow(0 20px 40px rgba(56, 56, 83, 0.3))",
    })
      // Image zoom
      .to(
        imageRef.current,
        {
          scale: 1.04,
          duration: 0.3,
          ease: "power2.out",
        },
        "<"
      )
      // Content slide up
      .to(
        contentRef.current,
        {
          y: -3,
          duration: 0.2,
          ease: "power2.out",
        },
        "<"
      );
  });

  const handleMouseLeave = contextSafe(() => {
    if (!cardRef.current || !imageRef.current || !contentRef.current) return;

    const tl = gsap.timeline();

    tl.to(cardRef.current, {
      scale: 1,
      y: 0,
      duration: 0.2,
      filter: "",
      ease: "power2.out",
    })
      .to(
        imageRef.current,
        {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contentRef.current,
        {
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        "<"
      );
  });

  return {
    cardRef,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    imageRef,
    contentRef,
    rippleRef,
  };
};
