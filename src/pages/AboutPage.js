import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero__title">О компании</h1>
          <p className="about-hero__subtitle">
            [Краткий слоган или описание компании в 1–2 предложения]
          </p>
        </div>
      </section>

      {/* Основной текст */}
      <section className="about-intro">
        <div className="container">
          <h2 className="about-intro__title">Кто мы</h2>
          <div className="about-intro__content">
            <p>
              [Описание компании: чем занимаетесь, сколько лет на рынке, ключевые направления.
              Расскажите о специализации на производстве БДК-балок и работе со строительным рынком России.]
            </p>
            <p>
              [Миссия и ценности: что важно для компании, как вы относитесь к качеству и клиентам.]
            </p>
          </div>
        </div>
      </section>

      {/* Ключевые цифры */}
      <section className="about-stats">
        <div className="container">
          <ul className="about-stats__list">
            <li className="about-stats__item">
              <span className="about-stats__number">[X]</span>
              <span className="about-stats__label">лет на рынке</span>
            </li>
            <li className="about-stats__item">
              <span className="about-stats__number">[X]</span>
              <span className="about-stats__label">реализованных проектов</span>
            </li>
            <li className="about-stats__item">
              <span className="about-stats__number">[X]</span>
              <span className="about-stats__label">довольных клиентов</span>
            </li>
            <li className="about-stats__item">
              <span className="about-stats__number">[X] м²</span>
              <span className="about-stats__label">площадь производства</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Ценности / преимущества */}
      <section className="about-values">
        <div className="container">
          <h2 className="about-values__title">Наши ценности</h2>
          <ul className="about-values__list">
            <li className="about-values__item">
              <h3 className="about-values__item-title">[Название ценности 1]</h3>
              <p>[Описание]</p>
            </li>
            <li className="about-values__item">
              <h3 className="about-values__item-title">[Название ценности 2]</h3>
              <p>[Описание]</p>
            </li>
            <li className="about-values__item">
              <h3 className="about-values__item-title">[Название ценности 3]</h3>
              <p>[Описание]</p>
            </li>
            <li className="about-values__item">
              <h3 className="about-values__item-title">[Название ценности 4]</h3>
              <p>[Описание]</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Ссылки на подразделы */}
      <section className="about-links">
        <div className="container">
          <h2 className="about-links__title">Подробнее о нас</h2>
          <div className="about-links__grid">
            <Link to="/about/production" className="about-links__card">
              <h3 className="about-links__card-title">Производство</h3>
              <p className="about-links__card-text">[Краткое описание: оборудование, технологии, мощности]</p>
              <span className="about-links__card-link">Подробнее →</span>
            </Link>
            <Link to="/about/certificates" className="about-links__card">
              <h3 className="about-links__card-title">Сертификаты</h3>
              <p className="about-links__card-text">[Документы, соответствие ГОСТ, качество]</p>
              <span className="about-links__card-link">Подробнее →</span>
            </Link>
            <Link to="/about/partners" className="about-links__card">
              <h3 className="about-links__card-title">Партнёры</h3>
              <p className="about-links__card-text">[Клиенты, поставщики, сотрудничество]</p>
              <span className="about-links__card-link">Подробнее →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2 className="about-cta__title">[Призыв к действию]</h2>
          <p className="about-cta__text">[Краткий текст, мотивирующий оставить заявку или связаться]</p>
          <div className="about-cta__buttons">
            <Link to="/request" className="btn-primary">
              Оставить заявку
            </Link>
            <Link to="/contacts" className="btn-secondary">
              Контакты
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
