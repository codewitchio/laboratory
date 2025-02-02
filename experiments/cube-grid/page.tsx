"use client"

import { CubeGrid } from "@/components/3d/CubeGrid"
import DefaultCanvas from "@/components/3d/DefaultCanvas"

export default function CubeGriPage() {
  return (
    <DefaultCanvas>
      <CubeGrid />
    </DefaultCanvas>
  )
}
