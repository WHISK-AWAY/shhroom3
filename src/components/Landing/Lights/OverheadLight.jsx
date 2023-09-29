export default function OverheadLight({ lightIsOn }) {
  return (
    <>
      <directionalLight
        intensity={lightIsOn ? 0.47 : 0}
        color={'#528fba'}
        position={[3.8, 2.6, 0]}
      />
      <directionalLight
        intensity={lightIsOn ? 0.2 : 0}
        color='#245f3d'
        position={[-3, -3, 20]}
      />
    </>
  );
}
