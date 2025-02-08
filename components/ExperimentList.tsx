"use client"

import { ExperimentCard } from "@/components/ExperimentCard"
import { Experiment } from "@/lib/experiments"
import { motion } from "motion/react"

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}
const AnimatedExperimentCard = motion(ExperimentCard)

export default function ExperimentList(props: { experiments: Experiment[] }) {
  const { experiments } = props

  return (
    <motion.div
      className="w-page grid gap-6 p-6 pt-20 md:grid-cols-2 lg:grid-cols-3"
      transition={{ staggerChildren: 0.1 }}
      // Setting these on the parent propagates them to the children, with a staggered delay
      initial="hidden"
      animate="visible"
    >
      {experiments.map((exp) => (
        <AnimatedExperimentCard
          key={exp.slug}
          whileHover={{ y: -5 }}
          variants={itemVariants}
          {...exp}
        />
      ))}
    </motion.div>
  )
}
