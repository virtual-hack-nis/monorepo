import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ path, element }) {
  const taxiCardNumber = localStorage.getItem('taxiCardNumber');

  return (
    <Route 
      path={path} 
      element={taxiCardNumber ? element : <Navigate to="/" replace />}
    />
  );
}

export default ProtectedRoute;