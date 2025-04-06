import { useEffect, useState } from 'react';
import api from '../../services/api';

const Prescriptions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/prescriptions').then(res => setData(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Prescriptions</h2>
      {data.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        data.map(p => (
          <div key={p._id} className="border p-4 rounded mb-4 bg-gray-50">
            <div><strong>Doctor:</strong> {p.doctor?.name}</div>
            <div><strong>Date:</strong> {new Date(p.date).toLocaleDateString()}</div>
            <div className="mt-2">
              <strong>Medicines:</strong>
              <ul className="list-disc ml-6">
                {p.medicines.map((m, i) => (
                  <li key={i}>
                    {m.name} — {m.dosage}, {m.frequency}
                  </li>
                ))}
              </ul>
            </div>
            {p.notes && (
              <div className="mt-2"><strong>Notes:</strong> {p.notes}</div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Prescriptions;
