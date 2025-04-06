import { useEffect, useState } from "react";
import api from "../../services/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState("");

  const fetchAppointments = async () => {
    const res = await api.get("/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    api.get('/appointments').then(res => setAppointments(res.data));
  }, []);
  

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    await api.put(`/appointments/${id}/cancel`);
    fetchAppointments();
  };

  const handleReschedule = async (id) => {
    if (!newDate) return alert("Pick a new date/time!");
    await api.put(`/appointments/${id}/reschedule`, { newDate });
    setEditingId(null);
    setNewDate("");
    fetchAppointments();
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Appointments</h2>

      <ul className="space-y-4">
        {appointments.map((a) => (
          <li key={a._id} className="p-4 border rounded bg-gray-50">
            {a.doctor ? (
              <div>
                <strong>Doctor:</strong> {a.doctor.name}
              </div>
            ) : (
              <div className="text-red-500">
                <strong>Doctor:</strong> Not available
              </div>
            )}

            <div>
              <strong>Date:</strong> {new Date(a.date).toLocaleString()}
            </div>
            <div>
              <strong>Status:</strong> {a.status}
            </div>
            {a.reason && (
              <div>
                <strong>Reason:</strong> {a.reason}
              </div>
            )}

            {a.status !== "cancelled" && (
              <div className="mt-3 space-x-2">
                {editingId === a._id ? (
                  <>
                    <input
                      type="datetime-local"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="input-style"
                    />
                    <button
                      onClick={() => handleReschedule(a._id)}
                      className="btn-primary text-sm"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn-primary bg-gray-400 hover:bg-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingId(a._id)}
                      className="btn-primary text-sm"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleCancel(a._id)}
                      className="btn-primary bg-red-500 hover:bg-red-600 text-sm"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
