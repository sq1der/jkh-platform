import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const SidebarMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const location = useLocation();

  const getIconColor = () => {
    const activePaths = ['/', '/organization', '/activity', '/debtcheck'];
    return activePaths.includes(location.pathname) ? 'text-white' : 'text-black';
  };

  // Закрытие при клике вне меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {!menuOpen && (
        <button
          className="fixed z-50 top-[20px] left-[26px] w-[48px] h-[48px] flex items-center justify-center"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={32} className={getIconColor()} />
        </button>
      )}

      <div
        ref={sidebarRef}
         className={`fixed top-0 left-0 h-[1434px] w-[400px] bg-[#1E1E1E] text-white z-40 px-10 py-14 transition-transform duration-300 ${
    menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h1
          onClick={() => {
            navigate('/');
            console.log('Клик по заголовку Комитет Модернизации Жилья');
            setMenuOpen(false);
          }}
          className="text-[20px] font-extrabold leading-tight uppercase tracking-wide mb-12 text-left cursor-pointer select-none"
        >
          КОМИТЕТ <br /> МОДЕРНИЗАЦИИ ЖИЛЬЯ
        </h1>

        <nav className="flex flex-col gap-8 text-[16px] font-bold leading-snug tracking-wide uppercase">
          <button
            onClick={() => {
              navigate('/activity');
              setMenuOpen(false);
            }}
            className="text-left"
          >
            О ДЕЯТЕЛЬНОСТИ
          </button>
          <button
            onClick={() => {
              navigate('/organization');
              setMenuOpen(false);
            }}
            className="text-left"
          >
            СТРУКТУРА ОРГАНИЗАЦИИ
          </button>
          <button
            onClick={() => {
              navigate('/projects');
              setMenuOpen(false);
            }}
            className="text-left"
          >
            ЗАВЕРШЕННЫЕ ОБЪЕКТЫ
          </button>
          <button
            onClick={() => {
              navigate('/debtcheck');
              setMenuOpen(false);
            }}
            className="text-left"
          >
            ПОСМОТРЕТЬ ЗАДОЛЖЕННОСТЬ
          </button>
          <a
            href="/docs/ДЛЯ УЧАСТИЯ В МОДЕРНИЗАЦИИ.docx"
            download
            className="text-left"
          >
            ДЛЯ УЧАСТИЯ В МОДЕРНИЗАЦИИ
          </a>
        </nav>
      </div>
    </>
  );
};

export default SidebarMenu;
