// src/pages/ResetPassword.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    setError('');
    try {
      const res = await fetch('https://jkh-platform.onrender.com/password-reset/confirm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        setDone(true);
        setTimeout(() => navigate('/overview-page'), 1500);
      } else {
        setError('Ошибка, ссылка могла устареть.');
      }
    } catch {
      setError('Сервер недоступен');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        {done ? (
          <p className="text-green-700">Пароль сохранён, выполняется вход…</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Новый пароль</h2>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Новый пароль"
              className="w-full border p-2 rounded"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              onClick={handleSave}
              className="w-full bg-black text-white py-2 rounded-lg"
            >
              Сохранить
            </button>
          </>
        )}
      </div>
    </div>
  );
}
