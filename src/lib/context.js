import { createContext } from 'react';

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
  atHomePosition: true,
  isZoomed: false,
  panningIsLimited: true,
  targetLabel: null,
  targetPosition: null,
  camPosition: null,
  controlsAreVisible: false,
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
