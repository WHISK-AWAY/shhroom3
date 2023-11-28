import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

export function exportGltf(scene) {
  const exporter = new GLTFExporter();

  exporter.parse(
    scene,
    (gltf) => {
      // console.log(gltf);
      saveArrayBuffer(gltf, 'testing.glb');
    },
    (error) => {
      console.log('god damnit', error);
    },
    {
      onlyVisible: false,
      binary: true,
    },
  );

  return;
}

function saveArrayBuffer(buffer, filename) {
  const link = document.createElement('a');

  if (link.href) URL.revokeObjectURL(link.href);

  link.href = URL.createObjectURL(
    new Blob([buffer], { type: 'application/octet-stream' }),
  );

  link.download = filename || 'no_filename_given.glb';
  link.dispatchEvent(new MouseEvent('click'));
  return;
  // save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}
