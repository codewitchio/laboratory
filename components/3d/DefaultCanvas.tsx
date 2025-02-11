import LoadingIndicator from "@/components/LoadingIndicator"
import { Bounds, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

type control = "orbit" | "none"

export default function DefaultCanvas({
  cameraPosition = [0, 0, 5],
  bounds = true,
  control = "orbit",
  children,
}: {
  cameraPosition?: [number, number, number]
  bounds?: boolean
  control?: control
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Canvas className="!absolute !inset-0">
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        {control === "orbit" && <OrbitControls />}

        {bounds ? (
          <Bounds fit clip observe margin={1.5}>
            {children}
          </Bounds>
        ) : (
          children
        )}

        {/* Add useControls toggle for this? */}
        {/* <Stats /> */}
      </Canvas>
    </Suspense>
  )
}
