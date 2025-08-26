"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
const AnimatedCollapsibleMenuItem = ({
  category,
  isDefaultOpen = false,
  activeSubCategory = null,
}) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const formatName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={toggleOpen}
        className="w-full justify-between"
      >
        <span>{category.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          <ChevronDown className="h-4 w-4 shrink-0" />
        </motion.div>
      </SidebarMenuButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="ml-4 border-l-2 border-sidebar-border pl-3 overflow-hidden"
          >
            <motion.div
              className="space-y-1 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              {category.subCategories.map((subCategory, index) => (
                <motion.div
                  key={subCategory}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{
                    duration: 0.1,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={`/designs/${subCategory}`}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      activeSubCategory === subCategory
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70"
                    }`}
                  >
                    {formatName(subCategory)}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarMenuItem>
  );
};
export { AnimatedCollapsibleMenuItem };
