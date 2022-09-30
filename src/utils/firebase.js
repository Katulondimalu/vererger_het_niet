import { initializeApp } from 'firebase/app';
import { getDatabase, onValue } from 'firebase/database';
import { useEffect } from 'react';
import { withSuspense } from './with-suspense.js';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
  projectId: `${process.env.REACT_APP_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_APPID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENTID}`,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const auth = getAuth();

/** @param {import("firebase/database").Query} query */
export let reference_or_query_to_string = (query) => {
  // @ts-ignore
  let query_identifier = query?._queryIdentifier ?? '';
  let result = query.toString() + '?q=' + query_identifier;
  return result;
};

let useFirebaseFirstValue = withSuspense(
  (/** @type {import("firebase/database").Query} */ path) => {
    return reference_or_query_to_string(path);
  },
  (/** @type {import("firebase/database").Query} */ path) => {
    // return get(path).then((x) => x.val());
    return new Promise((yell) => {
      let unsub = () => {};
      unsub = onValue(path, (snapshot) => {
        unsub();
        yell(snapshot.val());
      });
    });
  }
);

export let useFirebase = (
  /** @type {import("firebase/database").Query} */ path
) => {
  let value = useFirebaseFirstValue(path);

  // let [value, set_value] = React.useState(initial_value);
  useEffect(() => {
    let dispose = onValue(path, (snapshot) => {
      useFirebaseFirstValue.refetch(path, snapshot.val());
      // set_value(snapshot.val());
    });

    return () => dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference_or_query_to_string(path)]);

  return value;
};
