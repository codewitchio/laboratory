import LoadingIndicator from "@/components/LoadingIndicator"
import { PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

export default function DefaultCanvas({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Canvas className="!absolute !inset-0">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        {children}
        {/* Add useControls toggle for this? */}
        {/* <Stats /> */}
      </Canvas>
    </Suspense>
  )
}
