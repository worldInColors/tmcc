"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface Farm {
  farmName: string;
  rates: string;
  credits: string;
  version: string;
}

interface FarmCardProps {
  farm: Farm;
  index?: number;
}

function FarmCard({ farm, index = 0 }: FarmCardProps) {
  const { farmName, rates, credits, version } = farm;
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

  return (
    <div
      ref={cardRef}
      className="bg-[#313131] overflow-hidden rounded-2xl flex flex-col cursor-pointer relative"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full overflow-hidden">
        <div ref={imageRef}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZBB0G93NEBoO7C_aIdsiD_BmsL7tVvCSXOFfmi_jO9c0HeTBkzvYVchwvZUKUF6t52veEbPhdJyMIMOhoXRScV_VIyT97ewv2sy387hGDJQJ1-Fv9rlMmnhB3hJDmYvzco6HfgolfS_XV8uZpWcQ1fut8NPFVp_kVUJRZ2QLiHDCd28xdKyWlERJxDd3us9yLgzTcrsCqw3fa-RFX93wORasovWB8C58JkyV_WK5FhlC9pUez2-yxNalXHfBztBPkpXRdidIYBx8l"
            alt={`${farmName} farm image`}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div ref={contentRef} className="py-3 px-4">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-xl font-semibold text-white">{farmName}</h2>
          <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-full">
            {version}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-2 font-medium">{rates}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">by {credits}</span>
        </div>
      </div>

      {/* Ripple effect on click */}
      {showRipple && (
        <div
          ref={rippleRef}
          className="absolute inset-0 bg-white rounded-2xl pointer-events-none"
        />
      )}
    </div>
  );
}

export default FarmCard;
