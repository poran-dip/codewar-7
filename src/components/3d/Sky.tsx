import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const vertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  varying vec3 vPosition;
  
  void main() {
    float y = vPosition.y / 20.0;
    vec3 color1 = vec3(0.04, 0.01, 0.1);  // Deep purple-black
    vec3 color2 = vec3(0.1, 0.02, 0.2);   // Dark purple
    vec3 color3 = vec3(0.2, 0.05, 0.3);   // Purple
    
    float mix1 = smoothstep(-1.0, 0.0, y);
    float mix2 = smoothstep(0.0, 1.0, y);
    
    vec3 gradient = mix(color1, color2, mix1);
    gradient = mix(gradient, color3, mix2);
    
    // Subtle animated stars/noise
    float noise = fract(sin(dot(vPosition.xz * 0.5, vec2(12.9898, 78.233)) + time) * 43758.5453);
    if (noise > 0.998) {
      gradient += vec3(0.3, 0.6, 1.0) * (noise - 0.998) * 500.0;
    }
    
    gl_FragColor = vec4(gradient, 1.0);
  }
`

export default function Sky() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[20, 16, 16]} />
      <shaderMaterial
        ref={materialRef}
        side={THREE.BackSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 }
        }}
      />
    </mesh>
  )
}
