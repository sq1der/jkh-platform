import React, { useState } from 'react';
import { FiAlertTriangle, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LoginByIIN = () => {
  const [iin, setIIN] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginByIIN = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login/iin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ iin }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Успешный вход:', data);
        // Перенаправление или дальнейшая обработка
      } else {
        const errorData = await response.json();
        setError('Неверный ИИН');
      }
    } catch (e) {
      setError('Сервер недоступен');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-8">Войти через ИИН</h1>

        <div className="space-y-4 mb-2">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="ИИН"
              value={iin}
              onChange={(e) => setIIN(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="bg-yellow-300 text-red-600 text-sm px-4 py-2 rounded-lg flex items-center mb-4">
            <FiAlertTriangle className="mr-2" />
            {error}
          </div>
        )}

        <div className="space-y-2">
          <button
            onClick={handleLoginByIIN}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
          <button className="w-full border border-black text-black py-2 rounded-lg" onClick={() => navigate('/login')}>
            Войти по email
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginByIIN;
