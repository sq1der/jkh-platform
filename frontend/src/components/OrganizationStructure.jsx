import React from "react";
import SidebarMenu from '../components/SidebarMenu';
import Footer from './Footer';
export default function StructurePage() {
  return (
    <div className="text-white w-full">
      {/* Меню бар */}
      <SidebarMenu />
      {/* Фоновый блок (на всю ширину) */}
      <div
        className="relative w-full h-[616px] bg-cover bg-center  overflow-hidden"
        style={{ backgroundImage: "url('/main.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 lg:px-[208px] max-w-[1440px] mx-auto">
          <h1 className="text-[32px] font-bold uppercase font-montserrat leading-tight max-w-[853px] mb-6">
            Городской комитет модернизации жилья
          </h1>
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <img
              src="/logo.png"
              alt="Эмблема"
              className="w-[236px] h-[236px] object-contain"
            />
            <div className="space-y-6 max-w-[756px] text-[20px] leading-relaxed font-montserrat text-left">
              <p>
                <span className="font-bold">Комитет модернизации жилья</span> — это специализированный орган, отвечающий за развитие, контроль и цифровизацию процессов в сфере жилищно-коммунального хозяйства города Павлодара.
              </p>
              <p className="font-bold">
                Организационная структура выстроена с учетом ключевых направлений деятельности и ориентирована на обеспечение прозрачности, оперативности и эффективности принимаемых решений.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Руководство */}
      
  <section className="bg-white text-black px-6 py-16 max-w-7xl mx-auto">
    <h2 className="text-4xl font-semibold mb-10 uppercase tracking-wide">
      Руководство комитета
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {[
        {
          name: "Сериков Жамбыл Исламович",
          role: "Председатель комитета",
          img: "/pers1.jpg",
          desc: "Обеспечивает общее руководство деятельностью организации, принимает стратегические решения, взаимодействует с органами власти и регулирующими инстанциями.",
        },
        {
          name: "Аманжолов Данияр Ихласович",
          role: "Заместитель председателя",
          img: "/pers2.jpg",
          desc: "Курирует реализацию программ модернизации, контролирует соблюдение сроков и качества выполняемых работ, координирует взаимодействие с подрядными организациями.",
        },
      ].map((person, index) => (
        <div key={index} className="flex gap-6 items-start">
          <img
            src={person.img}
            alt={person.name}
            className="w-32 h-40 object-cover rounded-xl shadow-lg transition-transform hover:scale-105"
          />
          <div>
            <h3 className="font-semibold text-xl leading-snug">
              {person.name}
            </h3>
            <p className="text-sm mb-2 font-medium text-gray-700">{person.role}</p>
            <p className="text-sm leading-relaxed">{person.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Подразделения */}
  <section className="bg-white text-black px-6 py-16 max-w-7xl mx-auto">
    <h2 className="text-4xl font-semibold mb-10 uppercase tracking-wide">
      Основные подразделения
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">
      {[
        {
          title: "1. Отдел цифровизации и аналитики",
          items: [
            "Разработка и внедрение программных решений",
            "Поддержка админ-платформ и баз данных",
            "Сбор и обработка поступающих данных из внешних источников",
          ],
        },
        {
          title: "2. Абонентский отдел",
          items: [
            "Работа с данными по абонентам и жилым объектам",
            "Подготовка сводных отчетов и аналитики",
            "Взаимодействие с поставщиками коммунальных услуг",
          ],
        },
        {
          title: "3. Отдел мониторинга объектов",
          items: [
            "Сопровождение проектов модернизации и реконструкции",
            "Работа с геоинформационными системами",
            "Сбор и анализ информации с объектов",
          ],
        },
        {
          title: "4. Юридический отдел",
          items: [
            "Сопровождение договоров и правовых документов",
            "Контроль соответствия действующему законодательству",
          ],
        },
        {
          title: "5. Отдел по связям с общественностью",
          items: [
            "Информирование жителей города о ходе работ",
            "Поддержка открытого доступа к информации",
            "Работа с обращениями и заявками граждан",
          ],
        },
      ].map((dept, i) => (
        <div key={i}>
          <h4 className="font-semibold text-base mb-2 text-gray-900">
            {dept.title}
          </h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {dept.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
  {/* Футер */}
  <Footer />
      
    </div>
  );
}
