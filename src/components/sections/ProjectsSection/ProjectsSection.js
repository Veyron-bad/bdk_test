import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="projects">
      <div className="container">
        <h2>Наши проекты</h2>
        <div className="projects__grid">
          {/* Карточки проектов */}
          <div className="project-card">
            <div className="project-card__image">Фото проекта</div>
            <h3>Жилой дом, Москва</h3>
            <p>Площадь: 150 м²</p>
            <button className="btn-outline">Подробнее</button>
          </div>
          {/* TODO: добавить реальные проекты */}
        </div>
        <button
          className="btn-primary"
          onClick={() => navigate('/projects')}
        >
          Все проекты
        </button>
      </div>
    </section>
  );
};

export default ProjectsSection;

