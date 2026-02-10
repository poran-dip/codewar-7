export default function SideProps() {
  return (
    <>
      <mesh position={[-2.5, -0.5, -1]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.6, 1.6, 0.6]} />
        <meshStandardMaterial color="#1a1a2e" metalness={1} roughness={0.2} />
      </mesh>

      <mesh position={[2.5, -0.5, -1]} rotation={[0, -0.5, 0]}>
        <boxGeometry args={[0.6, 1.6, 0.6]} />
        <meshStandardMaterial color="#1a1a2e" metalness={1} roughness={0.2} />
      </mesh>
    </>
  )
}
