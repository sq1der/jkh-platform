import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicMap from './PublicMap';
import { Menu, X } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans text-white bg-[#121212] relative overflow-x-hidden">
      {/* Кнопка меню */}
      {!menuOpen && (
        <button
          className="fixed z-50 top-[51px] left-[26px] w-[48px] h-[48px] flex items-center justify-center text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={32} />
        </button>
      )}

      {/* Меню */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#1E1E1E] text-white z-40 px-6 py-10 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Кнопка закрытия */}
        <button className="mb-8 text-white" onClick={() => setMenuOpen(false)}>
          <X size={32} />
        </button>

        <h2 className="text-xl font-bold mb-8">КОМИТЕТ МОДЕРНИЗАЦИИ ЖИЛЬЯ</h2>
        <nav className="flex flex-col gap-6 text-lg">
          <button onClick={() => { navigate('/about'); setMenuOpen(false); }} className="hover:underline">
            О ДЕЯТЕЛЬНОСТИ
          </button>
          <button onClick={() => { navigate('/organization'); setMenuOpen(false); }} className="hover:underline">
            СТРУКТУРА ОРГАНИЗАЦИИ
          </button>
          <button onClick={() => { navigate('/projects'); setMenuOpen(false); }} className="hover:underline">
            ЗАВЕРШЕННЫЕ ОБЪЕКТЫ
          </button>
          <button onClick={() => { navigate('/debt'); setMenuOpen(false); }} className="hover:underline">
            ПОСМОТРЕТЬ ЗАДОЛЖЕННОСТЬ
          </button>
        </nav>
      </div>

      {/* Хедер */}
      <header
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/main.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-6 uppercase">
            Городской комитет модернизации жилья
          </h1>
          <img src="/logo.png" alt="Логотип" className="w-36 md:w-44 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 max-w-6xl w-full">
            {[
              {
                title: 'Реконструкция тепловых сетей',
                text: 'В Павлодарской области запланировано строительство и ремонт более трёх десятков километров тепловых магистралей. Финансирование этих проектов осуществляется из резерва правительства по поручению главы государства.',
              },
              {
                title: 'Модернизация энергетического сектора',
                text: 'Проект, утверждённый правительством Казахстана и рассчитанный на 2025–2029 годы, направлен на поэтапное снижение износа инфраструктуры, включая системы водоснабжения и водоотведения.',
              },
              {
                title: 'Госпрограмма развития ЖКХ',
                text: 'Программа консолидирует меры государственной поддержки в сфере модернизации и развития системы ЖКХ, включая вопросы модернизации коммунальной инфраструктуры, систем тепло-, водоснабжения и водоотведения.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-xl p-4 text-sm shadow-md transition-colors duration-300 hover:bg-[#05A7E3] hover:text-white"
              >
                <h3 className="font-bold mb-2 text-sm">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Фотографии города */}
      <section className="bg-white grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12">
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
      <section className="bg-white flex flex-col md:flex-row justify-center gap-8 px-6 pb-20">
        <button className="bg-[#2E2E2E] text-white py-3 px-6 w-[300px] rounded-[20px] font-semibold shadow">
          О деятельности
        </button>
        <button
          className="bg-[#2E2E2E] text-white py-3 px-6 w-[300px] rounded-[20px] font-semibold shadow"
          onClick={() => navigate('/organization')}
        >
          Структура организации
        </button>
        <button className="bg-[#2E2E2E] text-white py-3 px-6 w-[300px] rounded-[20px] font-semibold shadow">
          Завершенные объекты
        </button>
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
            />
            <button className="bg-[#2E2E2E] px-8 py-3 rounded-[20px] font-semibold">Проверить</button>
          </div>
        </div>
      </section>

      {/* Карта */}
      <section className="bg-white px-6 py-12">
        <div className="rounded-2xl overflow-hidden shadow-lg max-w-[1280px] mx-auto h-[600px]">
          <PublicMap />
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
