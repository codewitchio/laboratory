import LoadingIndicator from "@/components/LoadingIndicator"
import { getExperiments } from "@/lib/experiments"
import { buildPageTitle } from "@/lib/metadata"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

type Params = Promise<{ experiment: string }>

export async function generateStaticParams() {
  const experiments = await getExperiments()
  return experiments.map((exp) => ({ experiment: exp.slug }))
}

//  Set metadata
export async function generateMetadata({ params }: { params: Params }) {
  const { experiment: experimentSlug } = await params
  const experiments = await getExperiments()
  const experiment = experiments.find((exp) => exp.slug === experimentSlug)
  if (!experiment) {
    return notFound()
  }
  return {
    title: buildPageTitle(experiment.title),
    description: experiment.description,
  }
}

export default async function ExperimentPage(props: { params: Params }) {
  const { experiment } = await props.params
  const ExperimentComponent = dynamic(
    () => import(`@/experiments/${experiment}/page`),
    // TODO: Revamp experiments system to actually use page router and only fetch metadata like this
    // () => import(`@/experiments/${experiment}/page`).then((module) => module.metadata),
    {
      loading: () => <LoadingIndicator />,
    }
  )

  try {
    return <ExperimentComponent />
  } catch {
    return notFound()
  }
}
