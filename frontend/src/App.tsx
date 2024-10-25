import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Layout } from './components/layout/Index';
import { AuthLayout } from './components/layout/AuthLayout';
import NotFound from './pages/Notfound';
import Loading from './components/Loading';
import Profile from './pages/Profile';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Today = lazy(() => import('./pages/Today'));
const Important = lazy(() => import('./pages/Important'));
const Example = lazy(() => import('./pages/Example'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route
                path="/login"
                element={
                  <AuthRedirectRoute>
                    <Login />
                  </AuthRedirectRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthRedirectRoute>
                    <Register />
                  </AuthRedirectRoute>
                }
              />
              <Route
                path="/forget-password"
                element={
                  <AuthRedirectRoute>
                    <ForgetPassword />
                  </AuthRedirectRoute>
                }
              />
            </Route>

            {/* Protected routes */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/today" element={<Today />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/important" element={<Important />} />
            </Route>

            <Route path="*" element={<NotFound />} />
            <Route path="/example" element={<Example />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

const AuthRedirectRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default App;
