"use client"; 
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLoginUsers: 0,
    totalSellers: 0,
    users: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, Admin</h2>
        </header>

        {/* Dashboard Cards */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800">Total Users</h3>
            <p className="text-2xl text-green-500 font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800">User</h3>
            <p className="text-2xl text-blue-500 font-bold">{stats.totalLoginUsers}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800">User Seller</h3>
            <p className="text-2xl text-yellow-500 font-bold">{stats.totalSellers}</p>
          </div>
        </section>

        {/* Users Table */}
        <section className="mt-6 bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">User List</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.isLoggedIn ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-red-500">Inactive</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
