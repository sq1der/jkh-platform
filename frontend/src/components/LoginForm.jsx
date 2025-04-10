import React from 'react';

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">ЖКХ</h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-right text-sm text-gray-700 mb-4">Продолжите работу</h2>

          <div className="flex justify-end mb-4">
            <button className="bg-black text-white rounded-full px-4 py-1 text-sm">Войти</button>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Почта"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="Пароль"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />

            <div className="text-right text-xs text-gray-600">
              сброс пароля
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <button className="w-full bg-black text-white py-2 rounded-lg">
              Войти
            </button>
            <button className="w-full border border-black text-black py-2 rounded-lg">
              Войти по ИИН
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;
