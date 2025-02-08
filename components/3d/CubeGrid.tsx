"use client"

import { animated, useSprings } from "@react-spring/three"
import { useThree } from "@react-three/fiber"
import { useCallback, useEffect, useRef } from "react"
import { Color, Plane, Raycaster, Vector2, Vector3 } from "three"

const GRID_SIZE = 10
const indexToXY = (index: number) => {
  const i = Math.floor(index / GRID_SIZE)
  const j = index % GRID_SIZE
  return { x: i, y: j }
}

export function CubeGrid() {
  const isOver = useRef(false)
  const { size, camera } = useThree((state) => state)

  // Single spring system for all cubes
  const [springs, api] = useSprings(GRID_SIZE * GRID_SIZE, () => ({
    scale: 1,
    color: "#00ff00", // Initial green color
  }))

  const raycaster = useRef(new Raycaster())
  const plane = useRef(new Plane(new Vector3(0, 0, 1), 3)) // Correct constant for z = -5

  const handlePointerEnter = useCallback(() => {
    isOver.current = true
  }, [])

  const handlePointerLeave = useCallback(() => {
    isOver.current = false
    api.start({
      scale: 1,
      color: "#00ff00", // Reset color to green
    })
  }, [api])

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (!isOver.current) return

      // Get mouse coordinates in normalized device coordinates
      const mouseX = (e.offsetX / size.width) * 2 - 1
      const mouseY = (e.offsetY / size.height) * -2 + 1

      // Calculate 3D intersection point
      const mouseVec = new Vector2(mouseX, mouseY)
      raycaster.current.setFromCamera(mouseVec, camera)
      const intersection = new Vector3()
      raycaster.current.ray.intersectPlane(plane.current, intersection)

      api.start((index) => {
        const { x, y } = indexToXY(index)
        const cubePos = new Vector3(
          x - GRID_SIZE / 2,
          y - GRID_SIZE / 2,
          0 // Local position (group is at z: -5)
        )

        // Calculate true 3D distance
        const distance = cubePos.distanceTo(intersection)
        const normalizedDistance = Math.min(distance / 12, 1) // Adjust divisor for sensitivity

        const hue = 120 * normalizedDistance // 120º (green)
        const color = new Color().setHSL(hue / 360, 1, 0.5).getHexString()

        return {
          scale: Math.max(1, Math.min(1.25, 1.5 - normalizedDistance)),
          color: `#${color}`,
        }
      })
    },
    [api, size, camera]
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

  return (
    <group rotation={[-0.5, 0, 0]} position={[0, 0, -5]}>
      {/* Existing cubes */}
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
        const { x, y } = indexToXY(index)
        return (
          <animated.mesh
            key={`${x}-${y}`}
            position={[x - GRID_SIZE / 2, y - GRID_SIZE / 2, 0]}
            scale={springs[index].scale}
          >
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <animated.meshStandardMaterial color={springs[index].color} />
          </animated.mesh>
        )
      })}
    </group>
  )
}
