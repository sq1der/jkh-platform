import React, { useState } from 'react';
import axios from 'axios';
import SidebarMenu from '../components/SidebarMenu';

const DebtInfoPage = () => {
  const [iin, setIin] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!iin.trim()) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await axios.get(`http://localhost:8000/api/debt/${iin}/`);
      setData(response.data.debt); // предполагается, что ответ: { debt: {...} }
    } catch (err) {
      setError('Информация не найдена');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-black">
      {/* Sidebar */}
      <SidebarMenu />
      {/* Header */}
      <header
        className="h-[450px] bg-cover bg-center relative flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/debt-header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 text-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-10">
            ПРОСМОТР ЗАДОЛЖЕННОСТИ ПО ОБЪЕКТУ
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              value={iin}
              onChange={(e) => setIin(e.target.value)}
              placeholder="Введите ваш ИИН"
              className="w-[300px] md:w-[400px] px-6 py-3 rounded-full text-black placeholder:text-gray-500"
            />
            <button
              onClick={handleSearch}
              className="bg-[#2E2E2E] text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
              disabled={loading}
            >
              {loading ? 'Поиск...' : 'Проверить'}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow px-6 md:px-12 py-10 max-w-5xl mx-auto space-y-10 text-base">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {data && (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {data.address}
              </h2>
              <p className="mb-1">
                Сумма задолженности: <span className="font-bold">{data.current_debt} тенге</span>
              </p>
              <p>
                Остаток срока: <span className="font-bold">{data.remaining_term}</span>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Информация об объекте</h3>
              <p><span className="font-bold">Тип объекта:</span> {data.object_type}</p>
              <p><span className="font-bold">Год постройки:</span> {data.build_year}</p>
              <p><span className="font-bold">Тип дома:</span> {data.house_type}</p>
              <p><span className="font-bold">Количество жильцов:</span> {data.residents_count}</p>
              <p><span className="font-bold">Количество квартир:</span> {data.apartments_count}</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#202020] text-white py-8 px-4 md:px-20 text-sm w-full">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-semibold mb-2">Контакты</p>
            <p>Время работы: 09:00–18:00</p>
          </div>
          <div>
            <p><span className="font-semibold">Телефон:</span> +7 (7182) 32–22–30</p>
            <p><span className="font-semibold">Телефон:</span> +7 (7182) 32–22–60</p>
          </div>
          <div className="space-y-1">
            <p>Отдел бухгалтерии</p>
            <p>Приемная</p>
            <p><span className="font-semibold">Адрес:</span> ул. Кривенко 25</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DebtInfoPage;
