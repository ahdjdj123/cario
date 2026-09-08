import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Porsche911GT3({ color = '#c41e3a', paintFinish = 'metallic', interiorColor = '#1a1a1a', doorsOpen = { driver: false, passenger: false }, hoodOpen = false, trunkOpen = false, lightsOn = false }) {
  const groupRef = useRef()
  const driverDoorRef = useRef()
  const passengerDoorRef = useRef()
  const hoodRef = useRef()
  const trunkRef = useRef()
  
  // Material helpers
  const getPaintMaterial = () => {
    const base = {
      color,
      metalness: paintFinish === 'matte' ? 0.3 : paintFinish === 'carbon' ? 0.8 : 0.7,
      roughness: paintFinish === 'matte' ? 0.9 : paintFinish === 'carbon' ? 0.4 : 0.2,
      clearcoat: paintFinish === 'matte' ? 0 : 1,
      clearcoatRoughness: 0.1,
    }
    if (paintFinish === 'carbon') {
      return { ...base, color: '#1a1a1a' }
    }
    return base
  }

  const glassMaterial = useMemo(() => ({
    color: '#1a1a2e',
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.7,
  }), [])

  const rubberMaterial = useMemo(() => ({
    color: '#0d0d0d',
    metalness: 0.1,
    roughness: 0.9,
  }), [])

  const chromeMaterial = useMemo(() => ({
    color: '#ffffff',
    metalness: 1,
    roughness: 0.1,
  }), [])

  const interiorMaterial = useMemo(() => ({
    color: interiorColor,
    metalness: 0.2,
    roughness: 0.8,
  }), [interiorColor])

  const wheelMaterial = useMemo(() => ({
    color: '#1a1a1a',
    metalness: 0.6,
    roughness: 0.4,
  }), [])

  const brakeCaliperMaterial = useMemo(() => ({
    color: '#c41e3a',
    metalness: 0.8,
    roughness: 0.3,
  }), [])

  useFrame((state) => {
    if (driverDoorRef.current) {
      driverDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        driverDoorRef.current.rotation.y,
        doorsOpen.driver ? -Math.PI / 3 : 0,
        0.1
      )
    }
    if (passengerDoorRef.current) {
      passengerDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        passengerDoorRef.current.rotation.y,
        doorsOpen.passenger ? Math.PI / 3 : 0,
        0.1
      )
    }
    if (hoodRef.current) {
      hoodRef.current.rotation.x = THREE.MathUtils.lerp(
        hoodRef.current.rotation.x,
        hoodOpen ? -Math.PI / 8 : 0,
        0.1
      )
    }
    if (trunkRef.current) {
      trunkRef.current.rotation.x = THREE.MathUtils.lerp(
        trunkRef.current.rotation.x,
        trunkOpen ? Math.PI / 6 : 0,
        0.1
      )
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Body */}
      <group position={[0, 0.35, 0]}>
        {/* Lower Body */}
        <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.5, 1.8]} />
          <meshStandardMaterial {...getPaintMaterial()} />
        </mesh>

        {/* Upper Body/Cabin */}
        <mesh position={[0, 0.3, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.5, 1.5]} />
          <meshStandardMaterial {...getPaintMaterial()} />
        </mesh>

        {/* Hood */}
        <group ref={hoodRef} position={[0, 0.15, 1.4]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.4, 0.15, 1.3]} />
            <meshStandardMaterial {...getPaintMaterial()} />
          </mesh>
        </group>

        {/* Trunk/Rear Deck */}
        <group ref={trunkRef} position={[0, 0.2, -1.6]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.2, 0.8]} />
            <meshStandardMaterial {...getPaintMaterial()} />
          </mesh>
        </group>

        {/* Front Bumper */}
        <mesh position={[0, -0.2, 1.9]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.4, 0.3]} />
          <meshStandardMaterial {...getPaintMaterial()} />
        </mesh>

        {/* Rear Bumper */}
        <mesh position={[0, -0.15, -1.9]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.35, 0.25]} />
          <meshStandardMaterial {...getPaintMaterial()} />
        </mesh>

        {/* Rear Wing */}
        <mesh position={[0, 0.9, -1.5]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.6, 0.7, -1.5]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 0.25, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.6, 0.7, -1.5]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 0.25, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Windshield */}
        <mesh position={[0, 0.55, 0.6]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
          <boxGeometry args={[1.4, 0.5, 0.05]} />
          <meshStandardMaterial {...glassMaterial} />
        </mesh>

        {/* Rear Window */}
        <mesh position={[0, 0.5, -1]} rotation={[Math.PI / 8, 0, 0]} castShadow>
          <boxGeometry args={[1.3, 0.35, 0.05]} />
          <meshStandardMaterial {...glassMaterial} />
        </mesh>

        {/* Side Windows */}
        <mesh position={[0.75, 0.55, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[1.2, 0.4, 0.05]} />
          <meshStandardMaterial {...glassMaterial} />
        </mesh>
        <mesh position={[-0.75, 0.55, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[1.2, 0.4, 0.05]} />
          <meshStandardMaterial {...glassMaterial} />
        </mesh>

        {/* Driver Door */}
        <group ref={driverDoorRef} position={[0.755, 0.1, 0.2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.55, 1]} />
            <meshStandardMaterial {...getPaintMaterial()} />
          </mesh>
          {/* Door Handle */}
          <mesh position={[0.03, 0.1, 0.3]} castShadow>
            <boxGeometry args={[0.08, 0.03, 0.15]} />
            <meshStandardMaterial {...chromeMaterial} />
          </mesh>
        </group>

        {/* Passenger Door */}
        <group ref={passengerDoorRef} position={[-0.755, 0.1, 0.2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.55, 1]} />
            <meshStandardMaterial {...getPaintMaterial()} />
          </mesh>
          {/* Door Handle */}
          <mesh position={[-0.03, 0.1, 0.3]} castShadow>
            <boxGeometry args={[0.08, 0.03, 0.15]} />
            <meshStandardMaterial {...chromeMaterial} />
          </mesh>
        </group>

        {/* Headlights */}
        <mesh position={[0.6, 0, 2.05]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={lightsOn ? '#ffffee' : '#333'} 
            emissive={lightsOn ? '#ffffee' : '#000'}
            emissiveIntensity={lightsOn ? 2 : 0}
          />
        </mesh>
        <mesh position={[-0.6, 0, 2.05]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={lightsOn ? '#ffffee' : '#333'} 
            emissive={lightsOn ? '#ffffee' : '#000'}
            emissiveIntensity={lightsOn ? 2 : 0}
          />
        </mesh>

        {/* Taillights */}
        <mesh position={[0.7, 0.15, -2]} castShadow>
          <boxGeometry args={[0.25, 0.08, 0.05]} />
          <meshStandardMaterial 
            color={lightsOn ? '#ff0000' : '#500'} 
            emissive={lightsOn ? '#ff0000' : '#000'}
            emissiveIntensity={lightsOn ? 1.5 : 0}
          />
        </mesh>
        <mesh position={[-0.7, 0.15, -2]} castShadow>
          <boxGeometry args={[0.25, 0.08, 0.05]} />
          <meshStandardMaterial 
            color={lightsOn ? '#ff0000' : '#500'} 
            emissive={lightsOn ? '#ff0000' : '#000'}
            emissiveIntensity={lightsOn ? 1.5 : 0}
          />
        </mesh>

        {/* Side Mirrors */}
        <mesh position={[0.9, 0.4, 0.8]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.2]} />
          <meshStandardMaterial {...getPaintMaterial()} />
        </mesh>
        <mesh position={[-0.9, 0.4, 0.8]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.2]} />
          <meshStandardMaterial {...getPaintMaterial()} />
        </mesh>

        {/* Wheels */}
        {[
          [0.85, -0.35, 1.4],
          [-0.85, -0.35, 1.4],
          [0.85, -0.35, -1.4],
          [-0.85, -0.35, -1.4],
        ].map((pos, i) => (
          <group key={i} position={pos}>
            {/* Tire */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.35, 0.35, 0.25, 32]} />
              <meshStandardMaterial {...rubberMaterial} />
            </mesh>
            {/* Wheel Rim */}
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0.13, 0, 0]} castShadow>
              <cylinderGeometry args={[0.28, 0.28, 0.1, 10]} />
              <meshStandardMaterial {...wheelMaterial} />
            </mesh>
            {/* Brake Disc */}
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0.15, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.03, 24]} />
              <meshStandardMaterial color="#333" metalness={0.9} roughness={0.3} />
            </mesh>
            {/* Brake Caliper */}
            <mesh position={[0.17, 0.12, 0]} castShadow>
              <boxGeometry args={[0.08, 0.1, 0.05]} />
              <meshStandardMaterial {...brakeCaliperMaterial} />
            </mesh>
          </group>
        ))}

        {/* Interior (visible through windows) */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[1.2, 0.3, 1.3]} />
          <meshStandardMaterial {...interiorMaterial} />
        </mesh>

        {/* Steering Wheel */}
        <mesh position={[0.35, 0.35, 0.5]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.15, 0.02, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
        </mesh>

        {/* Dashboard */}
        <mesh position={[0.3, 0.3, 0.7]} castShadow>
          <boxGeometry args={[1.3, 0.15, 0.3]} />
          <meshStandardMaterial {...interiorMaterial} />
        </mesh>

        {/* Seats */}
        <mesh position={[0.4, 0.35, -0.2]} castShadow>
          <boxGeometry args={[0.45, 0.5, 0.4]} />
          <meshStandardMaterial {...interiorMaterial} />
        </mesh>
        <mesh position={[-0.4, 0.35, -0.2]} castShadow>
          <boxGeometry args={[0.45, 0.5, 0.4]} />
          <meshStandardMaterial {...interiorMaterial} />
        </mesh>

        {/* Exhaust Tips */}
        <mesh position={[0.5, -0.2, -2.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 0.15, 16]} />
          <meshStandardMaterial {...chromeMaterial} />
        </mesh>
        <mesh position={[-0.5, -0.2, -2.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 0.15, 16]} />
          <meshStandardMaterial {...chromeMaterial} />
        </mesh>
      </group>
    </group>
  )
}
