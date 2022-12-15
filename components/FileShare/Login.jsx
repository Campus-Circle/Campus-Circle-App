import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../../firebase/config';
import { useCallback } from 'react';

function FileShareLogin() {
  const auth = getAuth(app);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    console.log(result);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-5">
      <h1 className="italic text-md text-center">Please Login to access the File Share</h1>
      <button className="btn btn-primary mt-5" onClick={signInWithGoogle}>
        Login Via Google
      </button>
    </div>
  );
}

export default FileShareLogin;
