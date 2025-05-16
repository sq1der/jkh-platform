import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import axios from 'axios';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';


const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log(id);
        const res = await axios.get(`https://jkh-platform.onrender.com/api/buildings/${id}/`);
        const lat = parseFloat(res.data.latitude) || 0;
        const lng = parseFloat(res.data.longitude) || 0;

        setProject({ ...res.data, lat, lng });
        


      } catch (err) {
        console.error('Ошибка при загрузке проекта:', err);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="text-center p-10 text-lg font-semibold text-gray-500">
        Загрузка проекта...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <SidebarMenu />

      <header className="bg-white shadow p-6 text-center text-2xl font-semibold">
        {project.name}
      </header>

      <section className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-xl border p-4 shadow">
          <h2 className="font-semibold text-lg mb-2">Описание:</h2>
          <p className="text-sm">{project.description}</p>
          <div className="mt-3 text-sm text-gray-500"><span className="font-normal">
                      {formatDate(project.start_date)} — {formatDate(project.end_date)}
                    </span></div>
        </div>
        <img
          src={project.image_url}
          alt={project.name}
          className="w-full h-full object-cover rounded-xl shadow"
        />
      </section>

      <section className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {project.gallery?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Фото ${index + 1}`}
            className="w-full h-64 object-cover rounded-xl shadow"
          />
        ))}
      </section>

      <section className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="col-span-2 bg-white rounded-2xl overflow-hidden shadow">

            <GoogleMap
              center={{ lat: project.lat, lng: project.lng }}
              zoom={15}
              mapContainerClassName="w-full h-[500px] rounded-2xl"
            >
              <Marker position={{ lat: project.lat, lng: project.lng }} />
            </GoogleMap>

        </div>
        <div className="bg-white rounded-xl border p-6 shadow h-full">
          <h2 className="font-semibold text-lg mb-4">Выполненные работы</h2>
          <p className="text-sm mb-3">{project.description}</p>
          <p className="text-sm font-semibold mt-2">Местоположение:</p>
          <p className="text-sm">
            {project.house?.street?.name} {project.house?.house_number}
          </p>
        </div>
      </section>

      <footer className="bg-[#303030] text-white p-6 mt-12 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <div>
            <h3 className="font-semibold">Контакты</h3>
            Время работы: 09:00–18:00
          </div>
          <div>
            <p>Телефон: +7 (7182) 32–22–30 — Отдел бухгалтерии</p>
            <p>Телефон: +7 (7182) 32–22–60 — Приемная</p>
          </div>
          <div>Адрес: ул. Кривенко 25</div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectPage;
