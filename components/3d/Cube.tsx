"use client"

import { useFloatAnimation } from "@/lib/three/animations"
import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { Color, Mesh } from "three"

export function Cube() {
  const mesh = useRef<Mesh>(null)
  const [clicked, setClicked] = useState(false)

  // const springs = useSpring({
  //   color: clicked ? "#664BAF" : "#8E704E",
  //   config: {
  //     duration: 500,
  //   },
  // })

  useFloatAnimation({
    object: mesh,
    active: true,
    options: {
      speed: 0.5,
      amplitude: 0.25,
    },
  })

  const ColorShiftMaterial = shaderMaterial(
    { time: 0, color: new Color(0.2, 0.0, 0.1) },
    // vertex shader
    /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // fragment shader
    /*glsl*/ `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }
  `
  )

  extend({ ColorShiftMaterial })

  const colorShiftMaterial = useRef()
  useFrame((state, delta) => {
    // @ts-expect-error idk why this says "never"
    colorShiftMaterial.current!.time += delta
  })

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      onClick={() => setClicked(!clicked)}
    >
      <boxGeometry />
      {/* TODO: Look into adding the type to ThreeElements, after moving the material to its own file: https://github.com/pmndrs/leva */}
      {/* @ts-expect-error React doesn't know we used extend */}
      <colorShiftMaterial
        color="#664BAF"
        time={1}
        ref={colorShiftMaterial}
        key={ColorShiftMaterial.key}
      />
      {/* <animated.meshStandardMaterial color={springs.color} /> */}
    </mesh>
  )
}
