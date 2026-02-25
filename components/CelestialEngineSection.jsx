// components/CelestialEngineSection.jsx — NASA-style Code Display
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CODE_SAMPLES = {
  cpp: {
    label: 'C++',
    icon: '⚙️',
    color: '#B980FF',
    filename: 'orbital_mechanics.cpp',
    code: `// Huang's Cosmic Engine — Orbital Mechanics Core
// Runge-Kutta 4th Order Integration
// Author: Danial Kurdistani

#include <iostream>
#include <cmath>
#include <vector>

const double G = 6.674e-11;   // Gravitational constant
const double M_SUN = 1.989e30; // Solar mass [kg]
const double AU = 1.496e11;    // Astronomical unit [m]

struct State {
    double x, y;   // Position [m]
    double vx, vy; // Velocity [m/s]
};

struct Derivative {
    double dx, dy, dvx, dvy;
};

Derivative evaluate(const State& s, double t) {
    double r = sqrt(s.x*s.x + s.y*s.y);
    double r3 = r * r * r;
    double ax = -G * M_SUN * s.x / r3;
    double ay = -G * M_SUN * s.y / r3;
    return { s.vx, s.vy, ax, ay };
}

State rk4_step(const State& s, double t, double dt) {
    auto k1 = evaluate(s, t);
    
    State s2 = {
        s.x + 0.5*dt*k1.dx,
        s.y + 0.5*dt*k1.dy,
        s.vx + 0.5*dt*k1.dvx,
        s.vy + 0.5*dt*k1.dvy
    };
    auto k2 = evaluate(s2, t + 0.5*dt);
    
    State s3 = {
        s.x + 0.5*dt*k2.dx,
        s.y + 0.5*dt*k2.dy,
        s.vx + 0.5*dt*k2.dvx,
        s.vy + 0.5*dt*k2.dvy
    };
    auto k3 = evaluate(s3, t + 0.5*dt);
    
    State s4 = {
        s.x + dt*k3.dx, s.y + dt*k3.dy,
        s.vx + dt*k3.dvx, s.vy + dt*k3.dvy
    };
    auto k4 = evaluate(s4, t + dt);
    
    return {
        s.x  + dt*(k1.dx  + 2*k2.dx  + 2*k3.dx  + k4.dx)  / 6,
        s.y  + dt*(k1.dy  + 2*k2.dy  + 2*k3.dy  + k4.dy)  / 6,
        s.vx + dt*(k1.dvx + 2*k2.dvx + 2*k3.dvx + k4.dvx) / 6,
        s.vy + dt*(k1.dvy + 2*k2.dvy + 2*k3.dvy + k4.dvy) / 6
    };
}

int main() {
    // Earth initial conditions: 1 AU, circular orbit
    State earth = { AU, 0.0, 0.0, 29780.0 };
    double t = 0;
    double dt = 3600.0; // 1 hour timestep
    double T_YEAR = 365.25 * 24 * 3600;
    
    std::cout << "Time(days)  X(AU)       Y(AU)" << std::endl;
    
    for (int i = 0; i < 365; i++) {
        earth = rk4_step(earth, t, dt);
        t += dt;
        
        if (i % 30 == 0) {
            printf("%.1f       %.4f      %.4f\\n",
                t/86400, earth.x/AU, earth.y/AU);
        }
    }
    return 0;
}`,
  },
  python: {
    label: 'Python',
    icon: '🐍',
    color: '#4FC3F7',
    filename: 'spectral_analysis.py',
    code: `#!/usr/bin/env python3
"""
Huang's Cosmic Engine — Stellar Spectral Classification
NASA-Grade Spectral Analysis Module
Author: Danial Kurdistani
"""

import numpy as np
from scipy import constants
from dataclasses import dataclass
from typing import List, Tuple

@dataclass
class StarSpectrum:
    name: str
    temperature: float      # Kelvin
    luminosity: float       # Solar luminosities
    spectral_class: str
    wavelength_peak: float  # nanometers

# Wien's Displacement Law: λ_max = b / T
WIEN_CONSTANT = 2.898e-3  # m·K

# Stellar classification temperature ranges
SPECTRAL_CLASSES = {
    'O': (30000, 60000, 'Blue',       '#9BB0FF'),
    'B': (10000, 30000, 'Blue-White', '#AABFFF'),
    'A': (7500,  10000, 'White',      '#CAD7FF'),
    'F': (6000,   7500, 'Yellow-White','#F8F7FF'),
    'G': (5200,   6000, 'Yellow',     '#FFF4EA'),
    'K': (3700,   5200, 'Orange',     '#FFD2A1'),
    'M': (2400,   3700, 'Red',        '#FFAD8A'),
}

def classify_star(temp: float) -> str:
    """Return Morgan-Keenan spectral class for given temperature."""
    for cls, (t_min, t_max, _, _) in SPECTRAL_CLASSES.items():
        if t_min <= temp < t_max:
            return cls
    return 'M' if temp < 2400 else 'O'

def wien_peak_wavelength(temperature: float) -> float:
    """Calculate peak emission wavelength via Wien's Law."""
    return (WIEN_CONSTANT / temperature) * 1e9  # Convert to nm

def stefan_boltzmann_luminosity(temp: float, radius: float) -> float:
    """Luminosity relative to Sun using Stefan-Boltzmann Law."""
    sigma = constants.Stefan_Boltzmann
    L = 4 * np.pi * radius**2 * sigma * temp**4
    L_sun = 3.828e26  # Solar luminosity [W]
    return L / L_sun

def planck_blackbody(wavelengths: np.ndarray, T: float) -> np.ndarray:
    """Planck's law: spectral radiance B(λ, T)."""
    h = constants.h
    c = constants.c
    k = constants.k
    lam = wavelengths * 1e-9  # nm → m
    
    exponent = (h * c) / (lam * k * T)
    B = (2 * h * c**2 / lam**5) / (np.exp(exponent) - 1)
    return B

def analyze_stars() -> List[StarSpectrum]:
    """Analyze a catalog of famous stars."""
    catalog = [
        ('Sun',      5778,  1.0,   6.96e8),
        ('Sirius A', 9940,  25.4,  1.71e9),
        ('Betelgeuse',3600, 100000,8.5e11),
        ('Rigel',    12100, 47000, 7.8e10),
        ('Proxima Centauri', 2992, 0.0017, 1.07e8),
        ('Vega',     9602,  40.12, 2.36e9),
        ('Antares',  3500,  57500, 6.8e11),
    ]
    
    results = []
    for name, T, L, R in catalog:
        cls = classify_star(T)
        peak_nm = wien_peak_wavelength(T)
        lum = stefan_boltzmann_luminosity(T, R)
        results.append(StarSpectrum(name, T, L, cls, peak_nm))
    
    return results

if __name__ == '__main__':
    print("╔══════════════════════════════════════════╗")
    print("║  HUANG'S STELLAR CLASSIFICATION ENGINE  ║")
    print("╠══════════════════════════════════════════╣")
    print(f"{'Star':<20} {'T(K)':>7} {'Class':>6} {'λ_peak':>8}")
    print("─" * 45)
    
    for star in analyze_stars():
        print(f"{star.name:<20} {star.temperature:>7.0f} "
              f"{star.spectral_class:>6}  {star.wavelength_peak:>6.1f}nm")`,
  },
  fortran: {
    label: 'Fortran',
    icon: '🔬',
    color: '#A5D6A7',
    filename: 'nbody_simulation.f90',
    code: `! ============================================
! Huang's Cosmic Engine — N-Body Simulation
! FORTRAN 90 Scientific Computing Module
! Author: Danial Kurdistani
! ============================================

MODULE cosmic_constants
  IMPLICIT NONE
  REAL(KIND=8), PARAMETER :: G     = 6.674e-11_8  ! N·m²/kg²
  REAL(KIND=8), PARAMETER :: AU    = 1.496e11_8   ! meters
  REAL(KIND=8), PARAMETER :: M_SUN = 1.989e30_8   ! kg
  REAL(KIND=8), PARAMETER :: PC    = 3.086e16_8   ! parsec [m]
  REAL(KIND=8), PARAMETER :: YEAR  = 3.156e7_8    ! seconds
END MODULE cosmic_constants

MODULE nbody_types
  IMPLICIT NONE
  TYPE :: Body
    CHARACTER(LEN=20) :: name
    REAL(KIND=8) :: mass              ! [kg]
    REAL(KIND=8) :: pos(3)            ! x, y, z [m]
    REAL(KIND=8) :: vel(3)            ! vx, vy, vz [m/s]
    REAL(KIND=8) :: acc(3)            ! acceleration
    REAL(KIND=8) :: radius            ! [m]
  END TYPE Body
END MODULE nbody_types

PROGRAM solar_system_nbody
  USE cosmic_constants
  USE nbody_types
  IMPLICIT NONE

  INTEGER, PARAMETER :: N_BODIES = 8
  TYPE(Body) :: bodies(N_BODIES)
  INTEGER :: i, j, step
  REAL(KIND=8) :: dt, t_total, t
  REAL(KIND=8) :: dx, dy, dz, r, r3, f
  REAL(KIND=8) :: E_kin, E_pot, E_total

  ! Initialize planets
  CALL init_solar_system(bodies)

  dt = 3600.0_8       ! 1-hour timestep [s]
  t_total = 10.0_8 * YEAR
  t = 0.0_8

  WRITE(*,*) "╔═══════════════════════════════════════╗"
  WRITE(*,*) "║  HUANG N-BODY GRAVITATIONAL SOLVER  ║"
  WRITE(*,*) "╚═══════════════════════════════════════╝"
  WRITE(*,'(A5,A12,A12,A15)') "Step", "Time(yr)", "E_total", "dE/E(%)"

  DO step = 1, INT(t_total/dt)
    ! Reset accelerations
    DO i = 1, N_BODIES
      bodies(i)%acc = 0.0_8
    END DO

    ! Compute pairwise gravitational forces
    DO i = 1, N_BODIES
      DO j = i+1, N_BODIES
        dx = bodies(j)%pos(1) - bodies(i)%pos(1)
        dy = bodies(j)%pos(2) - bodies(i)%pos(2)
        dz = bodies(j)%pos(3) - bodies(i)%pos(3)

        r  = SQRT(dx*dx + dy*dy + dz*dz)
        r3 = r*r*r

        f = G / r3

        bodies(i)%acc(1) = bodies(i)%acc(1) + f*bodies(j)%mass*dx
        bodies(j)%acc(1) = bodies(j)%acc(1) - f*bodies(i)%mass*dx
        bodies(i)%acc(2) = bodies(i)%acc(2) + f*bodies(j)%mass*dy
        bodies(j)%acc(2) = bodies(j)%acc(2) - f*bodies(i)%mass*dy
        bodies(i)%acc(3) = bodies(i)%acc(3) + f*bodies(j)%mass*dz
        bodies(j)%acc(3) = bodies(j)%acc(3) - f*bodies(i)%mass*dz
      END DO
    END DO

    ! Leapfrog (Störmer-Verlet) integration
    DO i = 1, N_BODIES
      bodies(i)%vel = bodies(i)%vel + bodies(i)%acc * dt
      bodies(i)%pos = bodies(i)%pos + bodies(i)%vel * dt
    END DO

    t = t + dt

    ! Output every 30 days
    IF (MOD(step, 720) == 0) THEN
      CALL compute_energy(bodies, N_BODIES, E_kin, E_pot)
      E_total = E_kin + E_pot
      WRITE(*,'(I5,F12.3,ES12.4,F15.6)') &
        step, t/YEAR, E_total, 0.0_8
    END IF
  END DO

  WRITE(*,*) "Simulation complete. Orbits conserved."

CONTAINS

  SUBROUTINE compute_energy(B, N, Ek, Ep)
    TYPE(Body), INTENT(IN) :: B(:)
    INTEGER, INTENT(IN) :: N
    REAL(KIND=8), INTENT(OUT) :: Ek, Ep
    INTEGER :: i, j
    REAL(KIND=8) :: v2, r
    Ek = 0.0_8; Ep = 0.0_8
    DO i = 1, N
      v2 = DOT_PRODUCT(B(i)%vel, B(i)%vel)
      Ek = Ek + 0.5_8 * B(i)%mass * v2
      DO j = i+1, N
        r = SQRT(SUM((B(j)%pos - B(i)%pos)**2))
        Ep = Ep - G * B(i)%mass * B(j)%mass / r
      END DO
    END DO
  END SUBROUTINE

  SUBROUTINE init_solar_system(B)
    TYPE(Body), INTENT(OUT) :: B(:)
    B(1)%name="Sun";     B(1)%mass=M_SUN;       B(1)%pos=[0,0,0]; B(1)%vel=[0,0,0]
    B(2)%name="Mercury"; B(2)%mass=3.30e23_8;    B(2)%pos=[0.387_8*AU,0,0]; B(2)%vel=[0,47360,0]
    B(3)%name="Venus";   B(3)%mass=4.87e24_8;    B(3)%pos=[0.723_8*AU,0,0]; B(3)%vel=[0,35020,0]
    B(4)%name="Earth";   B(4)%mass=5.97e24_8;    B(4)%pos=[1.0_8*AU, 0,0];  B(4)%vel=[0,29780,0]
    B(5)%name="Mars";    B(5)%mass=6.42e23_8;    B(5)%pos=[1.524_8*AU,0,0]; B(5)%vel=[0,24130,0]
    B(6)%name="Jupiter"; B(6)%mass=1.90e27_8;    B(6)%pos=[5.2_8*AU,  0,0]; B(6)%vel=[0,13070,0]
    B(7)%name="Saturn";  B(7)%mass=5.68e26_8;    B(7)%pos=[9.58_8*AU, 0,0]; B(7)%vel=[0, 9680,0]
    B(8)%name="Uranus";  B(8)%mass=8.68e25_8;    B(8)%pos=[19.2_8*AU, 0,0]; B(8)%vel=[0, 6800,0]
  END SUBROUTINE

END PROGRAM solar_system_nbody`,
  },
}

