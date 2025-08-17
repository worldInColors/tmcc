"use client";
import { useFarmCardGsap } from "@/hooks/animations/useFarmCardGsap";
import Image from "next/image";

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

  const {
    cardRef,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    imageRef,
    contentRef,
    rippleRef,
  } = useFarmCardGsap(index);

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
      <div
        ref={rippleRef}
        className="absolute inset-0 bg-white/20 rounded-2xl pointer-events-none scale-0 invisible z-1"
      />
    </div>
  );
}

export { FarmCard };
