"use client";
import { designsPath } from "@/paths";
import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url('/Hero.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        className="hero-overlay bg-opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-lg">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
            }}
            className="mb-5 text-4xl font-bold"
          >
            Welcome to the Minecraft Farm Archives
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.5,
            }}
            className="mb-8 text-lg leading-relaxed"
          >
            Discover the history and evolution of Minecraft farms, from simple
            designs to complex automated systems.
          </motion.p>

          <Link href={designsPath()}>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.8,
                scale: { delay: 0 },
              }}
              className="bg-card text-secondary-foreground shadow-lg h-12 rounded-lg px-8 hover:bg-card/80 transition-all duration-300 cursor-pointer font-medium text-base"
            >
              Explore the archive
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
