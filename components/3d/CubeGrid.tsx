"use client"

import { useThree } from "@react-three/fiber"
import { useControls } from "leva"
import { MutableRefObject, useCallback, useEffect, useRef } from "react"
import { Color, InstancedMesh, Mesh, Object3D, Raycaster, Vector2 } from "three"

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
const cubeColor = new Color()
const temp = new Object3D()

export function CubeGrid() {
  const isOver = useRef(false)
  const { size, camera } = useThree((state) => state)

  const { showIntersectionPoint, showIntersectionPlane } = useControls({
    showIntersectionPoint: false,
    showIntersectionPlane: false,
  })

  const instancedMeshRef = useRef<InstancedMesh>(null!)
  const intersectionPointMeshRef = useRef<Mesh>(null!)
  const intersectionPlaneMeshRef = useRef<Mesh>(null!)
  const raycaster = useRef(new Raycaster())

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
      const intersections = raycaster.current.intersectObject(
        intersectionPlaneMeshRef.current
      )

      if (intersections.length > 0) {
        const intersection = intersections[0]
        // Update helper mesh
        if (showIntersectionPoint) {
          intersectionPointMeshRef.current.position.x = intersection.point.x
          intersectionPointMeshRef.current.position.y = intersection.point.y
          intersectionPointMeshRef.current.position.z = intersection.point.z
        }

        // Update all cubes
        for (let i = 0; i < count; i++) {
          const { x, y } = indexToXY(i)
          temp.position.set(x - GRID_SIZE / 2, y - GRID_SIZE / 2, 0)
          temp.updateMatrix()
          const distance = temp.position.distanceTo(intersection.point)
          const normalizedDistance = Math.min(distance / 25, 1) // Adjust divisor for sensitivity

          const hue = 120 * normalizedDistance // 120º (green)
          cubeColor.setHSL(hue / 360, 1, 0.5)

          // TODO: Add exponential falloff
          const scale = Math.max(1, Math.min(1.25, 1.5 - normalizedDistance))
          temp.scale.set(scale, scale, scale)

          temp.position.set(x - GRID_SIZE / 2, y - GRID_SIZE / 2, 0)
          temp.updateMatrix()
          instancedMeshRef.current.setMatrixAt(i, temp.matrix)
          instancedMeshRef.current.setColorAt(i, cubeColor)
        }
        instancedMeshRef.current.instanceMatrix.needsUpdate = true
        instancedMeshRef.current.instanceColor!.needsUpdate = true
      } else {
        setCubesToDefault(instancedMeshRef)
      }
    },
    [size, camera, showIntersectionPoint]
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
      {/* Intersection point */}
      <mesh
        ref={intersectionPointMeshRef}
        rotation={[0.5, 0, 0]}
        visible={showIntersectionPoint}
      >
        {/* <sphereGeometry args={[0.1]} /> */}
        <cylinderGeometry args={[0.1, 0.01, 5]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <group rotation={[-0.5, 0, 0]} position={[0, 0, 0]}>
        <mesh
          position={[0, 0, 0]}
          visible={showIntersectionPlane}
          ref={intersectionPlaneMeshRef}
        >
          <planeGeometry args={[GRID_SIZE, GRID_SIZE]} />
          <meshBasicMaterial transparent opacity={0.75} color="red" />
        </mesh>
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
