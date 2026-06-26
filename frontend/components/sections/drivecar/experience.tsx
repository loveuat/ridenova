'use client'

import { Environment, ContactShadows } from '@react-three/drei'
import Car from '@/components/sections/drivecar/car'
import Road from '@/components/sections/drivecar/road'

export default function Experience() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      {/* Scene */}
      <Car />
      <Road />

      {/* Environment */}
      <Environment preset="city" />

      {/* Ground shadow */}
      <ContactShadows opacity={0.6} blur={2} scale={10} />
    </>
  )
}