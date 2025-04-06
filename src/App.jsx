import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

import Profile from "./pages/patient/Profile";
import Appointments from "./pages/patient/Appointments";
import BookAppointment from "./pages/patient/BookAppointment";
import Prescriptions from "./pages/patient/Prescriptions";
import Reports from "./pages/patient/Reports";
import Vitals from "./pages/patient/Vitals";
import Documents from "./pages/patient/Documents";

import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorPatients from "./pages/doctor/Patients";
import DoctorPrescriptions from "./pages/doctor/Prescriptions";
import PatientDetails from './pages/doctor/PatientDetails';
import LabUpload from './pages/doctor/LabUpload';

import AdminUsers from "./pages/admin/Users";
import AdminAppointments from './pages/admin/Appointments';
import Charts from './pages/admin/Charts';

import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/appointments" element={<AdminAppointments />} />
              <Route path="/admin/charts" element={<Charts />} />
            </Route>
          </Route>

          {/* Doctor */}
          <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
            <Route path="/doctor" element={<DashboardLayout />}>
              <Route path="dashboard" element={<DoctorDashboard />} />
              <Route path="appointments" element={<DoctorAppointments />} />
              <Route path="patients" element={<DoctorPatients />} />
              <Route path="prescriptions" element={<DoctorPrescriptions />} />
              <Route path="/doctor/patients/:id" element={<PatientDetails />} />
              <Route path="lab-upload" element={<LabUpload />} />
            </Route>
          </Route>

          {/* Patient */}
          <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
            <Route path="/patient" element={<DashboardLayout />}>
              <Route path="dashboard" element={<PatientDashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="appointments/new" element={<BookAppointment />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="reports" element={<Reports />} />
              <Route path="vitals" element={<Vitals />} />
              <Route path="documents" element={<Documents />} />
            </Route>
          </Route>
          {/* Optional: Add a 404 page */}
          {/* <Route path="*" element={<NotFound />} /> */}
          {/* Payment Success */}
          <Route path="/payment/success" element={<PaymentSuccess />} />
          {/* Payment Cancel */}
          <Route path="/payment/cancel" element={<PaymentCancel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
