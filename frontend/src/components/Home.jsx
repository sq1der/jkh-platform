import React from 'react';
import PublicMap from './PublicMap';

const Home = () => {
  return (
    <div className="font-sans text-white bg-[#121212]">
      {/* Хедер */}
      <header className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg-city.jpg')" }}>
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">ГОРОДСКОЙ КОМИТЕТ МОДЕРНИЗАЦИИ ЖИЛЬЯ</h1>
          <img src="/logo.png" alt="Логотип" className="w-40 my-6" />
        </div>
      </header>

      {/* Три карточки */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-8 bg-white text-black">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Реконструкция тепловых сетей</h3>
          <p className="text-sm">В Павлодарской области запланировано строительство и ремонт более трёх...</p>
        </div>
        <div className="bg-sky-500 text-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Модернизация энергетического сектора</h3>
          <p className="text-sm">Проект, утверждённый правительством Казахстана и рассчитанный на 2025-2029 годы...</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Госпрограмма развития ЖКХ</h3>
          <p className="text-sm">Программа координирует меры государственной поддержки в сфере модернизации...</p>
        </div>
      </section>

      {/* Фотографии города */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-8">
        <img src="/img1.jpg" alt="Город 1" className="rounded-xl" />
        <img src="/img2.jpg" alt="Город 2" className="rounded-xl" />
        <img src="/img3.jpg" alt="Город 3" className="rounded-xl" />
      </section>

      {/* Кнопки */}
      <section className="flex flex-col md:flex-row justify-center gap-4 px-4 pb-8">
        <button className="bg-black text-white py-3 px-6 rounded-full font-semibold">О деятельности</button>
        <button className="bg-black text-white py-3 px-6 rounded-full font-semibold">Структура организации</button>
        <button className="bg-black text-white py-3 px-6 rounded-full font-semibold">Завершенные объекты</button>
      </section>

      {/* Проверка задолженности */}
      <section className="bg-sky-500 py-6 px-4 text-white">
        <h2 className="text-xl font-semibold mb-4">Посмотреть задолженность</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Введите ваш ИИН"
            className="w-full md:w-1/2 px-4 py-2 rounded text-black"
          />
          <button className="bg-black px-6 py-2 rounded font-semibold">Проверить</button>
        </div>
      </section>

      {/* Карта с Google Maps */}
      <section className="bg-white px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-lg">
              <PublicMap />
          </div>
      </section>


      {/* Футер */}
      <footer className="bg-black text-white px-4 py-6 text-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="font-semibold mb-1">Контакты</h3>
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
