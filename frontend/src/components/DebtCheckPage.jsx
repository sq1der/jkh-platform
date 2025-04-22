import React, { useState } from 'react';
import axios from 'axios';

const DebtInfoPage = () => {
  const [iin, setIin] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!iin) return;

    try {
      const response = await axios.get(`http://localhost:8000/api/debt/${iin}/`);
      console.log('Ответ от сервера:', response.data);
      setData(response.data.debt);
      setError('');
    } catch (err) {
      console.error('Ошибка запроса:', err);
      setError('Информация не найдена');
      setData(null);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Хедер с фоном */}
      <header
        className="h-96 bg-cover bg-center relative flex flex-col justify-center items-center px-6"
        style={{ backgroundImage: "url('/debt-header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">ПРОСМОТР ЗАДОЛЖЕННОСТИ ПО ОБЪЕКТУ</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="text"
              value={iin}
              onChange={(e) => setIin(e.target.value)}
              placeholder="Введите ваш ИИН"
              className="w-80 px-5 py-3 rounded-full text-black"
            />
            <button
              onClick={handleSearch}
              className="bg-white text-black font-semibold px-6 py-3 rounded-full"
            >
              Проверить
            </button>
          </div>
        </div>
      </header>

      {/* Контент */}
      <main className="px-6 py-10 max-w-4xl mx-auto space-y-6">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {data && (
          <>
            <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold mb-2">
                {data.address}
              </h2>
              <p className="mb-1">
                Сумма задолженности: <span className="font-semibold">{data.current_debt} тенге</span>
              </p>
            </div>
          </>
        )}
      </main>

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

export default DebtInfoPage;
