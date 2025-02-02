import ExperimentCard from "@/components/ExperimentCard"
import { getExperiments } from "@/lib/experiments"

export default async function Home() {
  const experiments = await getExperiments()

  return (
    <div className="grid grid-cols-1 gap-6 p-6 pt-20 md:grid-cols-2 lg:grid-cols-3">
      {experiments.map((exp) => (
        <ExperimentCard key={exp.slug} {...exp} />
      ))}
    </div>
  )
}
