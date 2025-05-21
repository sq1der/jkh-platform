import React from "react";
import SidebarMenu from '../components/SidebarMenu';
import Footer from './Footer';
export default function ActivityPage() {
  return (
    <div className="text-black">
      {/* Меню бар */}
      <SidebarMenu />
      
      {/* Хедер */}
      <header
        className="relative h-[620px] bg-cover bg-center text-white px-6 md:px-16 flex items-center justify-center"
        style={{ backgroundImage: "url('/main.jpg')" }}
        >
        {/* Заголовок поверх изображения */}
        <div className="absolute top-0 left-0 w-full text-center py-6 z-20">
            <h1 className="text-white text-xl md:text-3xl font-bold tracking-widest uppercase">
            Городской комитет модернизации жилья
            </h1>
        </div>

        {/* Затемнение */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Контент в хедере */}
        <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
            <img
            src="/logo.png"
            alt="Логотип"
            className="w-[236px] h-[236px] object-contain"
            />
            <div className="space-y-4 text-lg leading-relaxed font-montserrat">
            <p>
                <span className="font-bold">ТОО Горкомхоз Модернизация Жилья</span> — это специализированный орган, отвечающий за развитие, контроль и цифровизацию процессов в сфере жилищно-коммунального хозяйства города Павлодара.
            </p>
            <p>
                <span className="font-bold">Цель создания</span> — реализация Программы развития регионов до 2020г., а в дальнейшем Программы «Нұрлы жер» (далее — Программа), Концепции развития жилишно-комунальноф инфраструктуры на 2023-2029годы утвержденных рядом постановлений Правительства РК.
            </p>
            </div>
        </div>
      </header>


      <section className="bg-white py-24 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold uppercase text-center mb-16">
            Основные направления деятельности
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[20px] max-w-[1440px] mx-auto">
            {/* Блок 1 */}
            <div className="relative bg-[#05A7E3] text-white rounded-[10px] p-6 h-[225px] flex items-center shadow-md">
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                Автоматизация учета данных
                </h3>
                <p className="text-sm font-light">
                Комитет внедряет систему автоматизированного приема и обработки данных по коммунальным платежам, позволяя избавиться от ручного труда и снизить риск ошибок.
                </p>
            </div>
            <img
                src="/acty1.png"
                alt="acty1"
                className="w-[204px] h-[225px] object-cover ml-4 rounded-[10px]"
            />
            </div>

            {/* Блок 2 */}
            <div className="relative bg-[#05A7E3] text-white rounded-[10px] p-6 h-[225px] flex items-center shadow-md">
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Контроль задолженности</h3>
                <p className="text-sm font-light">
                На основе регулярно поступающих данных от поставщиков услуг осуществляется автоматическое формирование отчетов по задолженности жильцов.
                </p>
            </div>
            <img
                src="/acty2.png"
                alt="acty2"
                className="w-[204px] h-[225px] object-cover ml-4 rounded-[10px]"
            />
            </div>

            {/* Блок 3 */}
            <div className="relative bg-[#05A7E3] text-white rounded-[10px] p-6 h-[225px] flex items-center shadow-md">
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                Мониторинг состояния жилых объектов
                </h3>
                <p className="text-sm font-light">
                Благодаря интерактивной карте и аналитическим инструментам сотрудники могут отслеживать текущую ситуацию на объектах, выявлять проблемные зоны и формировать оперативные отчеты.
                </p>
            </div>
            <img
                src="/acty3.png"
                alt="acty3"
                className="w-[204px] h-[225px] object-cover ml-4 rounded-[10px]"
            />
            </div>

            {/* Блок 4 */}
            <div className="relative bg-[#05A7E3] text-white rounded-[10px] p-6 h-[225px] flex items-center shadow-md">
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Содействие в цифровизации ЖКХ</h3>
                <p className="text-sm font-light">
                Комитет разрабатывает и внедряет удобные цифровые инструменты для подрядчиков и управляющих компаний: от ведения личных кабинетов до аналитики по каждому адресу.
                </p>
            </div>
            <img
                src="/acty4.png"
                alt="acty4"
                className="w-[204px] h-[225px] object-cover ml-4 rounded-[10px]"
            />
            </div>

            {/* Блок 5 */}
            <div className="relative bg-[#05A7E3] text-white rounded-[10px] p-6 h-[311px] flex items-center shadow-md">
            <div className="flex-1 z-10">
                <h3 className="text-lg font-semibold mb-2">Информационная прозрачность</h3>
                <p className="text-sm font-light">
                На сайте публикуется информация о завершенных проектах, структуре организации и ходе текущих работ по модернизации объектов.
                </p>
            </div>
            <img
                src="/acty5.png"
                alt="acty5"
                className="w-[204px] h-[311px] object-cover ml-4 rounded-[10px]"
            />
            </div>

            {/* Блок 6 – только изображение */}
            <div className="rounded-[10px] h-[311px] shadow-md overflow-hidden">
            <img
                src="/acty6.png"
                alt="acty6"
                className="w-full h-full object-cover"
            />
            </div>
        </div>
      </section>
      {/* Футер */}
      <Footer />
    </div>
  );
}
