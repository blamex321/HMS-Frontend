import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const PatientDetails = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL_PROD || import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    api.get(`/doctor/patients/${id}`).then((res) => setInfo(res.data));
  }, [id]);

  if (!info) return <p>Loading...</p>;

  const { user, vitals, prescriptions, reports } = info;

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl">
      <h2 className="text-xl font-bold mb-4">Patient Profile: {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Allergies:</strong> {user.medicalHistory?.allergies}</p>
      <p><strong>Chronic Conditions:</strong> {user.medicalHistory?.chronicConditions}</p>
      <p><strong>Medications:</strong> {user.medicalHistory?.medications}</p>

      <hr className="my-4" />

      <h3 className="font-semibold text-lg">Vitals</h3>
      {vitals.length === 0 ? <p>No vitals found.</p> : (
        <ul className="list-disc ml-6">
          {vitals.map((v) => (
            <li key={v._id}>
              {new Date(v.recordedAt).toLocaleString()}: BP: {v.bp}, HR: {v.heartRate}, Sugar: {v.sugarLevel}, Temp: {v.temperature}
            </li>
          ))}
        </ul>
      )}

      <h3 className="font-semibold text-lg mt-4">Prescriptions</h3>
      {prescriptions.length === 0 ? <p>No prescriptions.</p> : (
        prescriptions.map(p => (
          <div key={p._id} className="bg-gray-100 p-2 rounded mb-2">
            <p><strong>Doctor:</strong> {p.doctor?.name}</p>
            <ul className="list-disc ml-6 text-sm">
              {p.medicines.map((m, i) => (
                <li key={i}>{m.name} — {m.dosage}, {m.frequency}</li>
              ))}
            </ul>
            <p className="text-sm">Notes: {p.notes}</p>
          </div>
        ))
      )}

      <h3 className="font-semibold text-lg mt-4">Lab Reports</h3>
      {reports.length === 0 ? <p>No lab reports.</p> : (
        reports.map(r => (
          <div key={r._id} className="p-2 border rounded mb-2">
            <p><strong>{r.title}</strong></p>
            {r.result && <p>{r.result}</p>}
            {r.fileUrl && (
              <a
                href={`${backend_url}${r.fileUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View File
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PatientDetails;
