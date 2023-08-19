/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 render_clock.glb -o src/Model_Clock.jsx -p 5 -r . -TjDsS 
Files: render_clock.glb [23.02KB] > render_clock-transformed.glb [11.46KB] (50%)
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { DoubleSide } from 'three';

export default function ModelClock(props) {
  const { nodes, materials } = useGLTF('/render_clock-transformed.glb');
  return (
    <group {...props} dispose={null}>
      <group
        position={[8.73703, 2.08456, -2.16681]}
        rotation={[Math.PI, -1.38555, -Math.PI / 2]}
        scale={[-0.00385, -0.00927, -0.0144]}
      >
        {/* //unfilled right side */}
        <mesh
          geometry={nodes.Plane063.geometry}
          material={materials['Material.020']}
        >
          <meshStandardMaterial
            color={0xff0000}
            side={DoubleSide}
            toneMapped={false}
          />
        </mesh>
        {/**clock body */}
        <mesh geometry={nodes.Plane063_1.geometry} material={materials.clock} />
        {/**button */}
        <mesh
          geometry={nodes.Plane063_2.geometry}
          material={materials['Material.008']}
        />
        {/* //middle clock divider */}
        <mesh
          geometry={nodes.Plane063_3.geometry}
          material={materials['clocknums fin']}
        >
          <meshStandardMaterial
            color={0xff0000}
            side={DoubleSide}
            emissive='#ff0000'
            emissiveIntensity={10}
            toneMapped={false}
          />
        </mesh>
        {/* //unfilled left side */}
        <mesh
          geometry={nodes.Plane063_4.geometry}
          material={materials['Material.020']}
        >
          <meshStandardMaterial
            color={0xff0000}
            side={DoubleSide}
            toneMapped={false}
          />
        </mesh>
        {/* //filled right side */}
        <mesh
          geometry={nodes.Plane063_5.geometry}
          material={materials['clocknums fin.005']}
        >
          <meshStandardMaterial
            color={0xff0000}
            side={DoubleSide}
            emissive='#ff0000'
            emissiveIntensity={8}
            toneMapped={false}
          />
        </mesh>
        {/* //filled left side */}
        <mesh
          geometry={nodes.Plane063_6.geometry}
          material={materials['clocknums fin.006']}
        >
          <meshStandardMaterial
            color={0xff0000}
            side={DoubleSide}
            emissive='#ff0000'
            emissiveIntensity={8}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/render_clock-transformed.glb');
