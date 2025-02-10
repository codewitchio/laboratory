"use client"

import { CubeGrid } from "@/components/3d/CubeGrid"
import DefaultCanvas from "@/components/3d/DefaultCanvas"

export default function CubeGriPage() {
  return (
    <DefaultCanvas cameraPosition={[0, 0, 25]} bounds={false}>
      <CubeGrid />
    </DefaultCanvas>
  )
}
