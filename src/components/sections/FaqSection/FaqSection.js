import React from 'react';
import './FaqSection.css';

const FaqSection = () => {
  return (
    <section className="faq">
      <div className="container">
        <h2>Часто задаваемые вопросы</h2>
        <div className="faq__list">
          {/* Аккордеон с вопросами */}
          <div className="faq__item">
            <div className="faq__question">
              <h3>Какие размеры балок БДК доступны?</h3>
              <span className="faq__toggle">+</span>
            </div>
            <div className="faq__answer">
              <p>
                Мы производим балки длиной от 1 до 12 метров, высотой от 200 до 500 мм,
                шириной полки от 80 до 200 мм. Возможно изготовление по индивидуальным размерам.
              </p>
            </div>
          </div>
          {/* TODO: добавить остальные вопросы и сделать аккордеон интерактивным */}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

