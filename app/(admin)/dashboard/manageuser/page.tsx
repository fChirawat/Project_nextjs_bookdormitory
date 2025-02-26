"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";

export default function ManageUser() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    users: [],
    userSells: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/dashboard");
      console.log("API Response:", response.data); // ตรวจสอบค่าจาก API
  
      if (response.data) {
        const users = (response.data.users || []).map(user => ({
          ...user,
          role: "user",
        }));
  
        const userSells = (response.data.userSells || []).map(user => ({
          ...user,
          role: "usersell",
        }));
  
        console.log("Processed Users:", users);
        console.log("Processed Sellers:", userSells);
  
        setStats({
          totalUsers: users.length,
          totalSellers: userSells.length,
          users,
          userSells,
        });
      } else {
        console.error("Unexpected API response:", response.data);
        setStats({ totalUsers: 0, totalSellers: 0, users: [], userSells: [] });
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, []); // ✅ เรียกใช้ครั้งเดียวตอนโหลด
  



  const deleteUser = async (userId, role) => {
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ ${userId} ที่มีบทบาท ${role}?`)) {
      try {
        await axios.delete(`/api/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
        setError("ไม่สามารถลบผู้ใช้ได้");
      }
    }
  };

  const renderTable = (title, users) => (
    <section className="mt-6 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title} ({users.length})</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-center">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Role</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.username || user.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.role || "User"}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button onClick={() => deleteUser(user.id, user.role)} className="bg-red-500 text-white px-3 py-1 rounded-lg">ลบ</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center">ไม่พบข้อมูล</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );

  return (
    <div className="p-5">
  <h1 className="text-2xl font-bold mb-5">Manage Users</h1>
  <div className="flex justify-between mb-5">
    <p className="text-gray-700">📌 Users: {stats.totalUsers} | Sellers: {stats.totalSellers}</p>
    <div className="flex space-x-2">
      <button onClick={fetchUsers} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        รีเฟรช
      </button>
      <Link href="/dashboard">
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          back
        </button>
      </Link>
    </div>
  </div>

  {loading ? (
    <div className="text-center py-4">กำลังโหลด...</div>
  ) : error ? (
    <div className="text-center text-red-500">{error}</div>
  ) : (
    <>
      {renderTable("User List", stats.users)}
      {renderTable("User Sell List", stats.userSells)}
    </>
  )}
</div>

  );
}
