"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const useHeroGSAP = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline();

      // Container animation
      tl.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      // Overlay fade in
      tl.fromTo(
        overlayRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Content container animation
      tl.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "+=0.1"
      );

      // Button animation - appears first
      tl.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        "+=0.1"
      );

      // Heading animation - comes after button
      tl.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "+=0.05"
      );

      // Paragraph animation - comes last
      tl.fromTo(
        paragraphRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "+=0.05"
      );

      // Wait for initial animations to complete before setting up hover effects
      tl.call(() => {
        // Heading hover effect using GSAP's built-in hover handling
        if (headingRef.current) {
          const headingHoverTl = gsap
            .timeline({ paused: true })
            .to(headingRef.current, {
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            });

          headingRef.current.addEventListener("mouseenter", () =>
            headingHoverTl.play()
          );
          headingRef.current.addEventListener("mouseleave", () =>
            headingHoverTl.reverse()
          );
        }

        // Button hover and tap effects
        if (buttonRef.current) {
          // Hover timeline
          const buttonHoverTl = gsap
            .timeline({ paused: true })
            .to(buttonRef.current, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });

          // Tap timeline
          const buttonTapTl = gsap
            .timeline({ paused: true })
            .to(buttonRef.current, {
              scale: 0.98,
              duration: 0.1,
              ease: "power2.out",
            })
            .to(buttonRef.current, {
              scale: 1.05,
              duration: 0.1,
              ease: "power2.out",
            });

          // Event listeners
          buttonRef.current.addEventListener("mouseenter", () => {
            if (!buttonTapTl.isActive()) {
              buttonHoverTl.play();
            }
          });

          buttonRef.current.addEventListener("mouseleave", () => {
            if (!buttonTapTl.isActive()) {
              buttonHoverTl.reverse();
            }
          });

          buttonRef.current.addEventListener("mousedown", () => {
            buttonHoverTl.pause();
            buttonTapTl.restart();
          });

          buttonRef.current.addEventListener("mouseup", () => {
            buttonTapTl.progress(1);
            if (buttonRef.current?.matches(":hover")) {
              buttonHoverTl.play();
            }
          });
        }
      });
    },
    { scope: containerRef }
  ); // Scope animations to the container

  // Return all refs for the component to use
  return {
    containerRef,
    overlayRef,
    contentRef,
    headingRef,
    paragraphRef,
    buttonRef,
  };
};
