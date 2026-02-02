import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__content">
        <h1>Производство балок БДК для строительства</h1>
        <p className="hero__subtitle">
          Качественные двутавровые клеёные балки по ГОСТ.
          Собственное производство, доставка по всей России.
        </p>
        <div className="hero__buttons">
          <button
            className="btn-primary"
            onClick={() => navigate('/calculator')}
          >
            Рассчитать стоимость
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate('/catalog')}
          >
            Смотреть каталог
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

