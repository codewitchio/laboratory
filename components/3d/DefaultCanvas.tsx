import LoadingIndicator from "@/components/LoadingIndicator"
import { Bounds, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas, CanvasProps } from "@react-three/fiber"
import { Suspense } from "react"

type control = "orbit" | "none"

export default function DefaultCanvas({
  cameraPosition = [0, 0, 5],
  lightPosition = [5, 5, 5],
  bounds = true,
  control = "orbit",
  ...props
}: {
  cameraPosition?: [number, number, number]
  lightPosition?: [number, number, number]
  bounds?: boolean
  control?: control
} & CanvasProps) {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Canvas className="!absolute !inset-0" shadows="soft" {...props}>
        <PerspectiveCamera makeDefault position={cameraPosition} />
        {/* Ambient light for overall scene brightness */}
        <ambientLight intensity={0.5} />
        {/* Main directional light */}
        <directionalLight
          position={lightPosition}
          intensity={1}
          castShadow
          // shadow-mapSize={[1024, 1024]} // Not sure if this does anything currently?
        />
        {/* Soft fill light */}
        <directionalLight position={[-5, 3, -5]} intensity={0.3} />

        {control === "orbit" && <OrbitControls />}

        {bounds ? (
          <Bounds fit clip observe margin={1.5}>
            {props.children}
          </Bounds>
        ) : (
          props.children
        )}

        {/* Add useControls toggle for this? */}
        {/* <Stats /> */}
      </Canvas>
    </Suspense>
  )
}
