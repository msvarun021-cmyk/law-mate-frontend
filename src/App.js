import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext'; 
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Layout
import Layout from './pages/Layout';

// Police Pages
import PoliceDashboard from './pages/Police/PoliceDashboard';
import DraftFIR from './pages/Police/DraftFIR';
import SearchSectionsPolice from './pages/Police/SearchSectionsPolice';

// Public Pages
import PublicDashboard from './pages/Public/PublicDashboard';
import SearchSectionsPublic from './pages/Police/SearchSectionsPublic'; 

// Shared Pages
import Profile from './pages/Shared/Profile';
import NotFound from './pages/Shared/NotFound';

// This component checks if a user is logged in
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
  return user ? children : <Navigate to="/login" replace />;
};

// This component checks for the 'police' role
const RoleBasedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (user.role !== role) {
    return <Navigate to="/" replace />; // Redirect home if wrong role
  }
  return children;
};

// This component redirects logged-in users to their correct dashboard
const RoleRedirector = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return user.role === 'police' 
    ? <Navigate to="/dashboard" replace /> 
    : <Navigate to="/public-dashboard" replace />;
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
            <Route 
              path="dashboard" 
              element={<RoleBasedRoute role="police"><PoliceDashboard /></RoleBasedRoute>} 
            />
            <Route 
              path="draft-fir" 
              element={<RoleBasedRoute role="police"><DraftFIR /></RoleBasedRoute>} 
            />
            <Route 
              path="search-police"
              element={<RoleBasedRoute role="police"><SearchSectionsPolice /></RoleBasedRoute>} 
            />
            <Route 
              path="public-dashboard" 
              element={<RoleBasedRoute role="public"><PublicDashboard /></RoleBasedRoute>} 
            />
            <Route 
              path="search-public"
              element={<RoleBasedRoute role="public"><SearchSectionsPublic /></RoleBasedRoute>} 
            />
            <Route path="profile" element={<Profile />} />
            <Route index element={<RoleRedirector />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;