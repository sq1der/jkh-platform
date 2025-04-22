import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
