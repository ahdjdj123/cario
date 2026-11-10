# CARIO

> **Interactive 3D Automotive Telemetry & Design Laboratory**

A real-time WebGL inspection platform engineered to deconstruct high-performance vehicles through interactive 3D models, performance telemetry, and generational lineage.

<br>

<p align="center">
  <img src="assets/brand/cario-uncompromised-architecture.png" alt="CARIO — Uncompromised Architecture Launch Poster" width="80%">
</p>

---

## Table of Contents

* [Overview](#overview)
  * [The Problem](#the-problem)
  * [The Purpose](#the-purpose)
  * [Intended Audience](#intended-audience)
* [Core Features](#core-features)
* [Brand & Visual Showcase](#brand--visual-showcase)
* [User Experience & Design Philosophy](#user-experience--design-philosophy)
* [Technology Stack](#technology-stack)
* [Project Architecture](#project-architecture)
* [My Contribution](#my-contribution)
* [Future Improvements](#future-improvements)
* [Project Metadata](#project-metadata)
* [Closing Statement](#closing-statement)

---

## Overview

### The Problem
Traditional digital automotive showcases are frequently limited to static photo carousels or commercial configurators that prioritize color palettes over engineering integrity. They rarely convey aerodynamic logic, powertrain packaging, or the technical lineage that defines world-class performance machinery.

### The Purpose
**CARIO** bridges digital interaction design and mechanical engineering. Functioning as a virtual proving ground directly within the browser, it allows users to analyze vehicles through structured engineering viewpoints, real-time performance telemetry, and generational progression.

### Intended Audience
* Automotive design, industrial engineering, and computer science students.
* High-performance vehicle enthusiasts seeking verified technical context.
* Technical reviewers evaluating interactive WebGL performance, 3D scene architecture, and HUD ergonomics.

---

## Core Features

### 1. 8-Stage Inspection Rail
Deconstruct the vehicle systematically across eight dedicated inspection zones:
* `01 EXTERIOR` — Aerodynamic profiling and vehicle stance
* `02 INTERIOR` — Cockpit architecture and instrumentation ergonomics
* `03 ENGINE` — Powertrain packaging, induction, and displacement metrics
* `04 COLOR` — Surface finish calibration and livery configurations
* `05 WHEELS` — Wheel geometry and contact surface inspection
* `06 ATMOSPHERE` — Studio lighting and ambient contrast calibration
* `07 SOUND` — Acoustic exhaust mapping and engine resonance
* `08 TRACK` — Dynamic track mode and high-speed telemetry telemetry setup

### 2. Real-Time Telemetry HUD
An integrated heads-up display delivering verified performance benchmarks:
* **Horsepower:** Verified engine output ($\text{HP}$)
* **Acceleration:** Benchmark $0\text{--}100\text{ km/h}$ launch times
* **Top Velocity:** Maximum theoretical and track-tested speed ($\text{km/h}$)
* **Displacement:** Powertrain architecture (e.g., $6.5\text{L V12}$, $8.0\text{L W16}$)
* **Track Records:** Production lap benchmarks (e.g., Nürburgring Nordschleife validation)

### 3. Generational Lineage Engine
Contextual timeline tracking that maps the evolution of iconic nameplates across decades, highlighting aerodynamic milestones, power leaps, and chassis revisions.

### 4. Categorized Discovery Matrix
A comprehensive exploration deck filtering vehicles across:
* **Marque:** Lamborghini, Ferrari, McLaren, Porsche, Bugatti, Mercedes-AMG, Aston Martin
* **Class:** Coupe, Supercar, Hypercar, GT
* **Era:** Classic, Modern, Contemporary, Future

---

## Brand & Visual Showcase

The visual identity of CARIO combines motorsport aerodynamics with minimalist design laboratory art direction.

<p align="center">
  <img src="assets/brand/cario-uncompromised-architecture.png" alt="CARIO — Uncompromised Architecture" width="48%">
  <img src="assets/brand/cario-deconstruct-velocity.png" alt="CARIO — Deconstruct Velocity Feature Spotlight" width="48%">
</p>

* **Left (Launch Campaign):** *Uncompromised Architecture* — Demonstrating the obsidian studio environment, controlled linear softbox lighting, and low-profile aerodynamic silhouette.
* **Right (Feature Spotlight):** *Deconstruct Velocity* — Highlighting the transition from structural CAD wireframe to finished carbon composite, paired with active mode indicators (`01 EXTERIOR`, `03 ENGINE`, `07 SOUND`, `08 TRACK`).

---

## User Experience & Design Philosophy

### Cinematic Futuristic Minimalism
* **Obsidian Foundation:** The viewport utilizes an ultra-dark graphite surface (`#08090C`), directing full visual weight to the machine and telemetry overlays.
* **Precision Studio Lighting:** Illumination relies on a single overhead linear softbox casting a continuous specular highlight across the vehicle's spine, accented by cool-blue perimeter rim lighting.
* **Motorsport Monospace Typography:** Data metrics and technical indicators use micro-uppercase monospace typography to reflect real-world flight test and telemetry instrumentation.
* **Elimination of Clutter:** No decorative gradients or superfluous animations. Every screen control corresponds to an actual camera translation or inspection state.

---

## Technology Stack

### Core Technologies
* **Language:** JavaScript (ES6+)
* **Rendering Engine:** WebGL / Three.js
* **Application Framework:** React / Next.js
* **Styling & HUD:** CSS3 Modules / Flexbox & CSS Grid Overlay Architecture
* **3D Geometry Pipeline:** Optimized Binary glTF (`.glb`) assets

---

## Project Architecture

```bash
cario/
├── assets/
│   ├── brand/
│   │   ├── cario-uncompromised-architecture.png   # Product Launch Campaign Poster
│   │   └── cario-deconstruct-velocity.png         # Feature Spotlight Poster
│   ├── models/                                    # Optimized 3D vehicle assets (.glb)
│   └── textures/                                  # Studio environment maps and PBR materials
├── src/
│   ├── components/
│   │   ├── 3D/                                    # Canvas, Scene, Lights, OrbitalControls
│   │   ├── HUD/                                   # TelemetryHUD, SpecsOverlay, ModeRail
│   │   └── Navigation/                            # FilterDeck, Timeline, TopBar
│   ├── data/
│   │   └── vehicles.json                          # Vehicle specs, lineage, and telemetry data
│   ├── pages/                                     # Application views and routing
│   └── styles/                                    # Technical typography and HUD styling
├── public/                                        # Static web assets
├── package.json                                   # Dependencies and build scripts
└── README.md                                      # Documentation
```

---

## My Contribution

* **3D Scene Staging & Lighting:** Configured the custom studio lighting layout (overhead linear softbox, contact shadow ground planes, and cool-blue silhouette rim lights).
* **HUD & Interaction Design:** Designed and developed the 8-stage inspection rail, monospace telemetry overlays, and responsive vehicle filter system.
* **Information Architecture:** Structured the automotive database schema (`vehicles.json`) linking performance figures, chassis codes, and historical records to the interactive UI.
* **Camera Systems:** Implemented smooth spherical camera transitions between macro exterior orbits and micro powertrain viewpoints.

---

## Future Improvements

- [ ] **Custom PBR Clearcoat Shaders:** Develop custom GLSL shaders to reproduce multi-layer automotive paint and exposed carbon fiber weave.
- [ ] **Acoustic Engine Synthesizer:** Implement the Web Audio API to reproduce procedural, RPM-responsive exhaust acoustics.
- [ ] **Dual-Vehicle Benchmark Mode:** Side-by-side comparative telemetry inspection between two selected chassis.
- [ ] **Dynamic LOD Loading:** Automated level-of-detail model streaming based on client device capability.

---

## Project Metadata

| Attribute | Specification |
| :--- | :--- |
| **Project Name** | CARIO |
| **Type** | Interactive 3D Web Application / Design Showcase |
| **Category** | Automotive Digital Proving Ground |
| **Status** | Active Prototype / Core Navigation & Telemetry Implemented |
| **License** | MIT License |

---

## Closing Statement

CARIO is founded on the principle that high-performance vehicles are masterworks of engineering. By combining real-time telemetry, 3D visualization, and editorial restraint, CARIO offers a disciplined digital space to explore the apex of velocity.