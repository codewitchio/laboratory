"use client"

import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import React, { useState } from "react"

// Heavily based on https://motion.dev/docs/react-animate-presence
// and https://codesandbox.io/p/sandbox/framer-motion-image-gallery-pqvx3?file=/src/Example.tsx:54,40-54,46&from-embed

export default function Slideshow() {
  // TODO: Disable buttons if there are no more slides in that direction
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    // Full-screen wrapper
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Absolute container for buttons to switch slides */}
      <div className="absolute bottom-4 z-10 mx-auto flex-center w-full gap-2">
        <button
          className="btn btn-circle border-transparent bg-base-100 hover:bg-base-200"
          onClick={() => setCurrentSlide(currentSlide - 1)}
        >
          <Image
            src="icons/arrow-small-left.svg"
            alt="Back"
            width={24}
            height={24}
            priority
          />
        </button>
        <button
          className="btn btn-circle border-transparent bg-base-100 hover:bg-base-200"
          onClick={() => setCurrentSlide(currentSlide + 1)}
        >
          <Image
            src="icons/arrow-small-left.svg"
            alt="Next"
            width={24}
            height={24}
            priority
            className="rotate-180"
          />
        </button>
      </div>
      {/* Slides */}
      <AnimatePresence initial={false}>{slides[currentSlide]}</AnimatePresence>
    </motion.div>
  )
}

const slideVariants = {
  enter: { x: "100%" },
  center: { x: 0 },
  exit: { x: "-100%" },
}

// TODO: Add drag gestures
function Slide(props: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      {...props}
      variants={slideVariants}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute flex-center size-full"
    >
      {/* Page indicator */}
      <span className="absolute right-4 bottom-4 text-sm font-bold">01</span>
      {props.children as React.ReactNode}
    </motion.div>
  )
}

// TODO: Stagger text and stuff on the slideshow page.

// TODO: I don't like this solution
const slides = [
  <Slide key="1" style={{ backgroundColor: "red" }}>
    <h1>Hanna</h1>
    <h1>Kjellén</h1>
    <h1>codewitch</h1>
  </Slide>,
  <Slide key="2" style={{ backgroundColor: "blue" }}>
    <h1>test</h1>
  </Slide>,
]
