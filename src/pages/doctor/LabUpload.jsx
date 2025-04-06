import { useEffect, useState } from "react";
import api from "../../services/api";

const LabUpload = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    title: "",
    result: "",
    file: null,
  });

  useEffect(() => {
    api.get("/doctor/patients").then((res) => setPatients(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.file || !form.title || !form.patientId) {
      alert("Title, patient and file are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("result", form.result);
    formData.append("file", form.file);
    formData.append("patientId", form.patientId);

    await api.post("/reports/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Lab report uploaded!");
    setForm({ patientId: "", title: "", result: "", file: null });
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Upload Lab Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          className="input-style"
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          name="title"
          placeholder="Report Title"
          value={form.title}
          onChange={handleChange}
          className="input-style"
        />

        <textarea
          name="result"
          placeholder="Optional text summary"
          value={form.result}
          onChange={handleChange}
          className="input-style"
        />

        <input type="file" accept="application/pdf,image/*" onChange={handleFileChange} />

        <button type="submit" className="btn-primary w-full">
          Upload
        </button>
      </form>
    </div>
  );
};

export default LabUpload;
