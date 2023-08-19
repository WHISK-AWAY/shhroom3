import { useEffect, useState } from 'react';
import useShhroom from './hooks/useShhroom';

import SignInOverlay from './SignInOverlay';

export default function RoomTesting() {
  const shhroomer = useShhroom();

  const [showSigninOverlay, setShowSigninOverlay] = useState(false);

  useEffect(() => {
    console.log('shhroomer:', shhroomer);

    if (shhroomer.error === 'MISSING_TOKEN') {
      setShowSigninOverlay(true);
    }
  }, [shhroomer.error]);
  return (
    <div>
      <p>RoomTesting</p>
      {showSigninOverlay && <SignInOverlay />}
    </div>
  );
}
