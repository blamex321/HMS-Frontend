import { useEffect, useState } from "react";
import api from "../../services/api";

const Dashboard = () => {
  const [data, setData] = useState({
    appointment: null,
    prescriptions: [],
    reports: [],
    vitals: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const [appointments, prescriptions, reports, vitals] = await Promise.all([
        api.get("/appointments"),
        api.get("/prescriptions"),
        api.get("/reports"),
        api.get("/vitals"),
      ]);

      const nextAppointment = appointments.data
        .filter(a => new Date(a.date) > new Date() && a.status !== 'cancelled')
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || null;

      setData({
        appointment: nextAppointment,
        prescriptions: prescriptions.data,
        reports: reports.data,
        vitals: vitals.data,
      });
    };

    fetchData();
  }, []);

  const latestVital = data.vitals[0];

  return (
    <div className="bg-white p-6 rounded shadow max-w-5xl">
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>

      {data.appointment ? (
        <div className="mb-6 border-l-4 border-blue-500 pl-4">
          <h3 className="font-semibold">Upcoming Appointment</h3>
          <p><strong>Doctor:</strong> {data.appointment.doctor?.name || 'N/A'}</p>
          <p><strong>Date:</strong> {new Date(data.appointment.date).toLocaleString()}</p>
          <p><strong>Status:</strong> {data.appointment.status}</p>
        </div>
      ) : (
        <p className="mb-4 text-gray-500">No upcoming appointments.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <h4 className="text-lg font-semibold">Prescriptions</h4>
          <p>{data.prescriptions.length} record(s)</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h4 className="text-lg font-semibold">Lab Reports</h4>
          <p>{data.reports.length} record(s)</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h4 className="text-lg font-semibold">Latest Vitals</h4>
          {latestVital ? (
            <ul className="text-sm list-disc ml-4">
              <li>BP: {latestVital.bp}</li>
              <li>HR: {latestVital.heartRate} bpm</li>
              <li>Sugar: {latestVital.sugarLevel} mg/dL</li>
              <li>Temp: {latestVital.temperature} °C</li>
            </ul>
          ) : (
            <p>No vitals recorded</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
