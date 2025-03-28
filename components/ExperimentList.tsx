"use client"

import { hasBodyAnimated } from "@/components/AnimatedBody"
import { ExperimentCard } from "@/components/ExperimentCard"
import { Experiment } from "@/lib/experiments"
import { useAtomValue } from "jotai"
import { motion } from "motion/react"

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}
const AnimatedExperimentCard = motion.create(ExperimentCard)

export default function ExperimentList(props: { experiments: Experiment[] }) {
  const { experiments } = props

  const shouldDelay = !useAtomValue(hasBodyAnimated)

  return (
    <motion.div
      className="w-page grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      transition={{
        staggerChildren: 0.2,
        delayChildren: shouldDelay ? 0.5 : 0,
      }}
      // Setting these on the parent propagates them to the children, with a staggered delay
      initial="hidden"
      animate="visible"
    >
      {experiments.map((exp) => (
        <AnimatedExperimentCard
          key={exp.slug}
          whileHover={{ y: -5 }}
          variants={itemVariants}
          style={{ opacity: 0 }}
          {...exp}
        />
      ))}
    </motion.div>
  )
}
