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
    const spacing = 1.35
    layers.forEach((count, li) => {
      const x = (li - (layers.length - 1) / 2) * spacing
      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 0.58
        const z = Math.sin(i * 1.7 + li) * 0.32
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

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    // Natural subtle rotation combined with mouse pointer parallax
    const targetY = Math.sin(t * 0.16) * 0.22 + state.pointer.x * 0.38
    const targetX = Math.cos(t * 0.12) * 0.08 - state.pointer.y * 0.28
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3.5, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3.5, delta)
  })

  return (
    <group ref={group} scale={1.22}>
      {edges.map((pair, i) => (
        <Line
          key={`e-${i}`}
          points={pair}
          color={ink}
          transparent
          opacity={0.14 + (i % 5) * 0.02}
          lineWidth={1}
        />
      ))}
      {nodes.map((p, i) => (
        <Float key={`n-${i}`} speed={1 + (i % 4) * 0.15} floatIntensity={0.16} rotationIntensity={0.06}>
          <Sphere args={[0.068 + (i % 3) * 0.012, 16, 16]} position={p}>
            <meshStandardMaterial
              color={i % 7 === 0 ? signal : i % 3 === 0 ? oxide : ink}
              emissive={i % 7 === 0 ? signal : i % 3 === 0 ? oxide : '#000000'}
              emissiveIntensity={i % 7 === 0 ? 0.35 : i % 3 === 0 ? 0.25 : 0}
              roughness={0.6}
              metalness={0.1}
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
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0.16, 0]}>
      <torusGeometry args={[radius, 0.0035, 12, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  )
}

function Particles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const arr = new Float32Array(160 * 3)
    for (let i = 0; i < 160; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.018} color={color} transparent opacity={0.32} sizeAttenuation />
    </points>
  )
}

export function NeuralScene() {
  const { theme } = useTheme()
  const ink = theme === 'dark' ? '#F0F4F8' : '#0B0F15'
  const signal = theme === 'dark' ? '#FF4D2E' : '#EA3815'
  const oxide = theme === 'dark' ? '#22C55E' : '#15803D'
  const dust = theme === 'dark' ? '#8C9BB0' : '#4B5565'

  return (
    <Canvas
      key={theme}
      camera={{ position: [0, 0, 7.2], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={theme === 'dark' ? 0.75 : 0.95} />
      <directionalLight position={[3, 4, 5]} intensity={theme === 'dark' ? 0.8 : 0.65} color="#ffffff" />
      <directionalLight position={[-4, -1, 2]} intensity={0.35} color={oxide} />
      <Particles color={dust} />
      <OrbitRing radius={3.1} speed={0.05} color={ink} />
      <OrbitRing radius={3.6} speed={-0.035} color={signal} />
      <OrbitRing radius={4.1} speed={0.025} color={oxide} />
      <NeuralNetwork ink={ink} signal={signal} oxide={oxide} />
    </Canvas>
  )
}
