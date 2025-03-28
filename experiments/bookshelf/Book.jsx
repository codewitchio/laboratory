/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 /Users/hanna/Downloads/Book.glb --transform 
Files: /Users/hanna/Downloads/Book.glb [61.62KB] > /Users/hanna/Dev/codewitch/laboratory/Book-transformed.glb [8.5KB] (86%)
*/

import { useGLTF } from "@react-three/drei"

export function Book(props) {
  const { nodes, materials } = useGLTF("/models/Book-transformed.glb")
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={200}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Book3_Closed_1.geometry}
          material={materials.DarkBrown}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Book3_Closed_2.geometry}
          material={materials.Beige}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Book3_Closed_3.geometry}
          material={materials.Gold}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Book3_Closed_4.geometry}
          material={materials.Brown}
        />
      </group>
    </group>
  )
}

useGLTF.preload("/models/Book-transformed.glb")
