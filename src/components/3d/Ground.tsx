export default function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#101020"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      <gridHelper args={[30, 30, '#6f00ff', '#220044']} position={[0, -1.19, 0]} />
    </>
  )
}
