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
  const experiments = await getExperiments()
  const experiment = experiments.find((exp) => exp.slug === params.experiment)
  if (!experiment) {
    return notFound()
  }
  return {
    title: buildPageTitle(experiment.title),
    description: experiment.description,
  }
}

export default function ExperimentPage({
  params,
}: {
  params: { experiment: string }
}) {
  const ExperimentComponent = dynamic(
    () => import(`@/experiments/${params.experiment}/page`),
    {
      loading: () => <LoadingIndicator />,
      ssr: false, // Disable SSR for WebGL/Three.js compatibility
    }
  )

  try {
    return <ExperimentComponent />
  } catch {
    return notFound()
  }
}
