import ExperimentList from "@/components/ExperimentList"
import { getExperiments } from "@/lib/experiments"

export default async function Home() {
  const experiments = await getExperiments()
  return <ExperimentList experiments={experiments} />
}
