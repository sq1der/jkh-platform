import React from 'react';
import PublicMap from './PublicMap';

const Home = () => {
  return (
    <div className="font-sans text-white bg-[#121212]">
      {/* Хедер */}
    <header
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/main.jpg')" }}
    >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
         <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-6">
            ГОРОДСКОЙ КОМИТЕТ МОДЕРНИЗАЦИИ ЖИЛЬЯ
         </h1>
         <img src="/logo.png" alt="Логотип" className="w-44 md:w-52" />
        </div>
    </header>


      {/* Три карточки */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12 bg-white text-black">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-3">Реконструкция тепловых сетей</h3>
          <p className="text-sm leading-relaxed">В Павлодарской области запланировано строительство и ремонт более трёх...</p>
        </div>
        <div className="bg-sky-500 text-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-3">Модернизация энергетического сектора</h3>
          <p className="text-sm leading-relaxed">Проект, утверждённый правительством Казахстана и рассчитанный на 2025-2029 годы...</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-3">Госпрограмма развития ЖКХ</h3>
          <p className="text-sm leading-relaxed">Программа координирует меры государственной поддержки в сфере модернизации...</p>
        </div>
      </section>

      {/* Фотографии города */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-12">
        <img src="/city1.jpg" alt="Город 1" className="rounded-xl w-full h-64 object-cover" />
        <img src="/city2.jpg" alt="Город 2" className="rounded-xl w-full h-64 object-cover" />
        <img src="/city3.jpg" alt="Город 3" className="rounded-xl w-full h-64 object-cover" />
      </section>

      {/* Кнопки */}
      <section className="flex flex-col md:flex-row justify-center gap-6 px-6 pb-12">
        <button className="bg-black text-white py-4 px-8 rounded-full text-sm md:text-base font-semibold">О деятельности</button>
        <button className="bg-black text-white py-4 px-8 rounded-full text-sm md:text-base font-semibold">Структура организации</button>
        <button className="bg-black text-white py-4 px-8 rounded-full text-sm md:text-base font-semibold">Завершенные объекты</button>
      </section>

      {/* Проверка задолженности */}
      <section className="bg-sky-500 py-10 px-6 text-white">
        <h2 className="text-2xl font-semibold mb-6">Посмотреть задолженность</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Введите ваш ИИН"
            className="w-full md:w-1/2 px-5 py-3 rounded text-black text-base"
          />
          <button className="bg-black px-8 py-3 rounded font-semibold text-base">Проверить</button>
        </div>
      </section>

      {/* Карта с Google Maps */}
      <section className="bg-white px-6 py-12">
        <div className="rounded-2xl overflow-hidden shadow-lg">
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
