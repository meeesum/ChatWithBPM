import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ChatsPage from './pages/ChatsPage';
import LoginPage2 from './pages/LoginPage2';
import Homepage from './pages/HomePage';
import Navbar from './components/Navbar';  // Import Navbar
import Footer from './components/Footer';  // Import Footer
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Navbar />  {/* Display Navbar at the top */}
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login2" element={<LoginPage2 />} />
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
      </div>
      <Footer />  {/* Display Footer at the bottom */}
    </Router>
  );
}

export default App;
