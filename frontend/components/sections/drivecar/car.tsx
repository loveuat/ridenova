'use client'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Car() {
  const { scene } = useGLTF('/models/maruti_suzuki_xl6.glb')
    const carRef = useRef<any>(null)  // ✅ FIX

  useEffect(() => {
    gsap.to(carRef.current.position, {
      z: -5,
      duration: 100000,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })
  }, [])
  return <primitive ref={carRef} object={scene} scale={1.2} position={[0, 0, 0]} />
}

useGLTF.preload('/models/car.glb')