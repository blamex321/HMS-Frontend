import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => filter === "all" || u.role === filter);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    }
  };

  const handleRoleChange = async (id, newRole) => {
    await api.put(`/admin/users/${id}/role`, { role: newRole });
    fetchUsers();
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-5xl">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="mb-4">
        <label className="font-semibold">Filter by Role:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="ml-2 input-style">
          <option value="all">All</option>
          <option value="admin">Admins</option>
          <option value="doctor">Doctors</option>
          <option value="patient">Patients</option>
        </select>
      </div>

      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border space-x-2">
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                  className="input-style text-xs"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  className="btn-primary bg-red-500 hover:bg-red-600 text-xs"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
