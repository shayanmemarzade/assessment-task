import { useEffect } from 'react';
import Header from './components/Header';
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from './store';

function ProtectedRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (location.pathname === '/' && auth.token) {
      navigate('/products');
    }
  }, [location, navigate, auth]);

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
