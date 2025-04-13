import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useLocation } from 'react-router-dom';

export default function AbonentyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [period, setPeriod] = useState("all");
  const [debtStatus, setDebtStatus] = useState("all");
  const [debtors, setDebtors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const accessToken = localStorage.getItem('accessToken');

  // Получение данных администратора
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        const decoded = jwtDecode(token);
        const response = await fetch(`http://localhost:8000/api/users/${decoded.user_id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAdminName(data.full_name);
        } else {
          console.error('Ошибка получения данных администратора');
        }
      } catch (err) {
        console.error('Ошибка при получении данных администратора', err);
      }
    };

    fetchAdminData();
  }, []);

  // Загрузка списка должников
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      let queryParams = [];

      if (searchTerm) {
        queryParams.push(`search=${searchTerm}`);
      }

      if (period !== 'all') {
        const fromDate = new Date();
        if (period === 'month') fromDate.setMonth(fromDate.getMonth() - 1);
        queryParams.push(`from_date=${fromDate.toISOString().split('T')[0]}`);
      }

      if (debtStatus !== 'all') {
        queryParams.push(`status=${debtStatus}`);
      }

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
          setDebtors(data);
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
  }, [searchTerm, period, debtStatus]);

  // Обработка загрузки файла
  const handleFileUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/debtors/upload/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Файл успешно загружен');
        setIsModalOpen(false);
      } else {
        alert('Ошибка при загрузке файла');
      }
    } catch (err) {
      console.error('Ошибка при загрузке файла:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md relative">
        <h1 className="text-3xl font-bold mb-6">ЖКХ</h1>
        <nav className="space-y-2">
          <div className="text-muted-foreground hover:text-black" ><Link to='/overview-page'>Обзор</Link></div>
          <div className="font-bold text-blue-500"><Link >Абоненты</Link></div>
          <div className="text-muted-foreground hover:text-black"><Link>Отчеты</Link></div>
          <div className="text-muted-foreground hover:text-black"><Link>Настройки</Link></div>
        </nav>
        <div className="absolute bottom-4 left-4 text-sm">
          <div className="font-medium">{adminName}</div>
          <div className="text-muted-foreground text-xs">Администратор</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
      <div className="flex items-center gap-4 mb-6">
      <div className="flex gap-4">
        <h2 className="text-2xl font-semibold mb-6">Абоненты</h2>
      </div>
          <input
            type="text"
            placeholder="Поиск..."
            className="ml-8 w-[400px] h-[49px] max-w-sm p-2 border rounded-2xl"
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

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Загрузить файл
          </button>
        </div>

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
                {debtors.map((debtor, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{debtor.full_name}</td>
                    <td className="p-3">{debtor.address}</td>
                    <td className="p-3">{debtor.last_payment || 'Не указано'}</td>
                    <td className="p-3">{debtor.current_debt}</td>
                    <td className="p-3">{debtor.iin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Загрузить файл</h2>
            <p className="text-center text-gray-600 mb-4">Поддерживаются форматы: .xls, .xlsx, .csv, .json</p>

            <input
              type="file"
              ref={fileInputRef}
              className="mb-4 w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Отмена
              </button>
              <button
                onClick={handleFileUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Загрузить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}