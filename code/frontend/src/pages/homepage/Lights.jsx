export default function Lights() {
  return (
    <>
      <ambientLight intensity={5} />
      <directionalLight position={[0, 5, 5]} intensity={3} />
      <pointLight position={[5, 5, 5]}  color="#ff00ff" intensity={13} decay={2} />
      <pointLight position={[-5, 2, 2]} color="#00ffff" intensity={14} decay={2} />
    </>
  );
}