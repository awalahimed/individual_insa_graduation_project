import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";
import OrderDetail from "./pages/OrderDetail";
import Admin from "./pages/Admin";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import UserDashboard from "./pages/UserDashboard";
import UserOrderDetail from "./pages/UserOrderDetail";
import DelivererManagement from "./pages/DelivererManagement";
import DelivererDashboard from "./pages/DelivererDashboard";
import DeliveryDetail from "./pages/DeliveryDetail";
import DeliveryHistory from "./pages/DeliveryHistory";
import NewDeliverer from "./pages/NewDeliverer";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { user, loading, userRole } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to a generic login or a specific role login if not authorized
    let redirectPath = "/login";
    if (userRole === "customer") {
      redirectPath = "/login/customer";
    } else if (userRole === "deliverer") {
      redirectPath = "/login/deliverer";
    } else if (userRole === "staff") {
      redirectPath = "/login/staff";
    } else if (userRole === "admin") {
      redirectPath = "/login/admin";
    }
    return <Navigate to={redirectPath} replace />;
  }

  return <Layout>{children}</Layout>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/admin" element={<LoginPage role="admin" />} />
            <Route path="/login/staff" element={<LoginPage role="staff" />} />
            <Route path="/login/deliverer" element={<LoginPage role="deliverer" />} />
            <Route path="/login/customer" element={<LoginPage role="customer" />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signup/:role" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff", "customer"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff"]}>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/new"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff"]}>
                  <NewOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff"]}>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff", "customer", "deliverer"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff", "customer", "deliverer"]}>
                  <Settings />
                </ProtectedRoute>
              }
            />

                      <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff", "customer", "deliverer"]}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
                path="/user/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["customer"]}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
            <Route
                path="/user/orders/:id"
                element={
                  <ProtectedRoute allowedRoles={["customer"]}>
                    <UserOrderDetail />
                  </ProtectedRoute>
                }
              />
            
            {/* Deliverer Management (Admin/Staff) */}
            <Route
              path="/deliverers"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff"]}>
                  <DelivererManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deliverers/new"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff"]}>
                  <NewDeliverer />
                </ProtectedRoute>
              }
            />
            
            {/* Deliverer routes */}
            <Route
              path="/deliverer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["deliverer"]}>
                  <DelivererDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deliverer/deliveries/:id"
              element={
                <ProtectedRoute allowedRoles={["deliverer"]}>
                  <DeliveryDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deliverer/history"
              element={
                <ProtectedRoute allowedRoles={["deliverer"]}>
                  <DeliveryHistory />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;




