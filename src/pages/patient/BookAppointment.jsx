import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctorId: "", date: "", reason: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await api.get("/auth/doctors");
      setDoctors(res.data);
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (form.doctorId) {
      api.get(`/auth/doctor/${form.doctorId}/availability`).then((res) => {
        setAvailability(res.data);
      });
    }
  }, [form.doctorId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  // Example: 09:00 to 12:00
  function generateTimeSlots(startTime, endTime) {
    const slots = [];
    let [h, m] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    while (h < endH || (h === endH && m < endM)) {
      const timeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}`;
      slots.push(timeStr);
      m += 30;
      if (m >= 60) {
        m = 0;
        h++;
      }
    }
    return slots;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/appointments", form);
    alert("Appointment booked!");
    navigate("/patient/appointments");
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="doctorId" className="input-style" onChange={handleChange}>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="date"
          className="input-style"
          onChange={handleChange}
        />
        <textarea
          name="reason"
          className="input-style"
          placeholder="Reason (optional)"
          onChange={handleChange}
        />
        <button className="btn-primary">Book</button>
      </form>
    </div>
  );
};

export default BookAppointment;
