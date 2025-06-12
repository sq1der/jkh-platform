import React from "react";
import SidebarMenu from "../components/SidebarMenu";
import Footer from "./Footer";

export default function ActivityPage() {
  const activities = [
    {
      title: "Ремонт кровли",
      text: "Замена старых или изношенных кровельных покрытий для предотвращения протечек и продления срока эксплуатации здания.",
      img: "/acty1.png",
      height: 225,
    },
    {
      title: "Фасадные работы",
      text: "Утепление и ремонт фасадов с целью повышения энергоэффективности зданий и улучшения внешнего вида.",
      img: "/acty2.png",
      height: 225,
    },
    {
      title: "Замена инженерных сетей",
      text: (
        <ul className="list-disc list-inside">
          <li>Системы отопления</li>
          <li>Водоснабжения и канализации</li>
          <li>Электроснабжения</li>
          <p className="mt-2">
            Это позволяет улучшить качество предоставляемых коммунальных услуг.
          </p>
        </ul>
      ),
      img: "/acty3.png",
      height: 225,
    },
    {
      title: "Модернизация лифтового оборудования",
      text: "Установка новых лифтов взамен устаревших и неисправных, обеспечение безопасной и комфортной эксплуатации.",
      img: "/acty4.png",
      height: 225,
    },
    {
      title: "Ремонт подъездов, подвалов и чердаков",
      text: "Приведение в порядок общедомового имущества для соблюдения санитарных норм и создания комфортной среды.",
      img: "/acty5.png",
      height: 311,
    },
  ];

  return (
    <div className="text-black">
      {/* Меню бар */}
      <SidebarMenu />

      {/* Хедер */}
      <header
        className="relative h-[620px] bg-cover bg-center text-white px-4 md:px-16 flex items-center justify-center"
        style={{ backgroundImage: "url('/main.jpg')" }}
      >
        {/* Заголовок поверх изображения */}
        <div className="absolute top-0 left-0 w-full text-center py-6 z-20">
          <h1 className="text-white text-lg md:text-3xl font-bold tracking-widest uppercase">
            Горкомхоз Модернизация Жилья
          </h1>
        </div>

        {/* Затемнение */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Контент в хедере */}
        <div className="relative z-10 max-w-6xl w-full flex flex-col gap-6 px-4 text-sm md:text-base font-montserrat">
          <p>
            <span className="font-bold">ТОО Горкомхоз Модернизация Жилья</span> — это специализированный орган, отвечающий за развитие, контроль и цифровизацию процессов в сфере жилищно-коммунального хозяйства города Павлодара.
          </p>
          <p>
            <span className="font-bold">ТОО «Горкомхоз Модернизация жилья»</span> создано с целью реализации программ по модернизации и капитальному ремонту многоквартирных жилых домов в городе Павлодар. Деятельность предприятия направлена на:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>Повышение энергоэффективности жилищного фонда;</li>
            <li>Продление срока эксплуатации многоквартирных домов;</li>
            <li>Улучшение санитарно-технического состояния зданий.</li>
          </ul>
        </div>
      </header>

      {/* Основные направления деятельности */}
      <section className="bg-white py-16 px-4 md:px-16">
        <h2 className="text-2xl md:text-4xl font-bold uppercase text-center mb-12">
          Основные направления деятельности
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1440px] mx-auto">
          {activities.map(({ title, text, img, height }, index) => (
            <div
              key={index}
              className="relative bg-[#05A7E3] text-white rounded-[10px] p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start shadow-md"
              style={{ minHeight: `${height}px` }}
            >
              <div className="flex-1 z-10 text-center md:text-left">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <div className="text-sm font-light">{text}</div>
              </div>
              <img
                src={img}
                alt={`activity-${index + 1}`}
                className="w-full md:w-[204px] h-[180px] md:h-[225px] object-cover mt-4 md:mt-0 md:ml-4 rounded-[10px]"
              />
            </div>
          ))}

          {/* Последний блок — изображение */}
          <div className="rounded-[10px] h-[300px] md:h-[311px] shadow-md overflow-hidden">
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
