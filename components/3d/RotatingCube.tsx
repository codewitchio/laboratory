"use client"

import { animated, useSpring } from "@react-spring/three"
import { motion } from "framer-motion-3d"
import { useRef, useState } from "react"
import { Mesh } from "three"

export function RotatingCubeSpring(props: {
  position: [x: number, y: number, z: number]
}) {
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
      position={props.position}
      onClick={() => setClicked(!clicked)}
      //@ts-expect-error - rotation is a SpringValue
      rotation={rotation}
    >
      <boxGeometry />
      <animated.meshStandardMaterial color={springs.color} />
    </animated.mesh>
  )
}

export function RotatingCubeMotion(props: {
  position: [x: number, y: number, z: number]
}) {
  // Track click state to toggle the cube's color
  const [hasBeenClicked, setHasBeenClicked] = useState(false)
  // Determine the cube's color based on its click state
  const cubeColor = hasBeenClicked ? "#664BAF" : "#8E704E"

  return (
    <motion.mesh
      // Static position for the cube
      position={props.position}
      onClick={() => setHasBeenClicked((prev) => !prev)}
      // Animate continuous rotation around the Y-axis for a smooth loop
      animate={{ rotateY: 2 * Math.PI }}
      transition={{
        repeat: Infinity,
        duration: 10, // 10 seconds per full rotation
        ease: "linear",
      }}
    >
      <boxGeometry />
      {/* Animate material color with a smooth transition upon clicks */}
      <motion.meshStandardMaterial
        animate={{ color: cubeColor }}
        transition={{ duration: 0.5 }}
      />
    </motion.mesh>
  )
}
