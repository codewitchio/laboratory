import { getExperiments } from "@/lib/experiments"
import Link from "next/link"

export default async function Home() {
  const experiments = await getExperiments()

  return (
    <div className="grid grid-cols-1 gap-6 p-6 pt-20 md:grid-cols-2 lg:grid-cols-3">
      {experiments.map((exp) => (
        // <ExperimentCard key={exp.slug} {...exp} />
        <Link key={exp.slug} href={`/${exp.slug}`}>
          {exp.title}
        </Link>
      ))}
    </div>
  )
}
