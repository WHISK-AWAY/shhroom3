import WindowLightUnit from './WindowLightUnit';

// ! Controls setup is left (commented out) below component in case adjustments are needed

export default function WindowLightVolumetric({ lightIsOn }) {
  const LIGHT_1_SETTINGS = {
    color: {
      value: '#476d8d',
    },
    angle: {
      value: 1.46,
    },
    attenuation: {
      value: lightIsOn ? 4.4 : 0,
    },
    anglePower: {
      value: 7.9,
    },
    distance: {
      value: 30,
    },
    intensity: {
      value: lightIsOn ? 0 : 0,
    },
    penumbra: {
      value: 0.8,
    },
    castShadow: {
      value: true,
    },
  };

  const LIGHT_1_POSITION = {
    x: { value: 4.5 },
    y: { value: 4.4 },
    z: { value: -3.7 },
  };

  const LIGHT_1_TARGET = {
    x: { value: 5.5 },
    y: { value: 0 },
    z: { value: 2.7 },
  };

  const LIGHT_2_SETTINGS = {
    color: {
      value: '#476d8d',
    },
    angle: {
      value: 1.46,
    },
    attenuation: {
      value: lightIsOn ? 4.4 : 0,
    },
    anglePower: {
      value: 7.9,
    },
    distance: {
      value: 30,
    },
    intensity: {
      value: lightIsOn ? 0 : 0,
    },
    penumbra: {
      value: 0.8,
    },
    castShadow: {
      value: true,
    },
  };

  const LIGHT_2_POSITION = {
    x: { value: 4.2 },
    y: { value: 4.4 },
    z: { value: -3.7 },
  };

  const LIGHT_2_TARGET = {
    x: { value: 5.8 },
    y: { value: 0 },
    z: { value: 2.7 },
  };

  const LIGHT_3_SETTINGS = {
    color: {
      value: '#476d8d',
    },
    angle: {
      value: 1.46,
    },
    attenuation: {
      value: lightIsOn ? 4.4 : 0,
    },
    anglePower: {
      value: 7.9,
    },
    distance: {
      value: 30,
    },
    intensity: {
      value: lightIsOn ? 0 : 0,
    },
    penumbra: {
      value: 0.8,
    },
    castShadow: {
      value: true,
    },
  };

  const LIGHT_3_POSITION = {
    x: { value: 4.2 },
    y: { value: 6.2 },
    z: { value: -3.7 },
  };

  const LIGHT_3_TARGET = {
    x: { value: 5.8 },
    y: { value: 0 },
    z: { value: 1.7 },
  };

  const LIGHT_4_SETTINGS = {
    color: {
      value: '#476d8d',
    },
    angle: {
      value: 1.46,
    },
    attenuation: {
      value: lightIsOn ? 4.4 : 0,
    },
    anglePower: {
      value: 7.9,
    },
    distance: {
      value: 30,
    },
    intensity: {
      value: lightIsOn ? 0 : 0,
    },
    penumbra: {
      value: 0.8,
    },
    castShadow: {
      value: true,
    },
  };

  const LIGHT_4_POSITION = {
    x: { value: 4.5 },
    y: { value: 6.2 },
    z: { value: -3.7 },
  };

  const LIGHT_4_TARGET = {
    x: { value: 5.5 },
    y: { value: 0 },
    z: { value: 1.7 },
  };

  const CENTER_SETTINGS = {
    color: {
      value: '#8baeef',
    },
    angle: {
      value: 0.65,
    },
    attenuation: {
      value: lightIsOn ? 0 : 0,
    },
    anglePower: {
      value: 2.7,
    },
    distance: {
      value: 30,
    },
    intensity: {
      value: lightIsOn ? 3 : 0,
    },
    penumbra: {
      value: 0.8,
    },
    castShadow: {
      value: true,
    },
  };

  const CENTER_POSITION = {
    x: { value: 4.35 },
    y: { value: 5.3 },
    z: { value: -3.7 },
  };

  const CENTER_TARGET = {
    x: { value: 5.65 },
    y: { value: 0 },
    z: { value: 2.2 },
  };

  return (
    <>
      <WindowLightUnit
        lightLabel='Unit1 (l-left)'
        settings={LIGHT_1_SETTINGS}
        lightPosition={LIGHT_1_POSITION}
        targetPosition={LIGHT_1_TARGET}
      />
      <WindowLightUnit
        lightLabel='Unit2 (l-right)'
        settings={LIGHT_2_SETTINGS}
        lightPosition={LIGHT_2_POSITION}
        targetPosition={LIGHT_2_TARGET}
      />
      <WindowLightUnit
        lightLabel='Unit3 (u-right)'
        settings={LIGHT_3_SETTINGS}
        lightPosition={LIGHT_3_POSITION}
        targetPosition={LIGHT_3_TARGET}
      />
      <WindowLightUnit
        lightLabel='Unit4 (u-left)'
        settings={LIGHT_4_SETTINGS}
        lightPosition={LIGHT_4_POSITION}
        targetPosition={LIGHT_4_TARGET}
      />
      <WindowLightUnit
        lightLabel='Center Light'
        settings={CENTER_SETTINGS}
        lightPosition={CENTER_POSITION}
        targetPosition={CENTER_TARGET}
      />
    </>
  );
}

// const LEFT_EDGE = 5.5;
// const RIGHT_EDGE = 4.3;
// const TOP_EDGE = 6.0;
// const BOTTOM_EDGE = 4.3;
// const DEPTH = -3.7;

// const LEFT_EDGE_TARGET = 5.5;
// const RIGHT_EDGE_TARGET = 5.8;
// const TOP_EDGE_TARGET = 2.0;
// const BOTTOM_EDGE_TARGET = 2.8;

