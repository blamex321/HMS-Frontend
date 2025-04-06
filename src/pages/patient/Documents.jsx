import { useEffect, useState } from 'react';
import api from '../../services/api';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const fetchDocs = async () => {
    const res = await api.get('/documents');
    setDocuments(res.data);
  };

  useEffect(() => { fetchDocs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Both title and file are required!");

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    await api.post('/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert('Uploaded!');
    setTitle('');
    setFile(null);
    fetchDocs();
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Medical Documents</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Document Title"
          className="input-style"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          className="input-style"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn-primary w-full">Upload</button>
      </form>

      <ul className="space-y-3">
        {documents.map((doc) => (
          <li key={doc._id} className="p-4 border rounded bg-gray-50">
            <div><strong>{doc.title}</strong></div>
            <a
              href={`${backend_url}${doc.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View File
            </a>
            <div className="text-sm text-gray-500">{new Date(doc.uploadedAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;
