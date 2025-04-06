import { useEffect, useState } from 'react';
import api from '../../services/api';

const Vitals = () => {
  const [vitals, setVitals] = useState([]);
  const [form, setForm] = useState({
    bp: '',
    heartRate: '',
    sugarLevel: '',
    temperature: '',
  });

  useEffect(() => {
    api.get('/vitals').then(res => setVitals(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/vitals', form);
    alert('Vitals recorded!');
    const res = await api.get('/vitals');
    setVitals(res.data);
    setForm({ bp: '', heartRate: '', sugarLevel: '', temperature: '' });
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl">
      <h2 className="text-xl font-bold mb-4">My Vitals</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input name="bp" placeholder="Blood Pressure (e.g. 120/80)" className="input-style" value={form.bp} onChange={handleChange} />
        <input name="heartRate" placeholder="Heart Rate (bpm)" className="input-style" value={form.heartRate} onChange={handleChange} />
        <input name="sugarLevel" placeholder="Sugar Level (mg/dL)" className="input-style" value={form.sugarLevel} onChange={handleChange} />
        <input name="temperature" placeholder="Temperature (°C)" className="input-style" value={form.temperature} onChange={handleChange} />
        <div className="col-span-2">
          <button className="btn-primary w-full">Add Vital</button>
        </div>
      </form>

      <ul className="space-y-3">
        {vitals.map((v) => (
          <li key={v._id} className="border rounded p-4 bg-gray-50">
            <div><strong>Date:</strong> {new Date(v.recordedAt).toLocaleString()}</div>
            <div><strong>BP:</strong> {v.bp} | <strong>HR:</strong> {v.heartRate} bpm</div>
            <div><strong>Sugar:</strong> {v.sugarLevel} mg/dL | <strong>Temp:</strong> {v.temperature} °C</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vitals;
