import React from 'react';
import SidebarMenu from '../components/SidebarMenu';

const projects = [
  {
    title: 'Модернизация тепловых сетей в микрорайоне "Сарыарка"',
    period: 'июнь 2023 – март 2024',
    description: 'Полная замена устаревших трубопроводов протяжённостью более 5 км, установка автоматизированных теплопунктов и внедрение системы удалённого мониторинга. Благодаря проекту улучшено теплоснабжение для 15 многоквартирных домов.',
    image: '/image (6).jpg',
  },
  {
    title: 'Реконструкция системы отопления в микрорайоне "Технопарк"',
    period: 'июль 2023 – март 2024',
    description: 'Модернизация системы отопления в микрорайоне с целью повышения энергоэффективности. Заменены старые котельные установки на новые с автоматизированной системой управления.',
    image: '/image (7).jpg',
  },
  {
    title: 'Реконструкция водопроводной сети в районе "Южный"',
    period: 'май 2022 – декабрь 2022',
    description: 'Замена изношенных водопроводных труб, улучшение качества питьевой воды и снижение уровня аварийности. Обеспечено стабильное водоснабжение для более чем 1 200 семей.',
    image: '/image (8).jpg',
  },
  {
    title: 'Модернизация системы водоотведения в районе "Центр"',
    period: 'март 2023 – август 2023',
    description: 'Ремонт и модернизация дождевой канализации, установка новых фильтров для очистки сточных вод. Современные решения позволили значительно уменьшить количество затоплений в этом районе.',
    image: '/image (9).jpg',
  },
  {
    title: 'Капитальный ремонт многоквартирных домов',
    period: 'август 2023 – октябрь 2023',
    description: 'Ремонт фасадов, кровли и инженерных сетей в 3 жилых домах. Проект реализован с участием местных подрядчиков и показал высокую эффективность.',
    image: '/image (10).jpg',
  },
  {
    title: 'Внедрение системы умных счетчиков для многоквартирных домов',
    period: 'сентябрь 2023 – декабрь 2023',
    description: 'Установка умных счетчиков для учёта потребления воды, газа и электроэнергии в 30 многоквартирных домах. Система позволяет жителям отслеживать свои расходы в реальном времени.',
    image: '/image (11).jpg',
  },
];

const CompletedProjects = () => {
  return (
    
    <div className="min-h-screen flex flex-col bg-[#121212] text-black relative">
    {/* Меню бар */}
    <SidebarMenu />
      {/* Контент страницы */}
      <div className="flex-1 bg-white px-4 md:px-16 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0075C9] py-10">
          ЗАВЕРШЕННЫЕ ОБЪЕКТЫ
        </h1>

        {/* Карточки */}
        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-[680px] h-[408px] bg-white rounded-xl shadow-md border border-gray-300 flex overflow-hidden"
            >
              {/* Текст */}
              <div className="w-[476px] p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2 leading-snug">
                    {project.title}
                  </h2>
                  <p className="text-sm font-semibold">
                    Срок реализации:{' '}
                    <span className="font-normal">{project.period}</span>
                  </p>
                  <p className="text-sm mt-2 text-gray-700 line-clamp-5">
                    {project.description}
                  </p>
                </div>
                <button className="mt-4 w-[130px] bg-[#00B2FF] text-white text-sm py-2 rounded hover:bg-[#009BDB] transition">
                  Подробнее
                </button>
              </div>

              {/* Фото */}
              <img
                src={project.image}
                alt={project.title}
                className="w-[204px] h-[408px] object-cover"
              />
            </div>
          ))}
        </div>

        {/* Пагинация */}
        <div className="flex justify-center items-center mt-10 gap-2">
          <button className="px-3 py-1 border rounded bg-white text-gray-600 hover:bg-gray-100">
            {'<'}
          </button>
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`px-3 py-1 border rounded ${
                num === 1 ? 'bg-[#00B2FF] text-white' : 'bg-white text-gray-800'
              } hover:bg-[#e0f7ff]`}
            >
              {num}
            </button>
          ))}
          <button className="px-3 py-1 border rounded bg-white text-gray-600 hover:bg-gray-100">
            {'>'}
          </button>
        </div>
      </div>

      {/* Футер */}
      <footer className="bg-[#303030] text-white py-6 px-4 md:px-20 text-sm w-full">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold mb-2">Контакты</p>
            <p>Время работы: 09:00–18:00</p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Телефон:</span> +7 (7182) 32–22–30
            </p>
            <p>
              <span className="font-semibold">Телефон:</span> +7 (7182) 32–22–60
            </p>
          </div>
          <div>
            <p>Отдел бухгалтерии</p>
            <p>Приемная</p>
            <p>
              <span className="font-semibold">Адрес:</span> ул. Кривенко 25
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompletedProjects;
