"use client"

import { atom, useSetAtom } from "jotai"
import { motion } from "motion/react"

const transition = {
  delay: 0.1,
  duration: 0.75,
  ease: [0.41, 0.15, 0.02, 1],
  // https://cubic-bezier.com/?#.41,.15,.02,1
}

export const hasBodyAnimated = atom(false)

const bodyVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.01,
      delayChildren: 0.75,
    },
  },
}

export function AnimatedBody(props: { children: React.ReactNode }) {
  const { children } = props
  const setHasBodyAnimated = useSetAtom(hasBodyAnimated)
  return (
    <motion.body
      className="relative flex min-h-dvh flex-col"
      variants={bodyVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 982 1146"
        initial={{ height: "calc(100% + 300px)" }}
        animate={{ height: 0 }}
        transition={transition}
        className="absolute w-full"
        preserveAspectRatio="none"
        onAnimationComplete={() => setHasBodyAnimated(true)}
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
