"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const testRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

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

    // Test div animation
    tl.fromTo(
      testRef.current,
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
      "-=0.4"
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
    const setupHover = (element, hoverScale = 1.05, normalScale = 1) => {
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
        if (element) {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        }
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

  return (
    <div className="flex items-center justify-center px-4 py-4">
      <div
        ref={containerRef}
        className="w-full max-w-[1000px] min-h-[600px] gap-2 flex flex-col items-center justify-center bg-cover bg-center text-white rounded-lg"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)),
            url('/Hero.jpg')
          `,
        }}
      >
        <h1
          ref={headingRef}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl cursor-pointer text-center px-4 sm:px-0"
        >
          Welcome to the Minecraft Farm Archives
        </h1>

        <p
          ref={paragraphRef}
          className="text-sm sm:text-base lg:text-lg font-semibold text-center px-4 sm:px-0"
        >
          Discover the history and evolution of Minecraft farms, from simple
          designs to complex automated systems.
        </p>

        <Link href="/farms">
          <button
            ref={buttonRef}
            className="bg-card text-secondary-foreground shadow-xs h-10 rounded-md px-6 has-[>svg]:px-4 hover:bg-card/80 transition-colors duration-200 cursor-pointer"
          >
            Explore the archive
          </button>
        </Link>
      </div>
    </div>
  );
}
