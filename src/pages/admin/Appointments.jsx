import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("/admin/appointments").then((res) => setAppointments(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow max-w-6xl">
      <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Patient</th>
                <th className="p-2 border">Doctor</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Reason</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className="border-t">
                  <td className="p-2 border">{a.patient?.name}</td>
                  <td className="p-2 border">{a.doctor?.name}</td>
                  <td className="p-2 border">{new Date(a.date).toLocaleString()}</td>
                  <td className="p-2 border capitalize">{a.status}</td>
                  <td className="p-2 border">{a.reason || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
