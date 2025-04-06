import { useEffect, useState } from 'react';
import api from '../../services/api';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    api.get('/reports').then(res => setReports(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Lab Reports</h2>
      {reports.length === 0 ? (
        <p>No lab reports available.</p>
      ) : (
        reports.map(r => (
          <div key={r._id} className="border p-4 rounded mb-4 bg-gray-50">
            <div><strong>Title:</strong> {r.title}</div>
            <div><strong>Doctor:</strong> {r.doctor?.name || 'N/A'}</div>
            <div><strong>Date:</strong> {new Date(r.uploadedAt).toLocaleDateString()}</div>
            {r.result && <div><strong>Result:</strong> {r.result}</div>}
            {r.fileUrl && (
              <div className="mt-1">
                <a
                  href={`${backend_url}${r.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View File
                </a>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Reports;
