import { Bloom, EffectComposer, SMAA } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

export default function SceneEffects() {
  return (
    <EffectComposer multisampling={0}>
      <SMAA />
      <Bloom
        intensity={0.9} // The bloom intensity.
        kernelSize={KernelSize.LARGE} // blur kernel size
        luminanceThreshold={1.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={1} // smoothness of the luminance threshold. Range is [0, 1]
        mipmapBlur={true} // Enables or disables mipmap blur.
        // blurPass={undefined} // A blur pass.
        // resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
        // resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
      />
    </EffectComposer>
  );
}
