"use client"

import { motion } from "motion/react"

const transition = {
  duration: 1,
  ease: "circOut",
}

export function AnimatedBody(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <motion.body
      className="relative flex min-h-dvh flex-col"
      transition={{ delayChildren: 1 }}
      // TODO: Fix delayChildren, not sure why this doesn't do anything.
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 982 1146"
        initial={{ height: "calc(100% + 30%)" }}
        animate={{ height: 0 }}
        transition={transition}
        className="absolute w-full"
        preserveAspectRatio="none"
      >
        {/* To tweak the curve, update the Q values in the path */}
        <path
          d="M 0 0 L 982 0 L 982 1146 Q 491 750 0 1146 L 0 0"
          className="fill-neutral"
        />
      </motion.svg>
      {children}
    </motion.body>
  )
}
