import React from 'react';
import app from '../../../firebase/config';
import { getAuth } from 'firebase/auth';
import FileShareLogin from '../../../components/FileShare/Login';
import FileShareForm from '../../../components/FileShare/Form';
import { useEffect } from 'react';
import { useState } from 'react';

// Images

function FileShareProvider() {
  const auth = getAuth(app);
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthState(user);
      } else {
        setAuthState(false);
      }
    });
  }, []);

  if (authState === null) return <div>Loading...</div>;

  return <div>{authState ? <FileShareForm /> : <FileShareLogin />}</div>;
}

export default FileShareProvider;
