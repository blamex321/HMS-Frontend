import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from "recharts";
import api from "../../services/api";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6961"];

const Charts = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/admin/chart-data").then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  const appointmentsByDate = Object.entries(data.appointmentsByDate).map(([date, count]) => ({
    date,
    count,
  }));

  const statusData = Object.entries(data.statusCount).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Analytics & Insights</h2>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Appointments Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={appointmentsByDate}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2">Appointment Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusData}>
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2">Users by Role</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.roleDistribution}
                dataKey="count"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.roleDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
