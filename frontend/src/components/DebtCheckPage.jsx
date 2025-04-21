import React, { useState } from 'react';
import axios from 'axios';
import SidebarMenu from '../components/SidebarMenu';

const DebtInfoPage = () => {
  const [iin, setIin] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!iin) return;

    try {
      const response = await axios.get(`http://localhost:8000/api/debt/${iin}/`);
      setData(response.data);
      setError('');
    } catch (err) {
      setError('Информация не найдена');
      setData(null);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Меню бар */}
      <SidebarMenu />
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
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {data.address}
              </h2>
              <p className="mb-1">
                Сумма задолженности: <span className="font-semibold">{data.current_debt} тенге</span>
              </p>
              <p>
                Остаток срока: <span className="font-semibold">{data.years_left} {data.years_left === 1 ? 'год' : 'года'}</span>
              </p>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-4">Информация об объекте</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <span className="font-semibold">Тип объекта:</span> {data.building_type}
                </li>
                <li>
                  <span className="font-semibold">Год постройки:</span> {data.year_built}
                </li>
                <li>
                  <span className="font-semibold">Тип дома:</span> {data.structure_type}
                </li>
                <li>
                  <span className="font-semibold">Количество жильцов:</span> {data.residents}
                </li>
                <li>
                  <span className="font-semibold">Количество квартир:</span> {data.apartments}
                </li>
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default DebtInfoPage;
