import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Object3D } from "three"

type FloatAnimationParams = {
  object: React.RefObject<Object3D | undefined | null>
  active: boolean
  options?: {
    speed?: number
    amplitude?: number
    initialY?: number
    verticalOffset?: number
  }
}

export function useFloatAnimation({
  object,
  active,
  options,
}: FloatAnimationParams) {
  const {
    speed = 1,
    amplitude = 1,
    initialY = 0,
    verticalOffset = 0,
  } = options || {}

  useFrame((state) => {
    if (!object.current) return

    const t = state.clock.getElapsedTime() * speed
    const lerpFactor = 0.1

    // Animate rotations
    object.current.rotation.x = THREE.MathUtils.lerp(
      object.current.rotation.x,
      active ? Math.cos(t / 10) / 10 + 0.25 : 0,
      lerpFactor
    )

    object.current.rotation.y = THREE.MathUtils.lerp(
      object.current.rotation.y,
      active ? Math.sin(t / 10) / 4 : 0,
      lerpFactor
    )

    object.current.rotation.z = THREE.MathUtils.lerp(
      object.current.rotation.z,
      active ? Math.sin(t / 10) / 10 : 0,
      lerpFactor
    )

    // Animate position
    object.current.position.y = THREE.MathUtils.lerp(
      object.current.position.y,
      active
        ? Math.sin(t) * amplitude + (verticalOffset ?? 0)
        : (initialY ?? 0),
      lerpFactor
    )
  })
}
