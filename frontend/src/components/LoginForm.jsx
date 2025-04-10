import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login/email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorData = await response.json();
        if (errorData.non_field_errors) {
          setError(errorData.non_field_errors[0]);
        } else {
          setError('Ошибка при входе');
        }
      }
    } catch (error) {
      setError('Сервер недоступен');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">ЖКХ</h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-right text-sm text-gray-700 mb-4">Продолжите работу</h2>

          <div className="flex justify-end mb-4">
            <button className="bg-black text-white rounded-full px-4 py-1 text-sm">
              Войти
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />

            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />

            <div className="text-right text-xs text-gray-600">
              сброс пароля
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
          </div>

          <div className="mt-6 space-y-2">
            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-2 rounded-lg"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;