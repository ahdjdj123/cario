import React, { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function GarageEnvironment({ lightingMode = 'midnight-garage' }) {
  const floorRef = React.useRef()
  
  const getLightingConfig = () => {
    const configs = {
      'black-studio': {
        ambient: '#1a1a1a',
        directional: '#ffffff',
        directionalIntensity: 2,
        spotColor: '#ffffff',
        spotIntensity: 3,
        fogColor: '#0a0a0a',
        fogDensity: 0.02,
      },
      'golden-sunset': {
        ambient: '#4a3728',
        directional: '#ffb347',
        directionalIntensity: 1.5,
        spotColor: '#ffd700',
        spotIntensity: 2,
        fogColor: '#2d1f1a',
        fogDensity: 0.015,
      },
      'tokyo-night': {
        ambient: '#1a1a2e',
        directional: '#4a4a6a',
        directionalIntensity: 0.8,
        spotColor: '#6a5acd',
        spotIntensity: 1.5,
        fogColor: '#0f0f1a',
        fogDensity: 0.025,
      },
      'alpine-morning': {
        ambient: '#2a3a4a',
        directional: '#87ceeb',
        directionalIntensity: 1.2,
        spotColor: '#ffffff',
        spotIntensity: 2.5,
        fogColor: '#1a2a3a',
        fogDensity: 0.01,
      },
      'desert-sunset': {
        ambient: '#4a2a2a',
        directional: '#ff6b35',
        directionalIntensity: 1.3,
        spotColor: '#ffa500',
        spotIntensity: 2,
        fogColor: '#2a1a1a',
        fogDensity: 0.012,
      },
      'racetrack-day': {
        ambient: '#3a3a3a',
        directional: '#ffffff',
        directionalIntensity: 2.5,
        spotColor: '#ffffff',
        spotIntensity: 3,
        fogColor: '#1a1a1a',
        fogDensity: 0.008,
      },
      'midnight-garage': {
        ambient: '#0a0a0a',
        directional: '#2a2a2a',
        directionalIntensity: 0.5,
        spotColor: '#ffffff',
        spotIntensity: 4,
        fogColor: '#050505',
        fogDensity: 0.03,
      },
    }
    return configs[lightingMode] || configs['midnight-garage']
  }

  const config = useMemo(() => getLightingConfig(), [lightingMode])

  useFrame((state) => {
    if (floorRef.current) {
      state.camera.far = 100
      state.camera.updateProjectionMatrix()
    }
  })

  return (
    <group>
      {/* Lighting */}
      <ambientLight args={[config.ambient, 0.5]} />
      <directionalLight
        args={[config.directional, config.directionalIntensity]}
        position={[10, 10, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Main Spotlight on Car */}
      <spotLight
        args={[config.spotColor, config.spotIntensity]}
        position={[0, 8, 0]}
        angle={Math.PI / 4}
        penumbra={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Rim Lights */}
      <spotLight
        args={['#ffffff', 1]}
        position={[-5, 3, -5]}
        angle={Math.PI / 6}
        penumbra={0.3}
      />
      <spotLight
        args={['#ffffff', 1]}
        position={[5, 3, -5]}
        angle={Math.PI / 6}
        penumbra={0.3}
      />

      {/* Floor with Reflection */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#121212"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Ceiling Grid */}
      <gridHelper args={[40, 40, '#333', '#222']} position={[0, 6, 0]} />

      {/* Background Walls */}
      <mesh position={[0, 2, -15]} receiveShadow>
        <boxGeometry args={[30, 12, 1]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.8} />
      </mesh>
      <mesh position={[-15, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[30, 12, 1]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.8} />
      </mesh>
      <mesh position={[15, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[30, 12, 1]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Fog */}
      <fog attach="fog" args={[config.fogColor, 5, 30]} />

      {/* Decorative Elements - Pillars */}
      {[
        [-12, 0, -10],
        [12, 0, -10],
        [-12, 0, 10],
        [12, 0, 10],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow receiveShadow>
          <boxGeometry args={[1, 8, 1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Floor Markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial color="#1a1a1a" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}
