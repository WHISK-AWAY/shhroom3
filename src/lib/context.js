import { createContext } from 'react';
import { objectPositions } from '../components/Landing/objectPositions';

export const initialGlobalContext = {
  username: null,
  userId: null,
  userPrefersStaticSite: false,
  isSignedIn: false,
  isInMeeting: false,
  reset: null,
  setContext: null,
};

export const GlobalContext = createContext(initialGlobalContext);

export const initialLandingContext = {
  isZoomed: false,
  targetLabel: null,
  targetPosition: null,
  camPosition: null,
  controlsAreVisible: true,
  signInHintIsVisible: true,
  controlsAreEnabled: true,
  reset: null,
  setContext: null,
  zoomToObject: null,
  releaseZoom: null,
};

export const LandingContext = createContext(initialLandingContext);

export const initialMeetingContext = {
  // figure it out
};

export const MeetingContext = createContext(initialMeetingContext);

// function zoomToObject(label) {
//   if (!objectPositions[label]) {
//     console.error(`No position information for label ${label}`);
//     return;
//   }

//   return {
//     isZoomed: true,
//     targetLabel: label,
//     targetPosition: objectPositions[label].targetPosition,
//     camPosition: objectPositions[label].position,
//     controlsAreDisabled: true,
//   };
//   // set landingContext.targetLabel = label
//   // look up & set landingContext.targetPosition
//   // look up & set landingContext.camPosition
//   // set controlsAreDisabled = true
//   // set isZoomed = true
// }

function releaseZoom() {
  // set landingContext.targetLabel = null
  console.log('releasing zoom...');
  return {
    isZoomed: false,
    targetLabel: null,
    targetPosition: null,
    camPosition: null,
    controlsAreEnabled: true,
  };
}
