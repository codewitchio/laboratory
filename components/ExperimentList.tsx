"use client"

import { ExperimentCard } from "@/components/ExperimentCard"
import { Experiment } from "@/lib/experiments"
import { animated, useTransition } from "@react-spring/web"

const AnimatedExperimentCard = animated(ExperimentCard)

export default function ExperimentList(props: { experiments: Experiment[] }) {
  const { experiments } = props

  const transitions = useTransition(experiments, {
    from: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -50 },
    update: { opacity: 1, y: 0 },
    trail: 100,
  })

  return (
    <div className="grid grid-cols-1 gap-6 p-6 pt-20 md:grid-cols-2 lg:grid-cols-3">
      {transitions((style, exp) => (
        <AnimatedExperimentCard {...exp} key={exp.slug} style={style} />
      ))}
    </div>
  )
}
