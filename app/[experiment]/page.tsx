import LoadingIndicator from "@/components/LoadingIndicator"
import { getExperiments } from "@/lib/experiments"
import { buildPageTitle } from "@/lib/metadata"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

interface PageProps {
  params: { experiment: string }
}

export async function generateStaticParams() {
  const experiments = await getExperiments()
  return experiments.map((exp) => ({ experiment: exp.slug }))
}

//  Set metadata
export async function generateMetadata({ params }: PageProps) {
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

export default async function ExperimentPage({ params }: PageProps) {
  const { experiment } = await params
  const ExperimentComponent = dynamic(
    () => import(`@/experiments/${experiment}/page`),
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
