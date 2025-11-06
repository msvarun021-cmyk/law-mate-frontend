import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Layout from './pages/Layout';
import PoliceDashboard from './pages/Police/PoliceDashboard';
import DraftFIR from './pages/Police/DraftFIR';
import PublicDashboard from './pages/Public/PublicDashboard';
import NotFound from './pages/Shared/NotFound';

// Protected Route for all logged-in users
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>; // Or a spinner
  return user ? children : <Navigate to="/login" replace />;
};

// Role-based route protection
const RoleBasedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (user.role !== role) {
    return <Navigate to="/unauthorized" replace />; // Or a specific 'Unauthorized' page
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/" 
            element={<ProtectedRoute><Layout /></ProtectedRoute>}
          >
            {/* Police Routes */}
            <Route 
              path="dashboard" 
              element={<RoleBasedRoute role="police"><PoliceDashboard /></RoleBasedRoute>} 
            />
            <Route 
              path="draft-fir" 
              element={<RoleBasedRoute role="police"><DraftFIR /></RoleBasedRoute>} 
            />
            {/* Add other police routes here: Search, History, etc. */}
            
            {/* Public Routes */}
            <Route 
              path="public-dashboard" 
              element={<RoleBasedRoute role="public"><PublicDashboard /></RoleBasedRoute>} 
            />
            {/* Add other public routes here */}

            {/* Default redirect based on role */}
            <Route 
              index 
              element={<RoleRedirector />} 
            />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Component to redirect user to their specific dashboard after login
const RoleRedirector = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  
  if (user.role === 'police') {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/public-dashboard" replace />;
  }
};

export default App;