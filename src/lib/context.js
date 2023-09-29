import { createContext } from 'react';

export const initialGlobalContext = {
  username: null,
  userId: null,
  userPrefersStaticSite: false,
  isSignedIn: false,
  isInMeeting: false,
  reset: null,
  setContext: null,
  destinationRoomId: null,
};

export const GlobalContext = createContext(initialGlobalContext);

export const initialLandingContext = {
  atHomePosition: true,
  isZoomed: false,
  panningIsLimited: true,
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

export const initialRoomContext = {
  isFullscreen: false,
  setContext: null, // state setter added in Room component
};

export const RoomContext = createContext(initialRoomContext);