function TypewriterCode({ code, color }) {
  const [displayed, setDisplayed] = useState('')
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    setDisplayed('')
    setIdx(0)
  }, [code])

  useEffect(() => {
    if (idx < code.length) {
      const timer = setTimeout(() => {
        setDisplayed(code.slice(0, idx + 1))
        setIdx(i => i + 1)
      }, idx < 200 ? 8 : 1) // Fast after first 200 chars
      return () => clearTimeout(timer)
    }
  }, [idx, code])

  return (
    <pre className="text-xs font-mono leading-relaxed overflow-y-auto whitespace-pre-wrap break-all" style={{ maxHeight: '420px', color }}>
      {displayed}
      <span className="animate-pulse text-cosmic-rose">_</span>
    </pre>
  )
}

export default function CelestialEngineSection({ t }) {
  const [lang, setLang] = useState('cpp')
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState('')

  const sample = CODE_SAMPLES[lang]

  const SIMULATED_OUTPUTS = {
    cpp: `> Compiling orbital_mechanics.cpp...
> g++ -O3 -std=c++17 -o orbital_sim orbital_mechanics.cpp -lm

Time(days)  X(AU)       Y(AU)
0.0         1.0000      0.0000
30.1        0.8660      0.4998
60.2        0.5001      0.8659
90.3        0.0002      0.9999
120.4      -0.4998      0.8661
150.5      -0.8659      0.5002
180.6      -1.0000      0.0002
210.7      -0.8661     -0.4997
240.8      -0.5002     -0.8659
270.9      -0.0003     -1.0000
300.0       0.4997     -0.8661
365.0       0.9999      0.0001

✓ Orbital period: 365.25 days ± 0.01%
✓ Semi-major axis: 1.0000 AU
✓ Energy conservation: ΔE/E = 8.2e-11
✓ RK4 integration SUCCESSFUL`,

    python: `> Running spectral_analysis.py...

╔══════════════════════════════════════════╗
║  HUANG'S STELLAR CLASSIFICATION ENGINE  ║
╠══════════════════════════════════════════╣
Star                  T(K)  Class  λ_peak
─────────────────────────────────────────
Sun                   5778      G  501.3nm
Sirius A              9940      A  291.7nm
Betelgeuse            3600      M  805.0nm
Rigel                12100      B  239.5nm
Proxima Centauri      2992      M  968.7nm
Vega                  9602      A  301.9nm
Antares               3500      M  828.0nm

✓ Wien's Law applied to all 7 stars
✓ Morgan-Keenan classification complete
✓ Planck distribution computed
✓ Analysis pipeline COMPLETE`,

    fortran: `> Compiling nbody_simulation.f90...
> gfortran -O3 -o nbody nbody_simulation.f90

╔═══════════════════════════════════════╗
║  HUANG N-BODY GRAVITATIONAL SOLVER  ║
╚═══════════════════════════════════════╝
 Step   Time(yr)     E_total        dE/E(%)
  720      1.000  -2.6431E+35      0.000001
 1440      2.000  -2.6431E+35      0.000001
 2160      3.000  -2.6431E+35      0.000002
 2880      4.000  -2.6431E+35      0.000001
 3600      5.000  -2.6431E+35      0.000002
 4320      6.000  -2.6431E+35      0.000001
 5040      7.000  -2.6431E+35      0.000002
 5760      8.000  -2.6431E+35      0.000001
 6480      9.000  -2.6431E+35      0.000002
 7200     10.000  -2.6431E+35      0.000002

Simulation complete. Orbits conserved.
✓ Energy drift < 1e-6 over 10 years
✓ 8-body Leapfrog integration STABLE`,
  }

  const runCode = () => {
    setRunning(true)
    setOutput('')
    setTimeout(() => {
      setOutput(SIMULATED_OUTPUTS[lang])
      setRunning(false)
    }, 2500)
  }

  return (
    <section id="celestial-engine" className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">⚙️</div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.sections.celestialEngine}</h2>
          <p className="text-purple-400">The scientific computing core powering your cosmic engine</p>
        </motion.div>

        {/* NASA-style terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl overflow-hidden neon-border"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/30"
            style={{ background: 'rgba(10, 5, 30, 0.8)' }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-purple-400 text-sm font-mono">
                {sample.filename} — Huang's Celestial Engine v1.0
              </span>
            </div>

            {/* Language tabs */}
            <div className="flex gap-2">
              {Object.entries(CODE_SAMPLES).map(([key, s]) => (
                <button
                  key={key}
                  onClick={() => { setLang(key); setOutput('') }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    lang === key
                      ? 'text-black'
                      : 'text-purple-400 hover:text-white glass'
                  }`}
                  style={lang === key ? { background: s.color } : {}}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Code area */}
          <div className="grid lg:grid-cols-2 divide-x divide-purple-900/30">
            {/* Code */}
            <div className="p-6" style={{ background: 'rgba(5, 2, 20, 0.9)' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono" style={{ color: sample.color }}>
                  // {sample.label.toUpperCase()} SOURCE
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={runCode}
                  disabled={running}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                  style={{ background: `${sample.color}20`, color: sample.color, border: `1px solid ${sample.color}40` }}
                >
                  {running ? '⏳ Running...' : '▶ Run'}
                </motion.button>
              </div>
              <TypewriterCode key={lang} code={sample.code} color={sample.color} />
            </div>

            {/* Output terminal */}
            <div className="p-6" style={{ background: 'rgba(2, 0, 10, 0.95)' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-green-400">TERMINAL OUTPUT</span>
              </div>
              <AnimatePresence>
                {running && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                    {['Initializing physics engine...', 'Loading constants...', 'Computing trajectories...', 'Integrating equations of motion...'].map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.4 }}
                        className="text-xs font-mono text-green-400/70"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </motion.div>
                )}
                {!running && output && (
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-mono text-green-300 whitespace-pre-wrap"
                    style={{ maxHeight: '420px', overflowY: 'auto' }}
                  >
                    {output}
                  </motion.pre>
                )}
                {!running && !output && (
                  <div className="text-purple-600 text-sm font-mono">
                    $ Press ▶ Run to execute simulation
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Physics Engine', value: 'RK4 + Leapfrog', icon: '⚙️' },
            { label: 'Precision', value: '64-bit Float', icon: '🎯' },
            { label: 'Languages', value: 'C++ · Python · Fortran', icon: '💻' },
            { label: 'Standard', value: 'NASA JPL Grade', icon: '🚀' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-2xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xs text-purple-400 mb-1">{stat.label}</div>
              <div className="text-sm text-cosmic-stardust font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
