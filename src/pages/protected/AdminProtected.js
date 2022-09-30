import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const AdminProtected = ({ children }) => {
  const { user } = UserAuth();

  if (!user) return <Navigate to='/de-kist/login' />;
  return children;
};

export default AdminProtected;
