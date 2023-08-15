import * from 'three';

onmessage = (e) => {
  console.log('worker received message:', e.data);
  console.log(new THREE.Vector3(1, 2, 3));
};

function doStuff() {
  postMessage({ message: 'I am alive' });
}

doStuff();
