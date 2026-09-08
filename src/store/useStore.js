import { create } from 'zustand'

export const useStore = create((set, get) => ({
  // Current selected car
  selectedCar: null,
  setSelectedCar: (car) => set({ selectedCar: car }),

  // Current brand filter
  selectedBrand: 'all',
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),

  // Car customization
  carColor: '#c41e3a',
  setCarColor: (color) => set({ carColor: color }),
  
  paintFinish: 'metallic',
  setPaintFinish: (finish) => set({ paintFinish: finish }),
  
  interiorColor: '#1a1a1a',
  setInteriorColor: (color) => set({ interiorColor: color }),

  // Camera state
  cameraView: 'exterior',
  setCameraView: (view) => set({ cameraView: view }),
  
  cameraPreset: 'front-three-quarter',
  setCameraPreset: (preset) => set({ cameraPreset: preset }),

  // Car interactions
  doorsOpen: { driver: false, passenger: false },
  hoodOpen: false,
  trunkOpen: false,
  lightsOn: false,
  engineOn: false,
  
  toggleDoor: (door) => set((state) => ({ 
    doorsOpen: { ...state.doorsOpen, [door]: !state.doorsOpen[door] } 
  })),
  
  toggleHood: () => set((state) => ({ hoodOpen: !state.hoodOpen })),
  toggleTrunk: () => set((state) => ({ trunkOpen: !state.trunkOpen })),
  toggleLights: () => set((state) => ({ lightsOn: !state.lightsOn })),
  toggleEngine: () => set((state) => ({ engineOn: !state.engineOn })),

  // Environment
  lightingMode: 'midnight-garage',
  setLightingMode: (mode) => set({ lightingMode: mode }),

  // Gallery
  galleryOpen: false,
  galleryImages: [],
  currentImageIndex: 0,
  openGallery: (images, index = 0) => set({ galleryOpen: true, galleryImages: images, currentImageIndex: index }),
  closeGallery: () => set({ galleryOpen: false }),
  nextImage: () => set((state) => ({ 
    currentImageIndex: (state.currentImageIndex + 1) % state.galleryImages.length 
  })),
  prevImage: () => set((state) => ({ 
    currentImageIndex: (state.currentImageIndex - 1 + state.galleryImages.length) % state.galleryImages.length 
  })),

  // UI State
  showControls: true,
  toggleControls: () => set((state) => ({ showControls: !state.showControls })),
}))
