import { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import { Link } from 'react-router-dom';
import React from 'react';
import { FaChartBar, FaUsers, FaFileExcel, FaCog } from 'react-icons/fa';
import ChartDataLabels from 'chartjs-plugin-datalabels';  

Chart.register(ChartDataLabels);

const center = { lat: 52.2871, lng: 76.9674 };

export default function Overview() {
  const [adminName, setAdminName] = useState('');
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState("all");
  const [peopleFilter, setPeopleFilter] = useState("all");
  const [districtStats, setDistrictStats] = useState({});

  const fileInputRef = useRef(null);
  const accessToken = localStorage.getItem('accessToken');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCcedIxvffvLDKZM3mFjDBhV6ow8UplfOc",
  });

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

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/buildings/', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        const parsed = res.data.map(item => {
          const matches = item.location.match(/POINT \(([-\d.]+) ([-\d.]+)\)/);
          return {
            ...item,
            lat: parseFloat(matches?.[2]),
            lng: parseFloat(matches?.[1])
          };
        });

        setBuildings(parsed);

        // Расчёт распределения по районам
        const districtCount = {};
        parsed.forEach(building => {
          const district = building.district || "Неизвестно";
          districtCount[district] = (districtCount[district] || 0) + 1;
        });
        setDistrictStats(districtCount);
      } catch (err) {
        console.error('Ошибка загрузки зданий:', err);
      }
    };

    fetchBuildings();
  }, []);

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

  const pieChartData = {
    labels: Object.keys(districtStats),
    datasets: [
      {
        label: 'Количество объектов',
        data: Object.values(districtStats),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#800080',
          '#EF4444',
          '#6366F1',
          '#14B8A6',
          '#F43F5E',
          '#A855F7',
          '#6EE7B7',
        ],
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: 'white',
        font: {
          weight: 'bold',
          size: 14,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  if (!isLoaded) return <div>Загрузка карты...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="text-3xl font-bold p-6 border-b border-gray-200">
            ЖКХ
          </div>
          <nav className="flex flex-col gap-1 mt-4 px-4">
            <Link to="/overview-page"><SidebarItem icon={<FaChartBar />} text="Обзор" active={true} /></Link>
            <Link to="/abonents"><SidebarItem icon={<FaUsers />} text="Абоненты" active={false} /></Link>
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

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">Обзор</h2>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-4">
            <select value={period} onChange={e => setPeriod(e.target.value)} className="w-[400px] p-2 border rounded-2xl">
              <option value="all">Период: Все время</option>
              <option value="month">Последний месяц</option>
            </select>
            <select value={peopleFilter} onChange={e => setPeopleFilter(e.target.value)} className="w-[400px] h-[49px] p-2 border rounded-2xl">
              <option value="all">Люди: Все</option>
            </select>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="w-[250px] h-[49px] bg-black text-white px-4 py-2 rounded-2xl">Загрузить файл</button>
          <input type="file" ref={fileInputRef} className="hidden" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Статистика</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow p-4 transition-opacity duration-500">
                <div className="text-gray-500">Абоненты</div>
                <div className="text-2xl font-bold">
                  {buildings.reduce((sum, b) => sum + b.total_residents, 0)}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 transition-opacity duration-500">
                <div className="text-gray-500">Сумма задолженности</div>
                <div className="text-2xl font-bold">
                  {buildings.reduce((sum, b) => sum + parseFloat(b.total_debt), 0).toLocaleString()} ₸
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow h-[700px]">
              <h3 className="font-semibold mb-2">Распределение по районам</h3>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Карта</h2>
            <div className="rounded-lg shadow overflow-hidden h-[810px]">
              <GoogleMap
                center={center}
                zoom={13}
                mapContainerStyle={{ width: '100%', height: '100%' }}
              >
                {buildings.map(b => (
                  <Marker
                    key={b.id}
                    position={{ lat: b.lat, lng: b.lng }}
                    onClick={() => setSelectedBuilding(b)}
                  />
                ))}

                {selectedBuilding && (
                  <InfoWindow
                    position={{ lat: selectedBuilding.lat, lng: selectedBuilding.lng }}
                    onCloseClick={() => setSelectedBuilding(null)}
                  >
                    <div className="text-sm w-72 transition duration-300 animate-fade-in">
                      <h3 className="font-bold mb-1">{selectedBuilding.address}</h3>
                      <p>Жильцов: {selectedBuilding.total_residents}</p>
                      <p>Должников: {selectedBuilding.total_debtors}</p>
                      <p>Задолженность: {selectedBuilding.total_debt} ₸</p>

                      {selectedBuilding.debtors?.length > 0 && (
                        <div className="mt-2">
                          <p className="font-semibold">Должники:</p>
                          <ul className="list-disc list-inside text-xs max-h-24 overflow-y-auto">
                            {selectedBuilding.debtors.map((debtor, idx) => (
                              <li key={idx}>{debtor.name} — {debtor.amount} ₸</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link
                        to={`/abonents`}
                        className="mt-3 inline-block bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800"
                      >
                        Перейти к абонентам
                      </Link>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </div>
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

export function SidebarItem({ icon, text, active }) {
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
