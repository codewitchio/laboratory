"use client"

import DefaultCanvas from "@/components/3d/DefaultCanvas"
import {
  RotatingCubeMotion,
  RotatingCubeSpring,
} from "@/components/3d/RotatingCube"

export default function RotatingCubePage() {
  return (
    <DefaultCanvas>
      <RotatingCubeMotion position={[1, 0, 0]} />
      <RotatingCubeSpring position={[-1, 0, 0]} />
    </DefaultCanvas>
  )
}
