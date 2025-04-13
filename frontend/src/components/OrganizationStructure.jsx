import React from "react";

export default function StructurePage() {
  return (
    <div className="relative text-white w-full max-w-[1440px] mx-auto">
      {/* Фоновое изображение */}
      <div
        className="absolute inset-0 h-[616px] bg-cover bg-center"
        style={{ backgroundImage: "url('/main.jpg')" }}
      />

      {/* Тёмный оверлей */}
      <div className="absolute inset-0 h-[616px] bg-black/70" />

      {/* Контент поверх фона */}
      <div className="relative z-10 flex flex-col justify-center h-[616px] px-6">
        {/* Логотип по макету */}
        <img
          src="/logo.png"
          alt="Эмблема"
          className="absolute top-[206px] left-[208px] w-[236px] h-[236px]"
        />

        {/* Заголовок */}
        <h1 className="absolute top-[55px] left-[294px] w-[853px] text-[32px] font-bold uppercase font-montserrat leading-[1] tracking-[0px]">
          Городской комитет модернизации жилья
        </h1>

        {/* Первый абзац */}
        <p className="absolute top-[306px] left-[476px] max-w-[756px] text-[20px] leading-[1] font-montserrat font-normal text-left">
          <span className="font-bold">Комитет модернизации жилья</span> — это специализированный орган, отвечающий за развитие, контроль и цифровизацию процессов в сфере жилищно-коммунального хозяйства города Павлодара.
        </p>

        {/* Второй абзац */}
        <p className="absolute top-[370px] left-[476px] max-w-[756px] text-[20px] leading-[1] font-montserrat font-bold text-left">
          Организационная структура выстроена с учетом ключевых направлений деятельности и ориентирована на обеспечение прозрачности, оперативности и эффективности принимаемых решений.
        </p>
      </div>

      {/* Руководство */}
      <section className="bg-white text-black px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 uppercase">Руководство комитета</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-6 items-start">
            <img src="/pers1.jpg" alt="Сериков Жамбыл" className="w-32 h-40 object-cover rounded-md shadow" />
            <div>
              <h3 className="font-bold text-lg">Сериков Жамбыл Исламович</h3>
              <p className="text-sm mb-2">Председатель комитета</p>
              <p className="text-sm">Обеспечивает общее руководство деятельностью организации, принимает стратегические решения, взаимодействует с органами власти и регулирующими инстанциями.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <img src="/pers2.jpg" alt="Аманжолов Данияр" className="w-32 h-40 object-cover rounded-md shadow" />
            <div>
              <h3 className="font-bold text-lg">Аманжолов Данияр Ихласович</h3>
              <p className="text-sm mb-2">Заместитель председателя</p>
              <p className="text-sm">Курирует реализацию программ модернизации, контролирует соблюдение сроков и качества выполняемых работ, координирует взаимодействие с подрядными организациями.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Подразделения */}
      <section className="bg-white text-black px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 uppercase">Основные подразделения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-2">1. Отдел цифровизации и аналитики</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Разработка и внедрение программных решений</li>
              <li>Поддержка админ-платформ и баз данных</li>
              <li>Сбор и обработка поступающих данных из внешних источников</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">2. Абонентский отдел</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Работа с данными по абонентам и жилым объектам</li>
              <li>Подготовка сводных отчетов и аналитики</li>
              <li>Взаимодействие с поставщиками коммунальных услуг</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">3. Отдел мониторинга объектов</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Сопровождение проектов модернизации и реконструкции</li>
              <li>Работа с геоинформационными системами</li>
              <li>Сбор и анализ информации с объектов</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">4. Юридический отдел</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Сопровождение договоров и правовых документов</li>
              <li>Контроль соответствия действующему законодательству</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">5. Отдел по связям с общественностью</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Информирование жителей города о ходе работ</li>
              <li>Поддержка открытого доступа к информации</li>
              <li>Работа с обращениями и заявками граждан</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Подвал */}
      <footer className="bg-black text-white px-6 py-8 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <p className="font-semibold mb-1">Контакты</p>
            <p>Время работы: 09:00–18:00</p>
          </div>
          <div className="mb-4 md:mb-0">
            <p><span className="font-semibold">Телефон:</span> +7 (7182) 32-22-30</p>
            <p><span className="font-semibold">Телефон:</span> +7 (7182) 32-22-60</p>
          </div>
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">Отдел бухгалтерии</p>
            <p className="text-gray-400">Приемная</p>
          </div>
          <div>
            <p><span className="font-semibold">Адрес:</span> ул. Кривенко 25</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
