import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing';

export default function MonitorLight() {
  // const [monitorTarget] = useState(() => new THREE.Object3D());

  // const { intensity, distance, color, attenuation, anglePower, angle } =
  //   useControls("Computer Monitor Light", {
  //     intensity: {
  //       value: 2,
  //       min: 0,
  //       max: 10,
  //     },
  //     distance: {
  //       value: 1,
  //       min: 1,
  //       max: 10,
  //     },
  //     color: {
  //       value: "#6bc8ff",
  //     },
  //     attenuation: {
  //       value: 10,
  //       min: 0,
  //       max: 50,
  //     },
  //     anglePower: {
  //       value: 0,
  //       min: 0,
  //       max: 10,
  //     },
  //     angle: {
  //       value: 0.9,
  //       min: 0,
  //       max: Math.PI / 2,
  //     },
  //   });

  // const { targetX, targetY, targetZ } = useControls("Monitor Target", {
  //   targetX: {
  //     value: 30.0,
  //     min: -50,
  //     max: 30,
  //   },
  //   targetY: {
  //     value: 6.3,
  //     min: -2,
  //     max: 30,
  //   },
  //   targetZ: {
  //     value: 2.5,
  //     min: -20,
  //     max: 30,
  //   },
  // });

  // const { x, y, z } = useControls("Monitor light position", {
  //   x: {
  //     value: 3.2,
  //     min: 0,
  //     max: 20,
  //   },
  //   y: {
  //     value: 3,
  //     min: 0,
  //     max: 20,
  //   },
  //   z: {
  //     value: 1.6,
  //     min: 0,
  //     max: 20,
  //   },
  // });
  return (
    // <>
    //   <SpotLight
    //     intensity={intensity}
    //     color={color}
    //     position={[x, y, z]}
    //     target={monitorTarget}
    //     shadowCameraFov={undefined}
    //     shadowCameraLeft={undefined}
    //     shadowCameraRight={undefined}
    //     shadowCameraTop={undefined}
    //     shadowCameraBottom={undefined}
    //     shadowCameraNear={undefined}
    //     shadowCameraFar={undefined}
    //     shadowBias={undefined}
    //     shadowMapWidth={undefined}
    //     shadowMapHeight={undefined}
    //     attenuation={attenuation}
    //     anglePower={anglePower}
    //     distance={distance}
    //     angle={angle}
    //   />
    //   <primitive
    //     object={monitorTarget}
    //     position={new THREE.Vector3(targetX, targetY, targetZ)}
    //   />
    // </>

    <EffectComposer>
      <Bloom
        intensity={0.9} // The bloom intensity.
        blurPass={undefined} // A blur pass.
        kernelSize={KernelSize.LARGE} // blur kernel size
        luminanceThreshold={1} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        mipmapBlur={false} // Enables or disables mipmap blur.
        resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
        resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
      />
    </EffectComposer>
  );
}
