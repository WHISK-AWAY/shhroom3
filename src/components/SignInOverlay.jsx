import { useState, lazy, Suspense } from 'react';

import Signin from './Signin';
const Signup = lazy(() => import('./SignUp'));

export default function SignInOverlay() {
  const [isSignupHidden, setIsSignupHidden] = useState(true);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='h-screen w-screen bg-black/30 p-9 fixed top-0 right-0 z-[60]'
    >
      <div className='signin-wrapper h-full w-fit mx-auto'>
        {isSignupHidden ? (
          <Signin
            setIsFormHidden={undefined}
            setIsSignUpHidden={setIsSignupHidden}
          />
        ) : (
          <Suspense fallback={null}>
            <Signup
              setIsFormHidden={undefined}
              setIsSignUpHidden={setIsSignupHidden}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
