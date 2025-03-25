"use client"

import DefaultCanvas from "@/components/3d/DefaultCanvas"
import { Book } from "@/experiments/bookshelf/Book"
import { ContactShadows, Environment } from "@react-three/drei"

const color = "#E1E6D9"

export default function ColorShift() {
  return (
    <DefaultCanvas
      bounds={false}
      // control="orbit" // only used for development/testing
      control={"none"}
      lightPosition={[0, 5, 5]}
      shadows
      dpr={[1, 2]}
    >
      <Environment preset="apartment" />

      {/* Wall */}
      <mesh castShadow receiveShadow position={[0, 0, -0.5]}>
        <boxGeometry args={[50, 10, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Shelf group for objects on top */}
      <group position={[0, -1, 0]}>
        {/* Shelf */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[50, 0.05, 1]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Book object */}
        <Book position={[0, 0.82, 0]} />
        {/* Additional contact shadows for book against wall */}
        <ContactShadows
          position={[0, 0.5, -0.45]}
          rotation={[0, 0, 0]}
          opacity={0.4}
          scale={5}
          blur={2.5}
          far={0.5}
          frames={1}
          color="#000000"
          renderOrder={2}
        />
      </group>

      {/* Contact shadows for realistic grounding */}
      <ContactShadows
        position={[0, -1.02, 0]}
        opacity={1}
        scale={10}
        blur={5}
        far={10}
        frames={1}
      />
    </DefaultCanvas>
  )
}
