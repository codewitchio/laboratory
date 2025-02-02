"use client"

import { animated, useSpring } from "@react-spring/three"
import { useRef, useState } from "react"
import { Mesh } from "three"

export function RotatingCube() {
  const mesh = useRef<Mesh>(null)
  const [clicked, setClicked] = useState(false)

  const springs = useSpring({
    color: clicked ? "#664BAF" : "#8E704E",
    config: {
      duration: 500,
    },
  })

  const { rotation } = useSpring({
    from: { rotation: [0, 0, 0] },
    to: { rotation: [0, Math.PI, 0] },
    config: { duration: 10000 },
    loop: true,
    // Reset rotation when loop restarts for smooth animation
    // reset: true,
  })

  return (
    <animated.mesh
      ref={mesh}
      position={[0, 0, 0]}
      onClick={() => setClicked(!clicked)}
      //@ts-expect-error - rotation is a SpringValue
      rotation={rotation}
    >
      <boxGeometry />
      <animated.meshStandardMaterial color={springs.color} />
    </animated.mesh>
  )
}
