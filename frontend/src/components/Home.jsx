import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import Footer from './Footer';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

const center = { lat: 52.2871, lng: 76.9674 };

const Home = () => {
  const navigate = useNavigate();
  const [personal_account, setPersonal_account] = useState('');
  const [loading, setLoading] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleCheckDebt = async () => {
    if (!personal_account) {
      alert("Пожалуйста, введите ваш номер лицевого счета.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/api/debt-info/`, { params: { personal_account } });

      if (response.data) {
        navigate('/debtcheck', { state: { debtInfo: response.data } });
      } else {
        alert('Нет данных по задолженности для данного лицевого счета.');
      }
    } catch (error) {
      console.error('Ошибка при проверке задолженности:', error);
      alert('Произошла ошибка при проверке задолженности.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await axios.get('/api/buildings/');
        const parsed = res.data.map(item => ({
          ...item,
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
        }));
        setBuildings(parsed);
      } catch (err) {
        console.error('Ошибка загрузки зданий:', err);
      }
    };

    fetchBuildings();
  }, []);

  if (!isLoaded) return <div>Загрузка карты...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-black">
      <SidebarMenu />

      {/* Хедер */}
      <header
        className="relative h-[140vh] md:h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/main.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-10 uppercase text-white">
            Горкомхоз Модернизация Жилья
          </h1>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 max-w-7xl w-full">
            {[
              {
                title: 'Модернизация жилых домов',
                text: 'Проведение капитального ремонта многоквартирных домов, включая замену инженерных сетей (водоснабжение, отопление, канализация, электроснабжение), утепление фасадов, ремонт крыш и подвальных помещений.',
              },
              {
                title: 'Модернизация лифтового оборудования',
                text: 'Установка новых лифтов взамен устаревших и неисправных, обеспечение безопасной и комфортной эксплуатации.',
              },
              {
                title: 'Работа с жильцами',
                text: 'Ведение разъяснительной работы среди собственников жилья, сбор согласий на участие в программах модернизации, консультирование по вопросам финансирования и технического сопровождения проектов.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-[20px] p-6 shadow-lg transition-colors duration-300 hover:bg-[#05A7E3] hover:text-white text-[16px]"
              >
                <h3 className="font-bold mb-3 text-lg">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Фото */}
      <section className="bg-white grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-6 py-10">
        {['city1.jpg', 'city2.jpg', 'city3.jpg'].map((src, idx) => (
          <img
            key={idx}
            src={`/${src}`}
            alt={`Город ${idx + 1}`}
            className="rounded-xl w-full h-64 object-cover"
          />
        ))}
      </section>

      {/* Кнопки */}
      <section className="bg-white flex flex-col md:flex-row justify-center items-center gap-4 px-4 md:px-6 py-10">
        <button
          className="bg-[#2E2E2E] text-white text-base md:text-lg h-[60px] w-full max-w-sm md:max-w-[530px] rounded-[20px] font-semibold"
          onClick={() => navigate('/activity')}
        >
          О деятельности
        </button>

        <button
          className="bg-[#2E2E2E] text-white text-base md:text-lg h-[60px] w-full max-w-sm md:max-w-[530px] rounded-[20px] font-semibold"
          onClick={() => navigate('/projects')}
        >
          Завершенные объекты
        </button>
      </section>

      {/* Проверка задолженности */}
      <section className="bg-white py-10 px-4 md:px-6 text-white flex justify-center">
        <div className="bg-[#05A7E3] rounded-2xl shadow-lg px-4 md:px-6 py-8 w-full max-w-4xl text-center">
          <h2 className="text-2xl font-semibold mb-6">Посмотреть задолженность</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="text"
              placeholder="Введите ваш номер лицевого счета"
              className="w-full md:w-[680px] px-5 py-3 rounded-[20px] text-black"
              value={personal_account}
              onChange={(e) => setPersonal_account(e.target.value)}
            />
            <button
              className="bg-[#2E2E2E] px-8 py-3 rounded-[20px] font-semibold"
              onClick={handleCheckDebt}
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Проверить'}
            </button>
          </div>
        </div>
      </section>

      {/* Карта */}
      <section className="bg-white px-4 md:px-6 py-12">
        <div className="rounded-lg shadow overflow-hidden h-[600px] md:h-[810px]">
          <GoogleMap
            center={center}
            zoom={13}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            {buildings.map((b) => (
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
                <div className="text-sm w-64 md:w-72">
                  <h3 className="font-bold text-black mb-1">{selectedBuilding.address}</h3>
                  <p className="text-black">Жильцов: {selectedBuilding.total_residents}</p>
                  <p className="text-black">Должников: {selectedBuilding.total_debtors}</p>
                  <p className="text-black">Задолженность: {selectedBuilding.total_debt} ₸</p>
                  {selectedBuilding.debtors?.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold text-black">Должники:</p>
                      <ul className="list-disc list-inside text-xs max-h-24 overflow-y-auto text-black">
                        {selectedBuilding.debtors.map((debtor, idx) => (
                          <li key={idx}>{debtor.name} — {debtor.amount} ₸</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
