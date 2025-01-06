import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user'); // Check login status

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If logged in, render the child components (protected route content)
  return children;
};

export default ProtectedRoute;
