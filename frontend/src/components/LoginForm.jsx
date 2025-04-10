import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login/email/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Успешный вход:', data);
        // Перенаправление или дальнейшая обработка
      } else {
        const errorData = await response.json();
        if (errorData.non_field_errors) {
          setError(errorData.non_field_errors[0]);
        } else {
          setError('Пароль или email не совпадают');
        }
      }
    } catch (e) {
      setError('Сервер недоступен');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-8">ЖКХ</h1>

        <div className="text-right text-sm text-gray-700 mb-2">Продолжите работу</div>
        <div className="flex justify-end mb-6">
          <button className="flex items-center bg-black text-white text-lg font-semibold px-4 py-1.5 rounded-full" disabled>
            <div className="w-3 h-3 rounded-full bg-white mr-2" />
            Войти
          </button>
        </div>

        <div className="space-y-4 mb-2">
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="text-right text-xs text-gray-600 cursor-pointer hover:underline">
            сброс пароля
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
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            {loading ? 'Загрузка...' : 'Войти'}
          </button>

          <button className="w-full border border-black text-black py-2 rounded-lg" onClick={() => navigate('/login-iin')}>
            Войти по ИИН
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
