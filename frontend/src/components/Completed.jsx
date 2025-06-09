import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import axios from 'axios';
import Footer from './Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const CompletedProjects = () => {
  const [projects, setProjects] = useState([]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/buildings/');
        setProjects(response.data);
      } catch (error) {
        console.error('Ошибка при получении проектов:', error);
      }
    };

    fetchProjects();
  }, []);

  const getImageUrls = (project) => {
    return [project.image_url, project.image_url_2].filter(Boolean);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-black relative">
      <SidebarMenu />
      <div className="flex-1 bg-white px-4 md:px-16 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0075C9] py-10">
          ЗАВЕРШЕННЫЕ ОБЪЕКТЫ
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project, index) => {
            // Вызываем getImageUrls здесь, для КАЖДОГО проекта
            const images = getImageUrls(project); // <-- ИСПРАВЛЕНИЕ: Перемещено сюда

            return (
              <div
                key={index}
                className="w-[680px] h-[408px] bg-white rounded-xl shadow-md border border-gray-300 flex overflow-hidden"
              >
                <div className="w-[476px] p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 leading-snug">
                      {project.name}
                    </h2>
                    <p className="text-sm font-semibold">
                      Срок реализации:{' '}
                      <span className="font-normal">
                        {formatDate(project.start_date)} — {formatDate(project.end_date)}
                      </span>
                    </p>
                    <p className="text-sm mt-2 text-gray-700 line-clamp-5">
                      {project.description}
                    </p>
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    подробно
                  </Link>
                </div>
                <div className="w-[204px] h-[408px]">
                  <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
                    {/* Используем images, определенные для текущего проекта */}
                    {images.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`Project ${project.name} Image ${i + 1}`}
                        className="w-[204px] h-[408px] object-cover"
                      />
                    ))}
                  </Slider>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CompletedProjects;