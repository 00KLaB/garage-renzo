import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Customers from "./pages/Customers";
import Vehicles from "./pages/Vehicles";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

import {
  AuthProvider,
} from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute>

                <MainLayout>

                  <Routes>

                    <Route
                      path="/dashboard"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/booking"
                      element={<Booking />}
                    />

                    <Route
                      path="/bookings"
                      element={<Bookings />}
                    />

                    <Route
                      path="/customers"
                      element={<Customers />}
                    />

                    <Route
                      path="/vehicles"
                      element={<Vehicles />}
                    />

                  </Routes>

                </MainLayout>

              </ProtectedRoute>
            }
          />

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;