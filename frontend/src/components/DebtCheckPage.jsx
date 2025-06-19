import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import Footer from './Footer';

function DebtInfoPage() {
  const location = useLocation();
  const [personal_account, setPersonal_account] = useState('');
  const [debtInfo, setDebtInfo] = useState(location.state?.debtInfo || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!debtInfo && personal_account) {
      handleSearch(); // Запросить данные, если их нет
    }
  }, [personal_account, debtInfo]);


  const handleSearch = async () => {
    if (!personal_account.trim()) {
      setError('Пожалуйста, введите номер лицевого счета.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get('/api/debt-info/', {
        params: { personal_account }
      });

      setDebtInfo(response.data);
      console.log('Данные о задолженности:', response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'Ошибка при получении данных.');
      } else {
        setError('Ошибка сети. Попробуйте позже.');
      }
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
        className="h-[350px] bg-cover bg-center relative flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/debt-header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-75 z-0" />
        
        <div className="relative z-10 text-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">
            ПРОСМОТР ЗАДОЛЖЕННОСТИ ПО ОБЪЕКТУ
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full max-w-[900px] px-4">
            <input
              type="text"
              value={personal_account}
              onChange={(e) => setPersonal_account(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}            
              placeholder="Введите ваш номер лицевого счета"
              className="w-full sm:w-[600px] h-[50px] px-4 text-base rounded-[20px] placeholder:text-gray-500 shadow-md"
            />

            <button
              onClick={handleSearch}
              className="w-full sm:w-[212px] h-[54px] bg-[#2E2E2E] text-white font-semibold rounded-[20px] shadow-md hover:bg-gray-200 transition"
              disabled={loading}
            >
              {loading ? 'Поиск...' : 'Проверить'}
            </button>

          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow px-4 sm:px-6 md:px-12 py-10 w-full max-w-screen-lg mx-auto text-base">

        {error && <p className="text-red-500 text-center">{error}</p>}

        {debtInfo && (
          <div className="flex justify-center">
            <div className="space-y-6 w-full px-4 sm:px-0">
              <div>
                <h2 className="text-lg font-bold mb-2">{debtInfo.address}</h2>
                <p className="mb-1">
                  Сумма задолженности: <span className="font-bold">{debtInfo.current_debt} тенге</span>
                </p>
                <p>
                  Остаток срока: <span className="font-bold">{debtInfo.remaining_term}</span>
                </p>
                <p>
                Сумма, оплаченная за прошлый месяц: <span className="font-bold">{debtInfo.pay_sum} тенге</span>
                </p>                <p>
                 Сколько подлежало оплате за прошлый месяц: <span className="font-bold">{debtInfo.saldo_in} тенге</span>
                </p>                <p>
                 Сумма к оплате за текущий месяц составляет: <span className="font-bold">{debtInfo.saldo_out} тенге</span>
                </p>
              </div>
        
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DebtInfoPage;
