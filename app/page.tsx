import { ClientOnly } from "@/components/ClientOnly"
import ExperimentList from "@/components/ExperimentList"
import { Page } from "@/components/Page"
import { getExperiments } from "@/lib/experiments"

export default async function Home() {
  const experiments = await getExperiments()
  return (
    <Page>
      <ClientOnly>
        <ExperimentList experiments={experiments} />
      </ClientOnly>
    </Page>
  )
}