// const GROUP_INTENSITY = 0.21;
// const GROUP_PENUMBRA = 0.8;
// const GROUP_DISTANCE = 19.8;
// const GROUP_ANGLE = 0.66;
// const GROUP_ATTENUATION = 5.3;
// const GROUP_ANGLE_POWER = 4.7;
// const GROUP_COLOR = "#8497ba";

// const LEFT_EDGE = 4.5;
// const RIGHT_EDGE = 4.2;
// const TOP_EDGE = 6.2;
// const BOTTOM_EDGE = 4.4;
// const DEPTH = -3.7;

// const LEFT_EDGE_TARGET = 5.5;
// const RIGHT_EDGE_TARGET = 5.8;
// const TOP_EDGE_TARGET = 1.7;
// const BOTTOM_EDGE_TARGET = 2.7;

// const GROUP_INTENSITY = 0;
// const GROUP_PENUMBRA = 0.8;
// const GROUP_DISTANCE = 30;
// const GROUP_ANGLE = 1.46;
// const GROUP_ATTENUATION = 4.4;
// const GROUP_ANGLE_POWER = 7.9;
// const GROUP_COLOR = '#476d8d';

// const CENTER_INTENSITY = 3;
// const CENTER_PENUMBRA = 0.8;
// const CENTER_DISTANCE = 30;
// const CENTER_ANGLE = 0.65;
// const CENTER_ATTENUATION = 0;
// const CENTER_ANGLE_POWER = 2.7;
// const CENTER_COLOR = '#8baeef';

// const { light1On, light2On, light3On, light4On, centerLightOn } = useControls(
//   "Window Light Switches",
//   {
//     light1On: {
//       value: true,
//     },
//     light2On: {
//       value: true,
//     },
//     light3On: {
//       value: true,
//     },
//     light4On: {
//       value: true,
//     },
//     centerLightOn: {
//       value: true,
//     },
//   },
// );

// const { leftEdge, rightEdge, topEdge, bottomEdge, depth } = useControls(
//   'Cluster Position',
//   {
//     depth: {
//       value: DEPTH,
//       min: -15,
//       max: 0,
//     },
//     leftEdge: {
//       value: LEFT_EDGE,
//       min: 0,
//       max: 10,
//     },
//     rightEdge: {
//       value: RIGHT_EDGE,
//       min: 0,
//       max: 10,
//     },
//     topEdge: {
//       value: TOP_EDGE,
//       min: 0,
//       max: 10,
//     },
//     bottomEdge: {
//       value: BOTTOM_EDGE,
//       min: 0,
//       max: 10,
//     },
//   },
// );

// const { leftEdgeTarget, rightEdgeTarget, topEdgeTarget, bottomEdgeTarget } =
//   useControls('Cluster Target', {
//     leftEdgeTarget: {
//       value: LEFT_EDGE_TARGET,
//       min: 0,
//       max: 10,
//     },
//     rightEdgeTarget: {
//       value: RIGHT_EDGE_TARGET,
//       min: 0,
//       max: 10,
//     },
//     topEdgeTarget: {
//       value: TOP_EDGE_TARGET,
//       min: 0,
//       max: 10,
//     },
//     bottomEdgeTarget: {
//       value: BOTTOM_EDGE_TARGET,
// //       min: 0,
// //       max: 10,
// //     },
// //   });

// // const {
// //   groupAttenuation,
// //   groupAnglePower,
// //   groupDistance,
// //   groupIntensity,
// //   groupPenumbra,
// //   groupAngle,
// //   groupColor,
// //   groupCastShadow,
// // } = useControls('Cluster Settings', {
// //   groupIntensity: {
// //     value: GROUP_INTENSITY,
// //     min: 0,
// //     max: 3,
// //   },
// //   groupPenumbra: {
// //     value: GROUP_PENUMBRA,
// //     min: 0,
// //     max: 1,
// //   },
// //   groupAttenuation: {
// //     value: GROUP_ATTENUATION,
// //     min: 0,
// //     max: 15,
// //   },
// //   groupDistance: {
// //     value: GROUP_DISTANCE,
// //     min: 0,
// //     max: 30,
// //   },
// //   groupAngle: {
// //     value: GROUP_ANGLE,
// //     min: 0,
// //     max: Math.PI / 2,
// //   },
// //   groupAnglePower: {
// //     value: GROUP_ANGLE_POWER,
// //     min: 0,
// //     max: 10,
// //   },
// //   groupColor: {
// //     value: GROUP_COLOR,
// //   },
// //   groupCastShadow: {
// //     value: false,
// //   },
// // });

// const {
//   centerAttenuation,
//   centerAnglePower,
//   centerDistance,
//   centerIntensity,
//   centerPenumbra,
//   centerAngle,
//   centerColor,
//   centerCastShadow,
// } = useControls('Center Light Settings', {
//   centerIntensity: {
//     value: CENTER_INTENSITY,
//     min: 0,
//     max: 3,
//   },
//   centerPenumbra: {
//     value: CENTER_PENUMBRA,
//     min: 0,
//     max: 1,
//   },
//   centerAttenuation: {
//     value: CENTER_ATTENUATION,
//     min: 0,
//     max: 15,
//   },
//   centerDistance: {
//     value: CENTER_DISTANCE,
//     min: 0,
//     max: 30,
//   },
//   centerAngle: {
//     value: CENTER_ANGLE,
//     min: 0,
//     max: Math.PI / 2,
//   },
//   centerAnglePower: {
//     value: CENTER_ANGLE_POWER,
//     min: 0,
//     max: 10,
//   },
//   centerColor: {
//     value: CENTER_COLOR,
//   },
//   centerCastShadow: {
//     value: true,
//   },
// });
