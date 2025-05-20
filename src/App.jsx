import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ChatsPage from './pages/ChatsPage';
import Homepage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// Extract layout logic into a separate component
function MainLayout() {
  const location = useLocation();  // Get the current route

  return (
    <>
    {/* Display Navbar on all pages */}
      <Navbar /> 
      <div className="">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* ProtectedRoute for ChatPage */}
          <Route
            path="/chatspage"
            element={
              <ProtectedRoute>
                <ChatsPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Show Footer only if NOT on the ChatsPage */}
        {location.pathname !== "/chatspage" && <Footer />}
      </div>
    </>
  );
}

export default App;
