// components/SidebarMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const SidebarMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(true);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // Проверка фона на основе наличия компонента
  useEffect(() => {
    const checkBackgroundColor = () => {
      if (sidebarRef.current) {
        const bgColor = window.getComputedStyle(sidebarRef.current).backgroundColor;
        // Если фон не темный (черный), то считаем, что он светлый
        setIsLightBackground(bgColor !== 'rgb(30, 30, 30)'); // rgb(30, 30, 30) это цвет фона в вашем примере
      }
    };
    checkBackgroundColor();
  }, [menuOpen]);

  return (
    <>
      {!menuOpen && (
        <button
          className="fixed z-50 top-[51px] left-[26px] w-[48px] h-[48px] flex items-center justify-center"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={32} color={isLightBackground ? 'black' : 'white'} />
        </button>
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-80 bg-[#1E1E1E] text-white z-40 px-6 py-10 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button className="mb-8" onClick={() => setMenuOpen(false)}>
          <X size={32} color={isLightBackground ? 'black' : 'white'} />
        </button>

        <h2 className="text-xl font-bold mb-8">КОМИТЕТ МОДЕРНИЗАЦИИ ЖИЛЬЯ</h2>
        <nav className="flex flex-col gap-6 text-lg">
          <button onClick={() => { navigate('/activity'); setMenuOpen(false); }} className="hover:underline">
            О ДЕЯТЕЛЬНОСТИ
          </button>
          <button onClick={() => { navigate('/organization'); setMenuOpen(false); }} className="hover:underline">
            СТРУКТУРА ОРГАНИЗАЦИИ
          </button>
          <button onClick={() => { navigate('/projects'); setMenuOpen(false); }} className="hover:underline">
            ЗАВЕРШЕННЫЕ ОБЪЕКТЫ
          </button>
          <button onClick={() => { navigate('/debt'); setMenuOpen(false); }} className="hover:underline">
            ПОСМОТРЕТЬ ЗАДОЛЖЕННОСТЬ
          </button>
        </nav>
      </div>
    </>
  );
};

export default SidebarMenu;
