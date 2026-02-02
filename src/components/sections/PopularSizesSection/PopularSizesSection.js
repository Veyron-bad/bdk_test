import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularSizesSection.css';

const PopularSizesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="popular-sizes">
      <div className="container">
        <h2>Популярные размеры</h2>
        <div className="popular-sizes__grid">
          {/* Здесь будут карточки товаров */}
          <div className="product-card">
            <div className="product-card__image">Фото</div>
            <h3>БДК 200×80×6000</h3>
            <p className="product-card__price">от 8 500 ₽</p>
            <button className="btn-outline">Подробнее</button>
          </div>
          {/* TODO: добавить реальные товары */}
        </div>
        <button
          className="btn-primary"
          onClick={() => navigate('/catalog')}
        >
          Весь каталог
        </button>
      </div>
    </section>
  );
};

export default PopularSizesSection;

