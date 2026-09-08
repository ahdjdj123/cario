import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { Porsche911GT3 } from './Porsche911GT3'
import { GarageEnvironment } from './GarageEnvironment'

const cameraPositions = {
  'front-three-quarter': { position: [4, 1.5, 4], lookAt: [0, 0.5, 0] },
  'rear-three-quarter': { position: [-4, 1.5, -4], lookAt: [0, 0.5, 0] },
  'side': { position: [5, 1, 0], lookAt: [0, 0.5, 0] },
  'front': { position: [0, 1, 6], lookAt: [0, 0.5, 0] },
  'rear': { position: [0, 1, -6], lookAt: [0, 0.5, 0] },
  'top': { position: [0, 8, 0], lookAt: [0, 0, 0] },
  'cockpit': { position: [0.5, 1.2, 0.5], lookAt: [0, 0.8, 1.5] },
  'wheel': { position: [2, 0.3, 1.5], lookAt: [0.85, 0, 1.4] },
  'engine': { position: [0, 1.5, -4], lookAt: [0, 0.5, -1.5] },
}

export function CarViewer({ 
  car, 
  color, 
  paintFinish, 
  interiorColor, 
  doorsOpen, 
  hoodOpen, 
  trunkOpen, 
  lightsOn,
  lightingMode,
  cameraPreset 
}) {
  const carRef = useRef()
  const controlsRef = useRef()
  const { camera } = useThree()
  
  const targetPosition = useMemo(() => {
    return cameraPositions[cameraPreset] || cameraPositions['front-three-quarter']
  }, [cameraPreset])

  useFrame((state) => {
    if (controlsRef.current) {
      const lerpFactor = 0.05
      camera.position.lerp(new THREE.Vector3(...targetPosition.position), lerpFactor)
      controlsRef.current.target.lerp(new THREE.Vector3(...targetPosition.lookAt), lerpFactor)
      controlsRef.current.update()
    }
    
    if (carRef.current) {
      carRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <>
      <GarageEnvironment lightingMode={lightingMode} />
      
      <group ref={carRef}>
        {car?.id === 'porsche-911-gt3' ? (
          <Porsche911GT3
            color={color}
            paintFinish={paintFinish}
            interiorColor={interiorColor}
            doorsOpen={doorsOpen}
            hoodOpen={hoodOpen}
            trunkOpen={trunkOpen}
            lightsOn={lightsOn}
          />
        ) : (
          <Porsche911GT3
            color={color}
            paintFinish={paintFinish}
            interiorColor={interiorColor}
            doorsOpen={doorsOpen}
            hoodOpen={hoodOpen}
            trunkOpen={trunkOpen}
            lightsOn={lightsOn}
          />
        )}
      </group>

      <ContactShadows
        position={[0, -0.49, 0]}
        opacity={0.6}
        scale={10}
        blur={2}
        far={4}
      />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={15}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  )
}
