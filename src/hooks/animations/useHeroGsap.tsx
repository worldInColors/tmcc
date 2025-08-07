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

  useGSAP(() => {
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

    // Heading animation
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
      "+=0.1"
    );

    // Paragraph animation
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

    // Button animation
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
      "+=0.05"
    );

    // Hover animations
    const setupHover = (
      element: HTMLElement | null,
      hoverScale = 1.05,
      normalScale = 1
    ) => {
      if (!element) return () => {};

      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: hoverScale,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: normalScale,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    // Button tap animation
    const handleMouseDown = () => {
      gsap.to(buttonRef.current, {
        scale: 0.98,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    // Setup hover effects
    const cleanupHeading = setupHover(headingRef.current, 1.02, 1);
    const cleanupButton = setupHover(buttonRef.current, 1.05, 1);

    // Setup button tap
    if (buttonRef.current) {
      buttonRef.current.addEventListener("mousedown", handleMouseDown);
      buttonRef.current.addEventListener("mouseup", handleMouseUp);
    }

    // Cleanup function
    return () => {
      cleanupHeading();
      cleanupButton();
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mousedown", handleMouseDown);
        buttonRef.current.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, []);

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
