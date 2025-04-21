import React from 'react';
import SidebarMenu from '../components/SidebarMenu';
const ProjectPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
        {/* Меню бар */}
        <SidebarMenu />
      {/* Header */}
      <header className="bg-white shadow p-6 text-center text-2xl font-semibold">
        Модернизация тепловых сетей в микрорайоне "Сарыарка"
      </header>

      {/* Описание и главная фотка */}
      <section className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-xl border p-4 shadow">
          <h2 className="font-semibold text-lg mb-2">Описание:</h2>
          <p className="text-sm">
            Полная замена устаревших трубопроводов протяжённостью более 5 км, установка автоматизированных теплопунктов и внедрение системы удалённого мониторинга. Благодаря проекту улучшено теплоснабжение для 15 многоквартирных домов.
          </p>
          <div className="mt-3 text-sm text-gray-500">
            июнь 2023 – март 2024
          </div>
        </div>
        <img
          src="/dom1.jpg"
          alt="Дом 1"
          className="w-full h-full object-cover rounded-xl shadow"
        />
      </section>

      {/* Галерея с тремя фотографиями */}
      <section className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <img src="/dom3.jpg" alt="Дом 3" className="w-full h-64 object-cover rounded-xl shadow" />
        <img src="/remont.jpg" alt="Ремонт" className="w-full h-64 object-cover rounded-xl shadow" />
        <img src="/truby.jpg" alt="Трубы" className="w-full h-64 object-cover rounded-xl shadow" />
      </section>

      {/* Карта и выполненные работы */}
      <section className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="col-span-2 bg-white rounded-2xl overflow-hidden shadow">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.1993389999997!2d76.947!3d51.676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42435f3a42a6efad%3A0xe6b1530f1aa1e8e6!2z0JzQtdC90YLRgNCw0LvRjNC90LjRjyDQvNC10YHQutCw0YDQvdGL0Lkg0KHQstC-0YDQtdC60LAgItCR0L7Qu9C40YbQsCI!5e0!3m2!1sru!2skz!4v1713740641697!5m2!1sru!2skz"
            className="w-full h-[500px]"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow h-full">
          <h2 className="font-semibold text-lg mb-4">Выполненные работы</h2>
          <p className="text-sm mb-3">
            Полная замена устаревших трубопроводов протяжённостью более 5 км, установка автоматизированных теплопунктов и внедрение систем удалённого мониторинга. Благодаря проекту улучшено теплоснабжение для 15 многоквартирных домов.
          </p>
          <p className="text-sm font-semibold mt-2">
            Местоположение: <br />
            ул. Ломова – ул. Камзина
          </p>
        </div>
      </section>

      {/* Контакты */}
      <footer className="bg-[#303030] text-white p-6 mt-12 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <div>
            <h3 className="font-semibold">Контакты</h3>
            Время работы: 09:00–18:00
          </div>
          <div>
            <p>Телефон: +7 (7182) 32–22–30 — Отдел бухгалтерии</p>
            <p>Телефон: +7 (7182) 32–22–60 — Приемная</p>
          </div>
          <div>Адрес: ул. Кривенко 25</div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectPage;
