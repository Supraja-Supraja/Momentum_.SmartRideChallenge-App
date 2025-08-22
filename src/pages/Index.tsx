import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect authenticated users to home, unauthenticated to login
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/" replace />;
};

export default Index;
