import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/admin/stats");
      setCounts(res.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Doctors</h3>
          <p className="text-xl">{counts.doctors}</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Patients</h3>
          <p className="text-xl">{counts.patients}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Appointments</h3>
          <p className="text-xl">{counts.appointments}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
