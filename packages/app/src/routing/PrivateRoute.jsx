import { Navigate, useLocation } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const taxiCardNumber = localStorage.getItem('taxiCardNumber');
  const location = useLocation();

  return taxiCardNumber ? children : <Navigate to="/" state={{ from: location }} />;
}

// export default PrivateRoute;