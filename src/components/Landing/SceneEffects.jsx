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
    <EffectComposer multisampling={0}>
      <SMAA />
      <SSAO
        blendFunction={BlendFunction.MULTIPLY} // blend mode
        samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
        rings={4} // amount of rings in the occlusion sampling pattern
        distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
        distanceFalloff={0.0} // distance falloff. min: 0, max: 1
        rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
        rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
        luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
        radius={20} // occlusion sampling radius
        scale={0.5} // scale of the ambient occlusion
        bias={0.5} // occlusion bias
      />

      <Bloom
        intensity={0.9} // The bloom intensity.
        blurPass={undefined} // A blur pass.
        kernelSize={KernelSize.LARGE} // blur kernel size
        luminanceThreshold={1.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={1.5} // smoothness of the luminance threshold. Range is [0, 1]
        mipmapBlur={false} // Enables or disables mipmap blur.
        resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
        resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
      />
    </EffectComposer>
  );
}
