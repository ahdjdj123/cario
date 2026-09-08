import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cars, carBrands, lightingModes, paintFinishes, cameraPresets } from '../data/cars'
import { useStore } from '../store/useStore'
import { 
  ChevronLeft, ChevronRight, X, Menu, Palette, Lightbulb, 
  Camera, DoorOpen, Wind, Zap, Image, Info
} from 'lucide-react'

export function Header() {
  const { selectedBrand, setSelectedBrand } = useStore()
  
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="absolute top-0 left-0 right-0 z-50 px-8 py-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-wider">CARIO</h1>
          <p className="text-xs text-gray-400 tracking-[0.2em] mt-1">V2.0 ULTRA VISUAL POLISH</p>
        </div>
        
        <nav className="hidden md:flex items-center gap-1 bg-cario-dark/80 backdrop-blur-xl rounded-full px-2 py-1">
          {carBrands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(brand.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                selectedBrand === brand.id
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {brand.name}
            </button>
          ))}
        </nav>
        
        <button className="md:hidden text-white p-2">
          <Menu size={24} />
        </button>
      </div>
    </motion.header>
  )
}

export function ControlPanel() {
  const {
    carColor, setCarColor,
    paintFinish, setPaintFinish,
    interiorColor, setInteriorColor,
    lightingMode, setLightingMode,
    cameraPreset, setCameraPreset,
    doorsOpen, toggleDoor,
    hoodOpen, toggleHood,
    trunkOpen, toggleTrunk,
    lightsOn, toggleLights,
    engineOn, toggleEngine,
    showControls, toggleControls,
    selectedCar,
  } = useStore()

  const [activeTab, setActiveTab] = React.useState('customize')

  if (!showControls) {
    return (
      <button
        onClick={toggleControls}
        className="absolute bottom-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all"
      >
        <Menu size={24} />
      </button>
    )
  }

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="absolute right-0 top-0 bottom-0 w-96 bg-cario-dark/95 backdrop-blur-2xl z-40 overflow-y-auto border-l border-white/10"
    >
      <div className="p-6 pt-20">
        {/* Close Button */}
        <button
          onClick={toggleControls}
          className="absolute top-6 right-6 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'customize', icon: Palette, label: 'Customize' },
            { id: 'camera', icon: Camera, label: 'Camera' },
            { id: 'interact', icon: DoorOpen, label: 'Interact' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm transition-all ${
                activeTab === id
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'customize' && (
          <div className="space-y-8">
            {/* Exterior Color */}
            <section>
              <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Exterior Color</h3>
              <div className="grid grid-cols-6 gap-2">
                {selectedCar?.colors?.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setCarColor(c.hex)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      carColor === c.hex ? 'border-white scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
              <input
                type="color"
                value={carColor}
                onChange={(e) => setCarColor(e.target.value)}
                className="mt-3 w-full h-10 rounded-lg cursor-pointer bg-transparent"
              />
            </section>

            {/* Paint Finish */}
            <section>
              <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Paint Finish</h3>
              <div className="flex flex-wrap gap-2">
                {paintFinishes.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setPaintFinish(finish.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      paintFinish === finish.id
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {finish.name}
                  </button>
                ))}
              </div>
            </section>

            {/* Interior Color */}
            <section>
              <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Interior Trim</h3>
              <div className="grid grid-cols-4 gap-2">
                {selectedCar?.interiorColors?.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setInteriorColor(c.hex)}
                    className={`px-3 py-2 rounded-lg text-xs transition-all ${
                      interiorColor === c.hex ? 'ring-2 ring-white' : ''
                    }`}
                    style={{ backgroundColor: c.hex, color: '#fff' }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </section>

            {/* Lighting Mode */}
            <section>
              <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Environment</h3>
              <div className="space-y-2">
                {lightingModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setLightingMode(mode.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${
                      lightingMode === mode.id
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{mode.name}</span>
                    <Lightbulb size={16} />
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'camera' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Camera Presets</h3>
            {cameraPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setCameraPreset(preset.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${
                  cameraPreset === preset.id
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <span>{preset.name}</span>
                <Camera size={16} />
              </button>
            ))}
          </div>
        )}

        {activeTab === 'interact' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Vehicle Controls</h3>
            
            <button
              onClick={toggleDoor.bind(null, 'driver')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${
                doorsOpen.driver ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>Driver Door</span>
              <DoorOpen size={16} />
            </button>

            <button
              onClick={toggleDoor.bind(null, 'passenger')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${
                doorsOpen.passenger ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>Passenger Door</span>
              <DoorOpen size={16} />
            </button>

            <button
              onClick={toggleHood}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${
                hoodOpen ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>Hood</span>
              <Wind size={16} />
            </button>

            <button
              onClick={toggleTrunk}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${
                trunkOpen ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>Trunk</span>
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={toggleLights}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${
                lightsOn ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>Headlights</span>
              <Lightbulb size={16} />
            </button>

            <button
              onClick={toggleEngine}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${
                engineOn ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>Engine Start</span>
              <Zap size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function CarInfo() {
  const { selectedCar } = useStore()
  
  if (!selectedCar) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-0 left-0 right-0 z-30 px-8 pb-8 pointer-events-none"
    >
      <div className="max-w-2xl pointer-events-auto">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-2"
        >
          {selectedCar.brand} • {selectedCar.category}
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-serif text-white mb-4"
        >
          {selectedCar.name}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg leading-relaxed max-w-xl"
        >
          {selectedCar.description}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-8 mt-6"
        >
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
            <p className="text-2xl text-white font-serif">{selectedCar.price}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Power</p>
            <p className="text-2xl text-white font-serif">{selectedCar.specs.horsepower}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">0-60 mph</p>
            <p className="text-2xl text-white font-serif">{selectedCar.specs.acceleration}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function GalleryModal() {
  const { galleryOpen, closeGallery, galleryImages, currentImageIndex, nextImage, prevImage } = useStore()

  if (!galleryOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
        onClick={closeGallery}
      >
        <button
          onClick={closeGallery}
          className="absolute top-8 right-8 text-white/70 hover:text-white z-10"
        >
          <X size={32} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); prevImage() }}
          className="absolute left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
        >
          <ChevronLeft size={40} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); nextImage() }}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
        >
          <ChevronRight size={40} />
        </button>

        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-[80vw] h-[70vh] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mb-4">
              <Image size={64} className="text-gray-600" />
            </div>
            <p className="text-gray-400 text-sm">
              Image {currentImageIndex + 1} of {galleryImages.length}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function QuickActions() {
  const { openGallery, selectedCar, toggleControls } = useStore()

  const handleGallery = () => {
    if (selectedCar?.gallery) {
      const allImages = [
        ...(selectedCar.gallery.exterior || []),
        ...(selectedCar.gallery.interior || []),
        ...(selectedCar.gallery.engine || []),
      ]
      openGallery(allImages, 0)
    }
  }

  return (
    <div className="absolute bottom-8 left-8 z-30 flex flex-col gap-3">
      <button
        onClick={handleGallery}
        className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all group"
      >
        <Image size={20} />
        <span className="text-sm font-medium">Gallery</span>
      </button>
      
      <button
        onClick={toggleControls}
        className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all group"
      >
        <Info size={20} />
        <span className="text-sm font-medium">Configure</span>
      </button>
    </div>
  )
}
