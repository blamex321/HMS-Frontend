import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("/doctor/patients").then((res) => setPatients(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl">
      <h2 className="text-xl font-bold mb-4">My Patients</h2>
      {patients.length === 0 ? (
        <p>No patients yet.</p>
      ) : (
        <ul className="space-y-4">
          {patients.map((p) => (
            <li key={p._id} className="border p-4 rounded bg-gray-50">
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>Email:</strong> {p.email}</p>
              <Link to={`/doctor/patients/${p._id}`} className="btn-primary text-sm mt-2 inline-block">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Patients;
