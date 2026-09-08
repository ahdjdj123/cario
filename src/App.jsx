import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useStore } from './store/useStore'
import { cars } from './data/cars'
import { CarViewer } from './components/CarViewer'
import { Header, ControlPanel, CarInfo, GalleryModal, QuickActions } from './components/UI'

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-cario-black flex items-center justify-center"
    >
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-serif text-white mb-4"
        >
          CARIO
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 tracking-[0.3em]"
        >
          LOADING EXPERIENCE
        </motion.p>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="h-px bg-white/30 mt-8 mx-auto"
        />
      </div>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = React.useState(true)
  const { 
    selectedBrand, 
    setSelectedCar, 
    carColor, 
    paintFinish, 
    interiorColor,
    doorsOpen,
    hoodOpen,
    trunkOpen,
    lightsOn,
    lightingMode,
    cameraPreset,
  } = useStore()

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    const filteredCars = selectedBrand === 'all' 
      ? cars 
      : cars.filter(c => c.brand === selectedBrand)
    
    if (filteredCars.length > 0) {
      setSelectedCar(filteredCars[0])
    }
  }, [selectedBrand, setSelectedCar])

  const selectedCar = useStore((state) => state.selectedCar)

  return (
    <>
      {loading && <LoadingScreen />}
      
      <div className="relative w-full h-screen bg-cario-black overflow-hidden">
        {/* 3D Canvas */}
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [4, 1.5, 4], fov: 45, near: 0.1, far: 100 }}
          gl={{ 
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
        >
          <Suspense fallback={null}>
            <CarViewer
              car={selectedCar}
              color={carColor}
              paintFinish={paintFinish}
              interiorColor={interiorColor}
              doorsOpen={doorsOpen}
              hoodOpen={hoodOpen}
              trunkOpen={trunkOpen}
              lightsOn={lightsOn}
              lightingMode={lightingMode}
              cameraPreset={cameraPreset}
            />
            <Preload all />
          </Suspense>
        </Canvas>

        {/* UI Overlay */}
        <Header />
        <CarInfo />
        <QuickActions />
        <ControlPanel />
        <GalleryModal />

        {/* Brand Selector Mobile */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 md:hidden"
        >
          <select
            value={selectedBrand}
            onChange={(e) => useStore.getState().setSelectedBrand(e.target.value)}
            className="bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-full border border-white/20 appearance-none cursor-pointer"
          >
            {cars.map((c) => (
              <option key={c.id} value={c.brand} className="bg-cario-dark">
                {c.brand.toUpperCase()}
              </option>
            ))}
          </select>
        </motion.div>
      </div>
    </>
  )
}

// Import THREE for tone mapping
import * as THREE from 'three'
