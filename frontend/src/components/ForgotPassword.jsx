// src/pages/ForgotPassword.jsx
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      const res = await fetch('https://jkh-platform.onrender.com/password-reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setSent(true);
      else setError('Ошибка, попробуйте позже');
    } catch {
      setError('Сервер недоступен');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        {sent ? (
          <p className="text-green-700">Ссылка на сброс отправлена, проверьте почту.</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Сброс пароля</h2>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border p-2 rounded"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-2 rounded-lg"
            >
              Отправить ссылку
            </button>
          </>
        )}
      </div>
    </div>
  );
}
