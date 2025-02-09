import { readdir } from "fs/promises"
import path from "path"

export type ExperimentMetadata = {
  title: string
  description: string
  date: Date
  image?: string // Path to preview image
  tags?: Tag[]
}
export type Experiment = ExperimentMetadata & {
  slug: string
}

export const getExperiments = async (): Promise<Experiment[]> => {
  const experimentsDir = path.join(process.cwd(), "experiments")
  const slugs = await readdir(experimentsDir)

  const experiments: Experiment[] = await Promise.all(
    slugs.map(async (slug) => {
      const config = await import(`@/experiments/${slug}/metadata`)
      return { ...config.default, slug }
    })
  )

  // Sort experiments by date descending
  const sortedExperiments = experiments.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  )

  return sortedExperiments
}

export type Tag = "Material" | "Animation" | "Interactive"
