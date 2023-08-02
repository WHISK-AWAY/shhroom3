import { Bloom, EffectComposer, SMAA, SSAO } from '@react-three/postprocessing';
import {
  BlurPass,
  BlendFunction,
  Resizer,
  KernelSize,
  Resolution,
  RenderPass,
} from 'postprocessing';

export default function SceneEffects() {
  return (
    <EffectComposer multisampling={1}>
      <SMAA />
      <Bloom
        intensity={0.9} // The bloom intensity.
        blurPass={undefined} // A blur pass.
        kernelSize={KernelSize.LARGE} // blur kernel size
        luminanceThreshold={1.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={1.5} // smoothness of the luminance threshold. Range is [0, 1]
        mipmapBlur={true} // Enables or disables mipmap blur.
        resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
        resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
      />
    </EffectComposer>
  );
}
