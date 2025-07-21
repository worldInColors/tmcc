"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center px-4 py-4 ">
      <motion.div
        className="w-full max-w-[1000px] min-h-[600px] gap-2 flex flex-col items-center justify-center bg-cover bg-center text-white rounded-lg h"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)),
            url('/Hero.jpg')
          `,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: "easeOut",
          }}
          whileHover={{ scale: 1.02 }}
        >
          Welcome to the Minecraft Farm Archives
        </motion.h1>

        <motion.p
          className="text-lg font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          Discover the history and evolution of Minecraft farms, from simple
          designs to complex automated systems.
        </motion.p>
        <Link href="/farms">
          <motion.button
            className="bg-card text-secondary-foreground shadow-xs h-10 rounded-md px-6 has-[>svg]:px-4 hover:bg-card/80 transition-colors duration-200 cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.2,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore the archive
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
