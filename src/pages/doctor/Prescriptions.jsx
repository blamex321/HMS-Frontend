import { useEffect, useState } from "react";
import api from "../../services/api";

const Prescriptions = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    medicines: [{ name: "", dosage: "", frequency: "" }],
    notes: "",
  });

  useEffect(() => {
    api.get("/auth/patients").then((res) => setPatients(res.data));
  }, []);

  const handleMedicineChange = (index, field, value) => {
    const updated = [...form.medicines];
    updated[index][field] = value;
    setForm({ ...form, medicines: updated });
  };

  const addMedicine = () => {
    setForm({ ...form, medicines: [...form.medicines, { name: "", dosage: "", frequency: "" }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/prescriptions", form);
    alert("Prescription created!");
    setForm({
      patientId: "",
      medicines: [{ name: "", dosage: "", frequency: "" }],
      notes: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Write Prescription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="patientId"
          className="input-style"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <h3 className="font-semibold">Medicines</h3>
        {form.medicines.map((med, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-2">
            <input
              placeholder="Medicine"
              className="input-style"
              value={med.name}
              onChange={(e) => handleMedicineChange(idx, "name", e.target.value)}
            />
            <input
              placeholder="Dosage"
              className="input-style"
              value={med.dosage}
              onChange={(e) => handleMedicineChange(idx, "dosage", e.target.value)}
            />
            <input
              placeholder="Frequency"
              className="input-style"
              value={med.frequency}
              onChange={(e) => handleMedicineChange(idx, "frequency", e.target.value)}
            />
          </div>
        ))}
        <button type="button" className="btn-primary text-sm" onClick={addMedicine}>
          + Add More Medicine
        </button>

        <textarea
          placeholder="Notes"
          className="input-style"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button type="submit" className="btn-primary w-full">
          Save Prescription
        </button>
      </form>
    </div>
  );
};

export default Prescriptions;
