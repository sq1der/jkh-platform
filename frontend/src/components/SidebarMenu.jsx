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
        className="fixed z-50 top-5 left-5 w-12 h-12 flex items-center justify-center sm:left-6 sm:top-6"
        onClick={() => setMenuOpen(true)}
      >
        <Menu size={32} className={getIconColor()} />
      </button>
    )}

   <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen w-[280px] sm:w-[300px] md:w-[320px] lg:w-[400px] overflow-y-auto bg-[#1E1E1E] text-white z-40 px-6 py-10 transition-transform duration-300 ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >


      <h1
        onClick={() => {
          navigate('/');
          setMenuOpen(false);
        }}
        className="text-xl sm:text-2xl font-extrabold leading-tight uppercase tracking-wide mb-10 sm:mb-12 text-left cursor-pointer select-none"
      >
        ГОРКОМХОЗ <br /> МОДЕРНИЗАЦИИ ЖИЛЬЯ
      </h1>

      <nav className="flex flex-col gap-6 sm:gap-8 text-base sm:text-lg font-bold leading-snug tracking-wide uppercase">
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
        <button
          onClick={() => {
            navigate('/modernization');
            setMenuOpen(false);
          }}
          className="text-left"
        >
          ДЛЯ УЧАСТИЯ МОДЕРНИЗАЦИИ
        </button>
      </nav>
    </div>
  </>
);

};

export default SidebarMenu;
