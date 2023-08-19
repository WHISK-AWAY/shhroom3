import { LandingContext } from '../../lib/context';
import { useContext } from 'react';
import { Billboard, Text3D, Plane, Svg } from '@react-three/drei';
import escButton from '../../../public/svg/esc_button.svg'
import { Vector3 } from 'three';


export default function EscBtnUtils({pos = [0, 0, 0],tl,  scale = [1, 1, 1], rotation=[0, 0, 0]}) {
  // const pos = [x, y, z];
  // const dimensions = [width, height];
  // const tl = landingContext.targetLabel;
  const landingContext = useContext(LandingContext);
  // const scale = [x, y, z];

  return (
    <>

    <Billboard
    position={pos}
    rotation={rotation}
    visible={landingContext.targetLabel=== tl}
    follow={true}
    lockX={true}
    lockY={true}
    lockZ={true}
    scale={scale}
    >

        <Plane
          args={[.7, .12]}
          position={[0, 0, 0]}
          onClick={() => {
            if (landingContext.targetLabel === tl) {
              console.log('tl pos', tl)
              landingContext.releaseZoom();
            } else return;
          }}
        >
          <meshBasicMaterial color='#ff0000' transparent opacity={0} />
        </Plane>
        <Text3D
        // rotation={[0, Math.PI / 2, 0]}
        position={[-.34, 0, .010]}
        height={0.01}
        size={.025}
        letterSpacing={0.003}
        font='/fonts/Press Start 2P_Regular.json'
        >
        click
        <meshStandardMaterial
        emissive='#00FFCC'
        emissiveIntensity={2.9}
        toneMapped={false}
        />
        </Text3D>
        <Svg
        src={escButton}
        scale={.012}
        // rotation={}
        position={[-0.07, 0.075, 0.01]}
        />
        <Text3D
        // rotation={[0, Math.PI / 2, 0]}
        position={[.08, 0, 0.01]}
        height={0.01}
        size={0.025}
        outlineWidth='3px'
        letterSpacing={0.003}
        font='/fonts/Press Start 2P_Regular.json'
        >
        to exit
        <meshStandardMaterial
        emissive='#00FFCC'
        emissiveIntensity={2.9}
        toneMapped={false}
        />
        </Text3D>
  
      </Billboard>
    

    </>
  );
}












