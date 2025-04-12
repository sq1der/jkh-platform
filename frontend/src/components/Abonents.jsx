import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const accessToken = localStorage.getItem('accessToken');

export default function AbonentyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [period, setPeriod] = useState("all");
  const [debtStatus, setDebtStatus] = useState("all");
  const [debtors, setDebtors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Декодируем токен, чтобы получить информацию о пользователе
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const decoded = jwtDecode(token);
        const response = await fetch(`http://localhost:8000/api/admins/${decoded.user_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setAdminName(data.full_name); // Или data.name — в зависимости от твоего API
        } else {
          console.error('Ошибка получения данных админа: ', response.statusText);
        }
      } catch (err) {
        console.error('Ошибка при получении данных админа', err);
      }
    };
  
    fetchAdminData();
  }, []);
  

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      // Составляем параметры запроса
      let queryParams = [];

      if (searchTerm) {
        queryParams.push(`search=${searchTerm}`);
      }
      if (period && period !== 'all') {
        const fromDate = new Date();
        if (period === 'month') {
          fromDate.setMonth(fromDate.getMonth() - 1); // последний месяц
        }
        queryParams.push(`from_date=${fromDate.toISOString().split('T')[0]}`);
      }
      if (debtStatus && debtStatus !== 'all') {
        queryParams.push(`status=${debtStatus}`);
      }

      // Формируем URL с параметрами
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

      try {
        const response = await fetch(`http://localhost:8000/api/debtors/${queryString}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDebtors(data); // Сохраняем данные должников
        } else {
          console.error('Ошибка загрузки данных');
        }
      } catch (error) {
        console.error('Ошибка при загрузке пользователей', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm, period, debtStatus]); // Запрос будет выполняться при изменении этих параметров

  const filteredUsers = debtors.filter((debtor) =>
    debtor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <h1 className="text-3xl font-bold mb-6">ЖКХ</h1>
        <nav className="space-y-2">
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-black">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 12h2m0 0h2m-2 0V9m0 3v3m1 4v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2m4-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <span className="font-medium">Обзор</span>
          </div>
          <div className="flex items-center space-x-2 font-bold">
            <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 12h2m0 0h2m-2 0V9m0 3v3m1 4v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2m4-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <span>Абоненты</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-black">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 12h2m0 0h2m-2 0V9m0 3v3m1 4v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2m4-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <span className="font-medium">Отчёты</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-black">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 12h2m0 0h2m-2 0V9m0 3v3m1 4v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2m4-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <span className="font-medium">Настройки</span>
          </div>
        </nav>

        {/* Информация о пользователе */}
        <div className="absolute bottom-4 left-4 text-sm">
          <div className="font-medium">{adminName}</div>
          <div className="text-muted-foreground text-xs">Администратор</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-6">Абоненты</h2>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Поиск..."
            className="max-w-sm p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Найти</button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-[200px] p-2 border rounded">
            <option value="all">За все время</option>
            <option value="month">Последний месяц</option>
          </select>

          <select value={debtStatus} onChange={(e) => setDebtStatus(e.target.value)} className="w-[200px] p-2 border rounded">
            <option value="all">Все</option>
            <option value="overdue">С просрочкой</option>
          </select>

          <button className="px-4 py-2 bg-blue-500 text-white rounded">Загрузить файл</button>
        </div>

        {/* Загрузка данных */}
        {loading ? (
          <div>Загрузка...</div>
        ) : (
          <div className="border rounded-lg overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100">
                <tr className="text-muted-foreground">
                  <th className="p-3">Имя</th>
                  <th className="p-3">Адрес</th>
                  <th className="p-3">Дата последнего платежа</th>
                  <th className="p-3">Сумма</th>
                  <th className="p-3">ИИН</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((debtor, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{debtor.full_name}</td>
                    <td className="p-3">{debtor.address}</td>
                    <td className="p-3">{debtor.last_payment ? debtor.last_payment : 'Не указано'}</td>
                    <td className="p-3">{debtor.current_debt}</td>
                    <td className="p-3">{debtor.iin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
