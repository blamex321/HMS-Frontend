import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const links = {
    admin: [
      { name: "Dashboard", to: "/admin/dashboard" },
      { name: "Users", to: "/admin/users" },
      { name: "Reports", to: "/admin/reports" },
      { name: "Appointments", to: "/admin/appointments" },
      { name: "Charts", to: "/admin/charts" },


    ],
    doctor: [
      { name: "Dashboard", to: "/doctor/dashboard" },
      { name: "Appointments", to: "/doctor/appointments" },
      { name: "Patients", to: "/doctor/patients" },
      { name: "Prescriptions", to: "/doctor/prescriptions" },
      { name: "Upload Report", to: "/doctor/lab-upload" },
    ],

    patient: [
      { name: "Dashboard", to: "/patient/dashboard" },
      { name: "Profile", to: "/patient/profile" },
      { name: "Appointments", to: "/patient/appointments" },
      { name: "Book Appointment", to: "/patient/appointments/new" },
      { name: "Vitals", to: "/patient/vitals" },
      { name: "Prescriptions", to: "/patient/prescriptions" },
      { name: "Lab Reports", to: "/patient/reports" },
      { name: "Documents", to: "/patient/documents" },
    ],
  };

  return (
    <div className="w-64 bg-white shadow-md h-screen p-4">
      <h1 className="text-xl font-bold mb-6">🏥 HMS</h1>
      <nav className="space-y-2">
        {(links[user?.role] || []).map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
