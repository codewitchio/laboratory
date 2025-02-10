"use client"

import { useThree } from "@react-three/fiber"
import { MutableRefObject, useCallback, useEffect, useRef } from "react"
import {
  Color,
  InstancedMesh,
  Object3D,
  Plane,
  Raycaster,
  Vector2,
  Vector3,
} from "three"

const GRID_SIZE = 100
const count = GRID_SIZE * GRID_SIZE
const defaultColor = new Color("#439400")

const indexToXY = (index: number) => {
  const i = Math.floor(index / GRID_SIZE)
  const j = index % GRID_SIZE
  return { x: i, y: j }
}

// For use in handlePointerMove
const mouseVec = new Vector2()
const intersection = new Vector3()
const cubeColor = new Color()
const temp = new Object3D()

export function CubeGrid() {
  const isOver = useRef(false)
  const { size, camera } = useThree((state) => state)
  const instancedMeshRef = useRef<InstancedMesh>(null!)

  const raycaster = useRef(new Raycaster())
  const plane = useRef(new Plane(new Vector3(0, 0, 1), 3)) // Correct constant for z = -5

  const handlePointerEnter = useCallback(() => {
    isOver.current = true
  }, [])

  const handlePointerLeave = useCallback(() => {
    isOver.current = false
    setCubesToDefault(instancedMeshRef)
  }, [])

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (!isOver.current) return

      // Get mouse coordinates in normalized device coordinates
      const mouseX = (e.offsetX / size.width) * 2 - 1
      const mouseY = (e.offsetY / size.height) * -2 + 1
      mouseVec.set(mouseX, mouseY)

      // Calculate 3D intersection point
      raycaster.current.setFromCamera(mouseVec, camera)
      raycaster.current.ray.intersectPlane(plane.current, intersection)

      for (let i = 0; i < count; i++) {
        instancedMeshRef.current.getMatrixAt(i, temp.matrix)
        const distance = temp.position.distanceTo(intersection)
        const normalizedDistance = Math.min(distance / 12, 1) // Adjust divisor for sensitivity

        const hue = 120 * normalizedDistance // 120º (green)
        cubeColor.setHSL(hue / 360, 1, 0.5)

        const scale = Math.max(1, Math.min(1.25, 1.5 - normalizedDistance))
        temp.scale.set(scale, scale, scale)

        const { x, y } = indexToXY(i)
        temp.position.set(x - GRID_SIZE / 2, y - GRID_SIZE / 2, 0)
        temp.updateMatrix()

        instancedMeshRef.current.setMatrixAt(i, temp.matrix)
        instancedMeshRef.current.setColorAt(i, cubeColor)
      }
      instancedMeshRef.current.instanceMatrix.needsUpdate = true
      instancedMeshRef.current.instanceColor!.needsUpdate = true
    },
    [size, camera]
  )

  useEffect(() => {
    // Check if the mouse pointer is already over the canvas (or document.body if no canvas exists)
    const interactiveElement = document.querySelector("canvas") || document.body
    if (interactiveElement.matches(":hover")) {
      handlePointerEnter()
    }

    window.addEventListener("pointerover", handlePointerEnter)
    window.addEventListener("pointerout", handlePointerLeave)
    window.addEventListener("pointermove", handlePointerMove)

    return () => {
      window.removeEventListener("pointerover", handlePointerEnter)
      window.removeEventListener("pointerout", handlePointerLeave)
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [handlePointerEnter, handlePointerLeave, handlePointerMove])

  useEffect(() => {
    // Set initial positions
    setCubesToDefault(instancedMeshRef)
  }, [])

  return (
    <>
      {/* <planeHelper args={[plane.current, 100, 0x33333]} /> */}
      <group rotation={[-0.5, 0, 0]} position={[0, 0, -15]}>
        <instancedMesh
          ref={instancedMeshRef}
          args={[undefined, undefined, count]}
        >
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial />
        </instancedMesh>
      </group>
    </>
  )
}

function setCubesToDefault(instancedMeshRef: MutableRefObject<InstancedMesh>) {
  for (let i = 0; i < count; i++) {
    const { x, y } = indexToXY(i)
    temp.position.set(x - GRID_SIZE / 2, y - GRID_SIZE / 2, 0)
    temp.updateMatrix()
    instancedMeshRef.current.setMatrixAt(i, temp.matrix)
    instancedMeshRef.current.setColorAt(i, defaultColor)
  }
  instancedMeshRef.current.instanceMatrix.needsUpdate = true
  instancedMeshRef.current.instanceColor!.needsUpdate = true
}
