import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { FaChartBar, FaUsers, FaFileExcel, FaCog } from 'react-icons/fa';
import { SidebarItem } from './OverviewPage';
import axios from 'axios';

export default function AbonentyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [period, setPeriod] = useState("all");
  const [debtStatus, setDebtStatus] = useState("all");
  const [debtors, setDebtors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const accessToken = localStorage.getItem('accessToken');
  

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        const decoded = jwtDecode(token);
        const response = await fetch(`http://localhost:8000/api/users/${decoded.user_id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAdminName(data.full_name);
        } else {
          console.error('Ошибка получения данных администратора');
        }
      } catch (err) {
        console.error('Ошибка при получении данных администратора', err);
      }
    };

    fetchAdminData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      let queryParams = [];

      if (searchTerm) {
        queryParams.push(`search=${searchTerm}`);
      }

      if (period !== 'all') {
        const fromDate = new Date();
        if (period === 'month') fromDate.setMonth(fromDate.getMonth() - 1);
        queryParams.push(`from_date=${fromDate.toISOString().split('T')[0]}`);
      }

      if (debtStatus !== 'all') {
        queryParams.push(`status=${debtStatus}`);
      }

      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

      try {
        const response = await fetch(`http://localhost:8000/api/debtors/${queryString}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDebtors(data);
        } else {
          console.error('Ошибка загрузки данных');
        }
      } catch (error) {
        console.error('Ошибка при загрузке пользователей', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm, period, debtStatus]);


  const handleFileUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
  
    const token = localStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const res = await axios.post(
        'http://localhost:8000/upload/',
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
       <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="text-3xl font-bold p-6 border-b border-gray-200">
            ЖКХ
          </div>
          <nav className="flex flex-col gap-1 mt-4 px-4">
            <Link to="/overview-page"><SidebarItem icon={<FaChartBar />} text="Обзор" active={false} /></Link>
            <Link to="/abonents"><SidebarItem icon={<FaUsers />} text="Абоненты" active={true} /></Link>
            <Link to="/report"><SidebarItem icon={<FaFileExcel />} text="Отчеты" active={false} /></Link>
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
      <div className="flex items-center gap-4 mb-6">
      <div className="flex gap-4">
        <h2 className="text-2xl font-semibold mb-6">Абоненты</h2>
      </div>
          <input
            type="text"
            placeholder="Поиск..."
            className="ml-8 w-[400px] h-[42px] max-w-sm p-2 border rounded-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="w-[140px] h-[42px] px-4 py-2 bg-black text-white rounded-2xl">Найти</button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-[400px] h-[49px] p-2 border rounded-2xl">
            <option value="all">За все время</option>
            <option value="month">Последний месяц</option>
          </select>

          <select value={debtStatus} onChange={(e) => setDebtStatus(e.target.value)} className="w-[400px] h-[49px] p-2 border rounded-2xl">
            <option value="all">Все</option>
            <option value="overdue">С просрочкой</option>
          </select>

          <button
            className="ml-20 w-[250px] h-[49px] px-4 py-2 bg-black text-white rounded-2xl"
            onClick={() => setIsModalOpen(true)}
          >
            Загрузить файл
          </button>
        </div>

        {loading ? (
          <div>Загрузка...</div>
        ) : (
          <div className="border rounded-lg overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white">
                <tr className="text-muted-foreground">
                  <th className="p-3">Имя</th>
                  <th className="p-3">Адрес</th>
                  <th className="p-3">Дата последнего платежа</th>
                  <th className="p-3">Сумма</th>
                  <th className="p-3">ИИН</th>
                </tr>
              </thead>
              <tbody>
                {debtors.map((debtor, index) => (
                  <tr key={index} className="border-t bg-white hover:bg-gray-50">
                    <td className="p-3 font-medium">{debtor.full_name}</td>
                    <td className="p-3">{debtor.address}</td>
                    <td className="p-3">{debtor.last_payment || 'Не указано'}</td>
                    <td className="p-3">{debtor.current_debt}</td>
                    <td className="p-3">{debtor.iin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Загрузить файл</h2>
            <p className="text-center text-gray-600 mb-4">Поддерживаются форматы: .xls, .xlsx, .csv, .json</p>

            <input
              type="file"
              ref={fileInputRef}
              className="mb-4 w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Отмена
              </button>
              <button
                onClick={handleFileUpload}
                className="px-4 py-2 bg-black text-white rounded"
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