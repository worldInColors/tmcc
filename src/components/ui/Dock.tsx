"use client";
import { designsPath } from "@/paths";
import { Factory, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
function Dock() {
  const pathname = usePathname();
  return (
    <div className="md:hidden dock dock-lg bg-card">
      {/* Home */}
      <Link
        href="/"
        className={`dock-item ${pathname === "/" ? "dock-active" : ""}`}
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
            <polyline
              points="1 11 12 2 23 11"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></polyline>
            <path
              d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
              fill="none"
              stroke="currentColor"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></path>
            <line
              x1="12"
              y1="22"
              x2="12"
              y2="18"
              fill="none"
              stroke="currentColor"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></line>
          </g>
        </svg>
        <span className="dock-label">Home</span>
      </Link>

      {/* Farms */}
      <Link
        href={designsPath()}
        className={`dock-item ${
          pathname === designsPath() ? "dock-active" : ""
        }`}
      >
        <Factory className="w-5 h-5" />
        <span className="dock-label">Designs</span>
      </Link>

      {/* Settings */}
      <button
        className="dock-item "
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_4"
          ) as HTMLDialogElement | null;
          modal?.showModal();
        }}
      >
        <Search className="w-5 h-5" />
        <span className="dock-label">Search</span>
      </button>
    </div>
  );
}

export default Dock;
