import React from 'react';
import './ProcessSection.css';

const ProcessSection = () => {
  return (
    <section className="process">
      <div className="container">
        <h2>Как мы работаем</h2>
        <div className="process__steps">
          <div className="process__step">
            <div className="process__step-number">1</div>
            <h3>Заявка/консультация</h3>
            <p>Вы оставляете заявку, мы связываемся для уточнения деталей</p>
          </div>
          <div className="process__step">
            <div className="process__step-number">2</div>
            <h3>Расчёт и согласование</h3>
            <p>Подготавливаем расчёт стоимости и согласовываем с вами</p>
          </div>
          <div className="process__step">
            <div className="process__step-number">3</div>
            <h3>Производство</h3>
            <p>Изготавливаем балки согласно вашим требованиям</p>
          </div>
          <div className="process__step">
            <div className="process__step-number">4</div>
            <h3>Доставка и монтаж</h3>
            <p>Доставляем и при необходимости помогаем с монтажом</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

