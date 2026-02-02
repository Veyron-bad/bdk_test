import React from 'react';
import './AdvantagesSection.css';

const AdvantagesSection = () => {
  return (
    <section className="advantages">
      <div className="container">
        <h2>Почему выбирают нас</h2>
        <div className="advantages__grid">
          <div className="advantages__card">
            <div className="advantages__icon">✅</div>
            <h3>Соответствие ГОСТ</h3>
            <p>Все изделия соответствуют требованиям ГОСТ и имеют сертификаты качества</p>
          </div>
          <div className="advantages__card">
            <div className="advantages__icon">🏭</div>
            <h3>Собственное производство</h3>
            <p>Полный контроль качества на всех этапах производства</p>
          </div>
          <div className="advantages__card">
            <div className="advantages__icon">🚚</div>
            <h3>Доставка по России</h3>
            <p>Организуем доставку в любой регион страны</p>
          </div>
          <div className="advantages__card">
            <div className="advantages__icon">📐</div>
            <h3>Индивидуальные размеры</h3>
            <p>Изготовление балок по вашим размерам и требованиям</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;

