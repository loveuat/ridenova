import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

export default function Road() {

   const meshRef = useRef<any>(null)  // ✅ FIX
  const texture = useLoader(THREE.TextureLoader, '/textures/road.jpg')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  useFrame((state, delta) => {
    texture.offset.y += delta * 2
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 200]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}