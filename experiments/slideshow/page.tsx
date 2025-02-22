"use client"

import { motion } from "motion/react"

export default function Slideshow() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-neutral"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-8xl font-bold text-neutral-content">Hanna</h1>
        <h1 className="text-8xl font-bold text-neutral-content">Kjellén</h1>
        <h1 className="text-8xl font-bold text-neutral-content">codewitch</h1>
      </div>
    </motion.div>
  )
}

// TODO: Create a list of pages
// TODO: Use AnimatePresence to animate pages in and out, sliding to the side.
// TODO: Stagger text and stuff on the slideshow page.
