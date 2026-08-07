import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../theme'

function NeuralNetwork({ ink, signal, oxide }: { ink: string; signal: string; oxide: string }) {
  const group = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const layers = [4, 7, 7, 4]
    const spacing = 1.4
    layers.forEach((count, li) => {
      const x = (li - (layers.length - 1) / 2) * spacing
      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 0.58
        const z = Math.sin(i * 1.7 + li) * 0.28
        pts.push(new THREE.Vector3(x, y, z))
      }
    })
    return pts
  }, [])

  const edges = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = []
    const layers = [4, 7, 7, 4]
    let offset = 0
    for (let li = 0; li < layers.length - 1; li++) {
      const aCount = layers[li]
      const bCount = layers[li + 1]
      for (let i = 0; i < aCount; i++) {
        for (let j = 0; j < bCount; j++) {
          if ((i + j + li) % 2 === 0 || (i * j) % 3 === 0) {
            lines.push([nodes[offset + i], nodes[offset + aCount + j]])
          }
        }
      }
      offset += aCount
    }
    return lines
  }, [nodes])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.18) * 0.32
    group.current.rotation.x = Math.cos(t * 0.14) * 0.1
  })

  return (
    <group ref={group} scale={1.2}>
      {edges.map((pair, i) => (
        <Line
          key={`e-${i}`}
          points={pair}
          color={ink}
          transparent
          opacity={0.12 + (i % 5) * 0.015}
          lineWidth={1}
        />
      ))}
      {nodes.map((p, i) => (
        <Float key={`n-${i}`} speed={1 + (i % 4) * 0.15} floatIntensity={0.18} rotationIntensity={0.08}>
          <Sphere args={[0.065 + (i % 3) * 0.012, 16, 16]} position={p}>
            <meshStandardMaterial
              color={i % 7 === 0 ? signal : i % 3 === 0 ? oxide : ink}
              roughness={0.7}
              metalness={0.05}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0.15, 0]}>
      <torusGeometry args={[radius, 0.004, 12, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.14} />
    </mesh>
  )
}

function Particles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const arr = new Float32Array(140 * 3)
    for (let i = 0; i < 140; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.015
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.018} color={color} transparent opacity={0.28} sizeAttenuation />
    </points>
  )
}

export function NeuralScene() {
  const { theme } = useTheme()
  const ink = theme === 'dark' ? '#E8EEF4' : '#12161C'
  const signal = theme === 'dark' ? '#E85D3D' : '#C23B22'
  const oxide = theme === 'dark' ? '#3DBA8E' : '#1A5F4A'
  const dust = theme === 'dark' ? '#9AA6B5' : '#5A6570'

  return (
    <Canvas
      key={theme}
      camera={{ position: [0, 0, 7.4], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={theme === 'dark' ? 0.7 : 0.95} />
      <directionalLight position={[3, 4, 5]} intensity={theme === 'dark' ? 0.7 : 0.55} color="#ffffff" />
      <directionalLight position={[-4, -1, 2]} intensity={0.25} color={oxide} />
      <Particles color={dust} />
      <OrbitRing radius={3.1} speed={0.06} color={ink} />
      <OrbitRing radius={3.55} speed={-0.04} color={signal} />
      <OrbitRing radius={4} speed={0.03} color={oxide} />
      <NeuralNetwork ink={ink} signal={signal} oxide={oxide} />
    </Canvas>
  )
}
