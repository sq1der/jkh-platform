import { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link, useLocation } from 'react-router-dom';

const center = { lat: 52.2871, lng: 76.9674 };

export default function Overview() {
  const [adminName, setAdminName] = useState('');
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState("all");
  const [peopleFilter, setPeopleFilter] = useState("all");

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
      } catch (err) {
        console.error('Ошибка загрузки зданий:', err);
      }
    };

    fetchBuildings();
  }, []);

  const handleFileUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8000/api/debtors/upload/', formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      alert('Файл успешно загружен');
    } catch {
      alert('Ошибка загрузки файла');
    }
  };

  const pieChartData = {
    labels: ['Район 1', 'Район 2', 'Район 3'],
    datasets: [
      {
        label: 'Количество объектов',
        data: [5, 3, 2],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
      },
    ],
  };

  if (!isLoaded) return <div>Загрузка карты...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Сайдбар */}
      <aside className="w-64 bg-white p-4 shadow-md relative">
        <h1 className="text-3xl font-bold mb-6">ЖКХ</h1>
        <nav className="space-y-2">
          <div className="font-bold text-blue-500" ><Link>Обзор</Link></div>
          <div className="text-muted-foreground hover:text-black"><Link to="/abonents" >Абоненты</Link></div>
          <div className="text-muted-foreground hover:text-black"><Link>Отчеты</Link></div>
          <div className="text-muted-foreground hover:text-black"><Link>Настройки</Link></div>
        </nav>
        <div className="absolute bottom-4 left-4 text-sm">
          <div className="font-medium">{adminName}</div>
          <div className="text-muted-foreground text-xs">Администратор</div>
        </div>
      </aside>

      <main className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-6">Обзор</h2>
        {/* Фильтры */}
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
          {/* Левая колонка */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Статистика</h2>

            {/* Карточки */}
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

            {/* Диаграмма */}
            <div className="bg-white p-4 rounded-2xl shadow">
              <h3 className="font-semibold mb-2">Распределение по районам</h3>
              <Pie data={pieChartData} />
            </div>
          </div>

          {/* Правая колонка — Карта */}
          <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Карта</h2>

          
          <div className="rounded-lg shadow overflow-hidden h-[600px]">
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
                  <div className="text-sm w-64 transition duration-300 animate-fade-in">
                    <h3 className="font-bold mb-1">{selectedBuilding.address}</h3>
                    <p>Жильцов: {selectedBuilding.total_residents}</p>
                    <p>Должников: {selectedBuilding.total_debtors}</p>
                    <p>Задолженность: {selectedBuilding.total_debt} ₸</p>
                    <button className="mt-2 bg-black text-white px-2 py-1 rounded text-xs hover:bg-gray-800">
                      Просмотреть абонентов
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно */}
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
