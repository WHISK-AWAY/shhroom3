/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 wall_art_tier_1.glb -o src/WallArtTierOne.jsx -p 5 -r . -TjDsS 
Files: wall_art_tier_1.glb [28.4MB] > wall_art_tier_1-transformed.glb [1.28MB] (95%)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/wall_art_tier_1-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh receiveShadow geometry={nodes.gd001.geometry} material={materials.gd} position={[7.63098, 5.47873, -2.5866]} rotation={[Math.PI / 2, 0, 0]} scale={0.81893} />
      <mesh receiveShadow geometry={nodes.kiss001.geometry} material={materials.kiss} position={[6.9835, 5.19715, -2.583]} rotation={[Math.PI / 2, 0, 0]} scale={0.77752} />
      <mesh receiveShadow geometry={nodes.s2.geometry} material={materials.s2} position={[3.91987, 2.57417, 1.66129]} rotation={[1.48203, -0.00031, 1.51534]} scale={0.10454} />
      <mesh receiveShadow geometry={nodes.s9.geometry} material={materials.s9} position={[3.14911, 4.15054, 0.12557]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.80899} />
      <mesh receiveShadow geometry={nodes.s46.geometry} material={materials.s46} position={[4.2457, 3.3832, 2.26719]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.10042} />
      <mesh receiveShadow geometry={nodes.IMG_6328001.geometry} material={materials.IMG_6328} position={[3.17811, 4.21493, 2.24099]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.19719} />
      <mesh receiveShadow geometry={nodes.IMG_6322001.geometry} material={materials.IMG_6322} position={[3.18206, 4.24782, 2.11802]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.25676} />
      <mesh receiveShadow geometry={nodes.IMG_6317001.geometry} material={materials.IMG_6317} position={[3.18765, 4.05477, 1.76667]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.30766} />
      <mesh receiveShadow geometry={nodes.IMG_6318001.geometry} material={materials.IMG_6318} position={[3.19312, 4.31025, 2.44024]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.26188} />
      <mesh receiveShadow geometry={nodes.IMG_6319001.geometry} material={materials.IMG_6319} position={[3.17802, 3.94616, 1.91375]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.19242} />
      <mesh receiveShadow geometry={nodes.IMG_6320001.geometry} material={materials.IMG_6320} position={[3.18027, 4.19217, 1.48136]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.24075} />
      <mesh receiveShadow geometry={nodes.IMG_6321001.geometry} material={materials.IMG_6321} position={[3.18241, 4.24949, 1.04024]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.33666} />
      <mesh receiveShadow geometry={nodes.IMG_6323001.geometry} material={materials.IMG_6323} position={[3.14317, 3.87023, 0.71778]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.28662} />
      <mesh receiveShadow geometry={nodes.IMG_6324001.geometry} material={materials.IMG_6324} position={[3.18572, 4.362, 1.87046]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.27375} />
      <mesh receiveShadow geometry={nodes.IMG_6325001.geometry} material={materials.IMG_6325} position={[3.18167, 4.41594, 2.32417]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.14606} />
      <mesh receiveShadow geometry={nodes.IMG_6326001.geometry} material={materials.IMG_6326} position={[3.1798, 4.12352, 1.96144]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.16073} />
      <mesh receiveShadow geometry={nodes.IMG_6327001.geometry} material={materials.IMG_6327} position={[3.18087, 4.08748, 2.44743]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.13403} />
      <mesh receiveShadow geometry={nodes.shh3.geometry} material={materials.shh3} position={[7.71108, 3.65457, -2.58681]} rotation={[Math.PI / 2, 0, Math.PI]} scale={1.9586} />
      <mesh receiveShadow geometry={nodes.kentaylor_gremlins700.geometry} material={materials.kentaylor_gremlins700} position={[8.68322, 4.20786, -2.58838]} rotation={[Math.PI / 2, 0, 0]} scale={0.69356} />
    </group>
  )
}

useGLTF.preload('/wall_art_tier_1-transformed.glb')
