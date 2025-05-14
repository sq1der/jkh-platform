import React, { useEffect, useRef, useState } from "react";
import { FaFileExcel, FaChartBar, FaUsers, FaCog } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


export default function ReportsPage() {
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminName, setAdminName] = useState('');
    const [showBuildingSelect, setShowBuildingSelect] = useState(false);
    const [selectedBuildingId, setSelectedBuildingId] = useState('');
    const [buildings, setBuildings] = useState([]);
    const [reportHistory, setReportHistory] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const handleFileUpload = async () => {
      const file = fileInputRef.current?.files?.[0];
      if (!file) return;
    
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('file', file);
    
      try {
        const res = await axios.post(
          'https://jkh-platform.onrender.com/upload/',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log("Успешно загружено", res.data);
        alert("Файл успешно загружен!");
        setIsModalOpen(false);
      } catch (err) {
        console.error("Ошибка загрузки", err.response?.data || err.message);
        alert("Ошибка при загрузке файла");
      }
    };

    const generateReport = async (buildingId) => {
      const token = localStorage.getItem('accessToken');
      if (!token) return alert("Необходима авторизация");
      try {
        const response = await axios.post(
          `http://localhost:8000/buildings/${buildingId}/report/`,
          {},
          {
            responseType: 'blob', 
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
    
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
    
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'report.xlsx';
        if (contentDisposition) {
          // Попытка найти filename*=utf-8''... (расширенный формат с кодировкой)
          const utf8FileNameMatch = contentDisposition.match(/filename\*=UTF-8''(.+)/i);
          if (utf8FileNameMatch && utf8FileNameMatch[1]) {
            try {
              fileName = decodeURIComponent(utf8FileNameMatch[1]);
            } catch (e) {
              console.warn('Ошибка декодирования имени файла:', e);
            }
          } else {
            // Фолбэк: ищем стандартный filename="..."
            const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
            if (fileNameMatch && fileNameMatch[1]) {
              fileName = fileNameMatch[1];
            }
          }
        }
        
    
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    
        alert('Отчет успешно сформирован!');
      } catch (error) {
        console.error("Ошибка при генерации отчета:", error);
        alert("Ошибка при формировании отчета");
      }
    };

    useEffect(() => {
      if (showBuildingSelect) {
        const fetchBuildings = async () => {
          const token = localStorage.getItem('accessToken');
          if (!token) return alert("Необходима авторизация");
          try {
            const res = await axios.get('http://localhost:8000/api/buildings/', {
            });
            setBuildings(res.data);
          } catch (err) {
            console.error("Ошибка загрузки зданий", err);
          }
        };
        fetchBuildings();
      }
    }, [showBuildingSelect]);

    useEffect(() => {
      const fetchAdmin = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        const decoded = jwtDecode(token);
        const res = await axios.get(`https://jkh-platform.onrender.com/api/users/${decoded.user_id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAdminName(res.data.full_name);
        setIsAuthorized(true);
      };
      fetchAdmin();
    }, []);

    useEffect(() => {
      const fetchReports = async () => {
        try {
          const response = await axios.get('http://localhost:8000/buildings/reports/');
          setReportHistory(response.data);
        } catch (err) {
          console.error("Ошибка загрузки файлов", err);
          alert("Ошибка при загрузке файлов");
        }
      };
  
      fetchReports();
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
          <button
            className="ml-4 w-[250px] h-[49px] bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-800"
            onClick={() => setShowBuildingSelect(true)}
          >
            Сформировать отчет
          </button>
          <input type="file" ref={fileInputRef} className="hidden" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Файлы</h2>
          <ul className="space-y-4">
            {reportHistory.map((report) => (
                <li key={report.id}>
                  <div className="flex items-center gap-3">
                  <FaFileExcel className="text-green-600 text-2xl" />
                  <a href={report.file} className="text-base hover:underline" target="_blank" rel="noopener noreferrer">
                    Скачать отчет от {new Date(report.created_at).toLocaleString()}
                  </a>
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

      {showBuildingSelect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Выберите здание</h2>
            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedBuildingId}
              onChange={(e) => setSelectedBuildingId(e.target.value)}
            >
              <option value="">-- Выберите здание --</option>
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.address}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowBuildingSelect(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  if (!selectedBuildingId) return alert("Выберите здание!");
                  generateReport(selectedBuildingId);
                  setShowBuildingSelect(false);
                }}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Сформировать
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
