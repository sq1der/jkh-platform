import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Исправленный импорт

const accessToken = localStorage.getItem('accessToken');

export default function Sidebar() {
  const [adminName, setAdminName] = useState('');

  // Декодируем токен, чтобы получить информацию о пользователе
  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken); // Исправленный вызов функции
        setAdminName(decodedToken.name); // Предположим, что в токене есть поле "name"
      } catch (error) {
        console.error('Ошибка декодирования токена:', error);
      }
    }
  }, [accessToken]);

  return (
    <aside className="w-64 bg-white p-4 shadow-md relative">
      <h1 className="text-3xl font-bold mb-6">ЖКХ</h1>
      <nav className="space-y-2">
        {/* Навигационные элементы */}
        <div className="flex items-center space-x-2 text-muted-foreground hover:text-black">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 12h2m0 0h2m-2 0V9m0 3v3m1 4v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2m4-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <span className="font-medium">Обзор</span>
        </div>
        {/* Другие пункты меню */}
        {/* ... */}
      </nav>

      {/* Информация о пользователе */}
      <div className="absolute bottom-4 left-4 text-sm">
        <div className="font-medium">{adminName ? adminName : 'Загружается...'}</div>
        <div className="text-muted-foreground text-xs">Администратор</div>
      </div>
    </aside>
  );
}
