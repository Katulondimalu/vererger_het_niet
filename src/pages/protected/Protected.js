import { ref } from 'firebase/database';
import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { database, useFirebase } from '../../utils/firebase';

const Protected = () => {
  let { id } = useParams();
  let room_ref = ref(database, `rooms/${id}`);
  let room = useFirebase(room_ref) ?? {};

  if (room.finished_time) {
    return <Outlet />;
  } else {
    return <Navigate to={-1} />;
  }
};

export default Protected;
