import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';

import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

import axios from 'axios';


const center = { lat: 52.2871, lng: 76.9674 };


const Home = () => {
  const navigate = useNavigate();
  const [iin, setIin] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyCcedIxvffvLDKZM3mFjDBhV6ow8UplfOc",
  });
  const handleCheckDebt = async () => {
    if (!iin) {
      alert("Пожалуйста, введите ваш ИИН.");
      return;
    }
    
    setLoading(true);
    try {
      // Отправляем запрос на сервер для проверки задолженности
      const response = await axios.get(`http://localhost:8000/api/debt/${iin}/`);
      
      // Если данные получены, перенаправляем на страницу с результатами
      if (response.data) {
        navigate('/debtcheck', { state: { debtInfo: response.data } });
      } else {
        alert('Нет данных по задолженности для данного ИИН.');
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
        const res = await axios.get('http://localhost:8000/api/buildings/', {
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

  if (!isLoaded) return <div>Загрузка карты...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-black relative">
    {/* Меню бар */}
    <SidebarMenu />
      

      {/* Хедер */}
      <header
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/main.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-6 uppercase text-white">
            Городской комитет модернизации жилья
          </h1>
          <img src="/logo.png" alt="Логотип" className="w-36 md:w-44 mb-6" />

          <div className="mt-40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-64 max-w-7xl w-full px-1 justify-items-center">
              {[
                {
                  title: 'Реконструкция тепловых сетей',
                  text: 'В Павлодарской области запланировано строительство и ремонт более трёх десятков километров тепловых магистралей. Финансирование этих проектов осуществляется из резерва правительства по поручению главы государства.',
                  bg: 'bg-white',
                  textColor: 'text-black',
                },
                {
                  title: 'Модернизация энергетического и коммунального секторов',
                  text: 'Проект, утверждённый правительством Казахстана и рассчитанный на 2025–2029 годы, направлен на поэтапное снижение износа инфраструктуры, включая системы водоснабжения и водоотведения.',
                  bg: 'bg-white',
                  textColor: 'text-black',
                },
                {
                  title: 'Государственная программа жилищно-коммунального развития "Нурлы жер"',
                  text: 'Программа консолидирует меры государственной поддержки в сфере модернизации и развития системы ЖКХ, включая вопросы модернизации коммунальной инфраструктуры, систем тепло-, водоснабжения и водоотведения.',
                  bg: 'bg-white',
                  textColor: 'text-black',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.bg} ${item.textColor} rounded-[20px] p-6 w-full md:w-[420px] h-auto shadow-lg text-[16px] transition-colors duration-300 hover:bg-[#05A7E3] hover:text-white`}
                >
                  <h3 className="font-bold mb-3 text-lg">{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>







        </div>
      </header>

      {/* Фотографии города */}
      <section className="bg-white grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-16">
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
      <section className="bg-white flex justify-center px-6 pt-0 pb-20">
        <div className="flex flex-row justify-between gap-x-10 max-w-[1630px] w-full">
          <button
            className="bg-[#2E2E2E] text-white text-base md:text-lg h-[60px] w-[530px] rounded-[20px] font-semibold"
            onClick={() => navigate('/activity')}
          >
            О деятельности
          </button>
          <button
            className="bg-[#2E2E2E] text-white text-base md:text-lg h-[60px] w-[530px] rounded-[20px] font-semibold"
            onClick={() => navigate('/organization')}
          >
            Структура организации
          </button>
          <button
            className="bg-[#2E2E2E] text-white text-base md:text-lg h-[60px] w-[530px] rounded-[20px] font-semibold"
            onClick={() => navigate('/compl')}
          >
            Завершенные объекты
          </button>
        </div>
      </section>



      {/* Проверка задолженности */}
       <section className="bg-white py-10 px-6 text-white flex justify-center">
        <div className="bg-[#05A7E3] rounded-2xl shadow-lg px-6 py-8 w-full max-w-4xl text-center">
          <h2 className="text-2xl font-semibold mb-6">Посмотреть задолженность</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="text"
              placeholder="Введите ваш ИИН"
              className="w-full md:w-[680px] px-5 py-3 rounded-[20px] text-black"
              value={iin}
              onChange={(e) => setIin(e.target.value)}
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
      <section className="bg-white px-6 py-12">
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
                  <h3 className="font-bold text-black mb-1">{selectedBuilding.address}</h3>
                  <p className='text-black'>Жильцов: {selectedBuilding.total_residents}</p>
                  <p className='text-black'>Должников: {selectedBuilding.total_debtors}</p>
                  <p className='text-black'>Задолженность: {selectedBuilding.total_debt} ₸</p>
            
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
          
                </div>
                </InfoWindow>
              )}
            </GoogleMap>
            </div>
      </section>

      {/* Футер */}
      <footer className="bg-black text-white px-6 py-8 text-sm">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="font-semibold mb-2">Контакты</h3>
            <p>Время работы: 09:00–18:00</p>
            <p>Телефон: +7 (7182) 32–22–30</p>
            <p>Телефон: +7 (7182) 32–22–60</p>
          </div>
          <div>
            <p>Отдел бухгалтерии</p>
            <p>Приемная</p>
          </div>
          <div>
            <p>Адрес: ул. Кривенко 25</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
