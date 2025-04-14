// src/pages/ReportsPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { FaFileExcel, FaUser, FaChartBar, FaUsers, FaCog } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const mockFiles = [
  { name: "Файл_20_02_2025.xlsx" },
  { name: "Файл_31_03_2025.xlsx" },
  { name: "Файл_07_04_2025.xlsx" },
];

export default function ReportsPage() {
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminName, setAdminName] = useState('');
    const handleFileUpload = async () => {
      const file = fileInputRef.current?.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);}

    useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const decoded = jwtDecode(token);
      const res = await axios.get(`http://localhost:8000/api/users/${decoded.user_id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdminName(res.data.full_name);
    };
    fetchAdmin();
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="text-3xl font-bold p-6 border-b border-gray-200">
            ЖКХ
          </div>
          <nav className="flex flex-col gap-1 mt-4 px-4">
            <Link to="/overview-page"><SidebarItem icon={<FaChartBar />} text="Обзор" active={false} /></Link>
            <Link to="/abonents"><SidebarItem icon={<FaUsers />} text="Абоненты" active={false} /></Link>
            <Link><SidebarItem icon={<FaFileExcel />} text="Отчеты" active={true} /></Link>
            <Link><SidebarItem icon={<FaCog />} text="Настройки" active={false} /></Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 p-4 border-t border-gray-200">
          <img
            src={`https://ui-avatars.com/api/?name=${adminName}`} 
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="font-semibold">{adminName}</div>
          <div className="text-sm text-gray-500">Администратор</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Отчеты</h1>
          <div>
          <button onClick={() => setIsModalOpen(true)} className="w-[250px] h-[49px] bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-800">
            Загрузить файл
          </button>
          <input type="file" ref={fileInputRef} className="hidden" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Файлы</h2>
          <ul className="space-y-4">
            {mockFiles.map((file, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaFileExcel className="text-green-600 text-2xl" />
                  <span className="text-base">{file.name}</span>
                </div>
                <div className="flex gap-4">
                  <button className="text-green-700 hover:underline">
                    Выгрузить в .xlsx
                  </button>
                  <button className="text-gray-600 hover:underline">
                    Сформировать отчет
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Загрузить файл</h2>
            <p className="text-center text-gray-600 mb-4">Поддерживаются форматы: .xls, .xlsx, .csv, .json</p>
            <input type="file" ref={fileInputRef} className="mb-4 w-full border p-2 rounded" />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Отмена
              </button>
              <button
                onClick={handleFileUpload}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Загрузить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ icon, text, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
        active ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-100"
      }`}
    >
      <div className="text-lg">{icon}</div>
      <span>{text}</span>
    </div>
  );
}
