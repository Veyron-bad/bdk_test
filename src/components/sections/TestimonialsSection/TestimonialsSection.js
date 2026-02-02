import React from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h2>Отзывы клиентов</h2>
        <div className="testimonials__grid">
          {/* Карточки отзывов */}
          <div className="testimonial-card">
            <div className="testimonial-card__logo">Логотип компании</div>
            <p className="testimonial-card__text">
              &quot;Отличное качество балок, всё соответствует заявленным характеристикам.
              Рекомендуем!&quot;
            </p>
            <p className="testimonial-card__author">ООО &quot;СтройКомплекс&quot;</p>
          </div>
          {/* TODO: добавить реальные отзывы */}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

