'use client'

import { Canvas } from '@react-three/fiber'
import Experience from '@/components/sections/drivecar/experience'

export function DriveCarSection() {
  return (
    <section className="w-full h-screen relative">
      
      {/* WebGL Layer */}
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 2, 6], fov: 50 }}
        shadows
      >
        <Experience />
      </Canvas>

      {/* Optional HTML overlay (buttons/text) */}
      <div className="absolute top-10 left-10 z-10 text-white">
        <h1 className="text-2xl font-bold">Drive Experience</h1>
      </div>

    </section>
  )
}