import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import axios from 'axios';
import Footer from './Footer';

const CompletedProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(''); // API запрос
        setProjects(response.data);
      } catch (error) {
        console.error('Ошибка при получении проектов:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-black relative">
      <SidebarMenu />
      <div className="flex-1 bg-white px-4 md:px-16 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0075C9] py-10">
          ЗАВЕРШЕННЫЕ ОБЪЕКТЫ
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-[680px] h-[408px] bg-white rounded-xl shadow-md border border-gray-300 flex overflow-hidden"
            >
              <div className="w-[476px] p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2 leading-snug">
                    {project.title}
                  </h2>
                  <p className="text-sm font-semibold">
                    Срок реализации:{' '}
                    <span className="font-normal">{project.period}</span>
                  </p>
                  <p className="text-sm mt-2 text-gray-700 line-clamp-5">
                    {project.description}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/project/${project._id}`)}
                  className="mt-4 w-[130px] bg-[#00B2FF] text-white text-sm py-2 rounded hover:bg-[#009BDB] transition"
                >
                  Подробнее
                </button>
              </div>
              <img
                src={project.image}
                alt={project.title}
                className="w-[204px] h-[408px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default CompletedProjects;
