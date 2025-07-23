"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface HamburgerButtonProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface MobileMenuSidebarProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}
interface MobileOverlayProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav className="flex p-4 pt-1 pb-1 pl-0 bg-card border-b border-border items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-bold text-2xl transition-colors duration-300 hover:text-muted-foreground"
        >
          <Image src="/archive_logo.webp" width={250} height={83} alt="Logo" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-4">
        <NavLink href="/farms">Explore</NavLink>
        <NavLink href="/farms">FAQ</NavLink>
        <NavLink href="/farms">About</NavLink>
        <JoinDiscord />
      </div>

      <HamburgerButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Mobile Menu Overlay */}
      <MobileOverlay isMenuOpen={isMenuOpen} closeMenu={closeMenu} />

      {/* Mobile Menu Sidebar */}
      <MobileMenuSidebar isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </nav>
  );
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-md font-semibold transition-colors duration-300 hover:text-muted-foreground"
    >
      {children}
    </Link>
  );
};
const MobileOverlay = ({ isMenuOpen, closeMenu }: MobileOverlayProps) => {
  return (
    <div
      className={`sm:hidden fixed inset-0 backdrop-blur-sm bg-background/20 z-30 transition-all duration-300 ${
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={closeMenu}
    ></div>
  );
};
const HamburgerButton = ({
  isMenuOpen,
  setIsMenuOpen,
}: HamburgerButtonProps) => {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <button
      className="sm:hidden z-50 relative flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <span
        className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
          isMenuOpen ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
          isMenuOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </button>
  );
};
const MobileMenuSidebar = ({
  isMenuOpen,
  closeMenu,
}: MobileMenuSidebarProps) => {
  return (
    <div
      className={`sm:hidden fixed top-0 right-0 h-full w-60 max-w-[80vw] bg-card z-40 transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } shadow-2xl border-l border-border`}
    >
      <div className="flex flex-col pt-20 space-y-6">
        <div
          onClick={closeMenu}
          className="hover:bg-muted/50 transition-all duration-300 px-6 py-2 cursor-pointer"
        >
          <NavLink href="/farms">Explore</NavLink>
        </div>
        <div
          onClick={closeMenu}
          className="hover:bg-muted/50 transition-all duration-300 px-6 py-2 cursor-pointer"
        >
          <NavLink href="/farms">FAQ</NavLink>
        </div>
        <div
          onClick={closeMenu}
          className="hover:bg-muted/50 transition-all duration-300 px-6 py-2 cursor-pointer"
        >
          <NavLink href="/farms">About</NavLink>
        </div>
        <div onClick={closeMenu} className="px-6 py-2">
          <JoinDiscord />
        </div>
      </div>
    </div>
  );
};
const JoinDiscord = () => {
  return (
    <button className="bg-[#4752c4] flex items-center p-3 gap-2 rounded-2xl cursor-pointer transition-colors duration-300 hover:bg-[#39429d]">
      <DiscordIcon />
      <span>Join Discord Server</span>
    </button>
  );
};

const DiscordIcon = () => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 -28.5 256 256"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <g>
          <path
            d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
            fill="#ffffff"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
};

export default Header;
