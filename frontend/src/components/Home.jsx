import React from 'react';
import PublicMap from './PublicMap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="font-sans text-white bg-[#121212]">
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
        <div className="bg-white text-black rounded-xl p-4 text-sm shadow-md transition-colors duration-300 hover:bg-[#05A7E3] hover:text-white">
        <h3 className="font-bold mb-2 text-sm">Реконструкция тепловых сетей</h3>
        <p>В Павлодарской области запланировано строительство и ремонт более трёх десятков километров тепловых магистралей. Финансирование этих проектов осуществляется из резерва правительства по поручению главы государства.</p>
        </div>
        <div className="bg-white text-black rounded-xl p-4 text-sm shadow-md transition-colors duration-300 hover:bg-[#05A7E3] hover:text-white">
        <h3 className="font-bold mb-2 text-sm">Модернизация энергетического сектора</h3>
        <p>Проект, утверждённый правительством Казахстана и рассчитанный на 2025–2029 годы, направлен на поэтапное снижение износа инфраструктуры, включая системы водоснабжения и водоотведения.</p>
        </div>
        <div className="bg-white text-black rounded-xl p-4 text-sm shadow-md transition-colors duration-300 hover:bg-[#05A7E3] hover:text-white">
        <h3 className="font-bold mb-2 text-sm">Госпрограмма развития ЖКХ</h3>
        <p>Программа консолидирует меры государственной поддержки в сфере модернизации и развития системы ЖКХ, включая вопросы модернизации коммунальной инфраструктуры, систем тепло-, водоснабжения и водоотведения.</p>
        </div>
    </div>
    </div>

      </header>

      {/* Фотографии города */}
      <section className="bg-white grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12">
        <img src="/city1.jpg" alt="Город 1" className="rounded-xl w-full h-64 object-cover" />
        <img src="/city2.jpg" alt="Город 2" className="rounded-xl w-full h-64 object-cover" />
        <img src="/city3.jpg" alt="Город 3" className="rounded-xl w-full h-64 object-cover" />
      </section>


      {/* Кнопки */}
      <section className="bg-white flex flex-col md:flex-row justify-center gap-96 px-32 pb-20">
        <button className="bg-[#2E2E2E] text-white py-3 px-6 width-[448px] rounded-[20px] font-semibold shadow">О деятельности</button>
        <button className="bg-[#2E2E2E] text-white py-3 px-6 width-[448px] rounded-[20px] font-semibold shadow" onClick={() => navigate('/organization')}>Структура организации</button>
        <button className="bg-[#2E2E2E] text-white py-3 px-6 width-[448px] rounded-[20px] font-semibold shadow ">Завершенные объекты</button>
      </section>

      {/* Проверка задолженности */}
      <section className="bg-white py-10 px-6 text-white flex justify-center">
        <div className="bg-[#05A7E3] rounded-2xl shadow-lg px-6 py-8 w-full max-w-xxl text-center">
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
            <p>Время работы: 09:00-18:00</p>
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