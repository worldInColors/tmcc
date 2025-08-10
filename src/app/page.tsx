"use client";

import { useHeroGSAP } from "@/hooks/animations/useHeroGsap";
import { designsPath } from "@/paths";
import Link from "next/link";

export default function Home() {
  const {
    containerRef,
    overlayRef,
    contentRef,
    headingRef,
    paragraphRef,
    buttonRef,
  } = useHeroGSAP();
  return (
    <div
      ref={containerRef}
      className="hero min-h-screen"
      style={{
        backgroundImage: `url('/Hero.jpg')`,
      }}
    >
      <div ref={overlayRef} className="hero-overlay bg-opacity-60"></div>
      <div
        ref={contentRef}
        className="hero-content text-neutral-content text-center"
      >
        <div className="max-w-lg">
          <h1
            ref={headingRef}
            className="mb-5 text-4xl font-bold cursor-pointer"
          >
            Welcome to the Mineycraft Farm Archives
          </h1>
          <p ref={paragraphRef} className="mb-5">
            Discover the history and evolution of Minecraft farms, from simple
            designs to complex automated systems.
          </p>
          <Link href={designsPath()}>
            <button
              ref={buttonRef}
              className="bg-card text-secondary-foreground shadow-xs h-10 rounded-md px-6 has-[>svg]:px-4 hover:bg-card/80 transition-colors duration-200 cursor-pointer"
            >
              Explore the archive
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
