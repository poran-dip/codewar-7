import * as THREE from 'three'

export default function Sky() {
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[20, 32, 32]} />
      <meshBasicMaterial side={THREE.BackSide} color="#0d001f" />
    </mesh>
  )
}
