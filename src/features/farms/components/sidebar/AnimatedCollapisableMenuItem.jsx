"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
// Custom animated collapsible menu item
const AnimatedCollapsibleMenuItem = ({
  category,
  isDefaultOpen = false,
  activeSubCategory = null,
}) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const submenuRef = useRef(null);
  const chevronRef = useRef(null);
  const subItemsRef = useRef([]);
  const timelineRef = useRef(null);

  const formatName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useGSAP(() => {
    const submenu = submenuRef.current;
    const chevron = chevronRef.current;
    const subItems = subItemsRef.current.filter(Boolean);

    if (!submenu || !chevron) return;

    // Kill any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    gsap.killTweensOf(chevron);

    // Create new timeline
    timelineRef.current = gsap.timeline();

    if (isOpen) {
      // Opening animation
      gsap.set(submenu, {
        display: "block",
        height: "auto",
      });

      const naturalHeight = submenu.scrollHeight;
      gsap.set(submenu, { height: 0 });

      timelineRef.current
        .to(submenu, {
          height: naturalHeight,
          duration: 0.12,
          ease: "power2.out",
        })
        .to(
          chevron,
          {
            rotation: 180,
            duration: 0.12,
            ease: "power2.out",
          },
          0
        )
        .fromTo(
          subItems,
          {
            opacity: 0,
            y: -10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            stagger: 0.05,
            ease: "power1.out",
          },
          "-=0.12"
        );
    } else {
      // Closing animation
      timelineRef.current
        .to(subItems, {
          opacity: 0,
          y: -5,
          duration: 0.08,
          stagger: 0.02,
          ease: "power1.in",
        })
        .to(
          chevron,
          {
            rotation: 0,
            duration: 0.1,
            ease: "power2.in",
          },
          0
        )
        .to(
          submenu,
          {
            height: 0,
            duration: 0.1,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(submenu, { display: "none" });
            },
          },
          "-=0.06"
        );
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (chevron) {
        gsap.killTweensOf(chevron);
      }
    };
  }, [isOpen]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const setSubItemRef = useCallback((el, index) => {
    if (el) {
      subItemsRef.current[index] = el;
    }
  }, []);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={toggleOpen}
        className="w-full justify-between"
      >
        <span>{category.name}</span>
        <ChevronDown ref={chevronRef} className="h-4 w-4 shrink-0" />
      </SidebarMenuButton>

      <div
        ref={submenuRef}
        className="ml-4 border-l-2 border-sidebar-border pl-3 overflow-hidden"
        style={{ display: "none" }}
      >
        <div className="space-y-1 py-2">
          {category.subCategories.map((subCategory, index) => (
            <a
              key={subCategory}
              href={`/farms/${subCategory}`}
              ref={(el) => setSubItemRef(el, index)}
              className={`block rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                activeSubCategory === subCategory
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70"
              }`}
            >
              {formatName(subCategory)}
            </a>
          ))}
        </div>
      </div>
    </SidebarMenuItem>
  );
};
export { AnimatedCollapsibleMenuItem };
