import { useEffect, useState } from "react";
import api from "../../services/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await api.get("/appointments/doctor");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/appointments/${id}/status`, { status });
    fetchAppointments();
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl">
      <h2 className="text-xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((a) => (
            <li key={a._id} className="border p-4 rounded bg-gray-50">
              <p><strong>Patient:</strong> {a.patient?.name}</p>
              <p><strong>Email:</strong> {a.patient?.email}</p>
              <p><strong>Date:</strong> {new Date(a.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {a.status}</p>
              {a.reason && <p><strong>Reason:</strong> {a.reason}</p>}

              {a.status === "pending" && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => updateStatus(a._id, "confirmed")}
                    className="btn-primary text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(a._id, "rejected")}
                    className="btn-primary bg-red-500 text-sm"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;
