import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3>О компании</h3>
          <ul>
            <li><Link to="/about">О нас</Link></li>
            <li><Link to="/about/production">Производство</Link></li>
            <li><Link to="/about/certificates">Сертификаты</Link></li>
            <li><Link to="/about/partners">Партнёры</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Каталог</h3>
          <ul>
            <li><Link to="/catalog/standard">Стандартные размеры</Link></li>
            <li><Link to="/catalog/custom">Индивидуальные решения</Link></li>
            <li><Link to="/calculator">Калькулятор</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Информация</h3>
          <ul>
            <li><Link to="/articles">Статьи</Link></li>
            <li><Link to="/documents">Документация</Link></li>
            <li><Link to="/projects">Проекты</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
          </ul>
        </div>

        <div className="footer__section footer__section--contact">
          <h3>Контакты</h3>
          <p>📍 Адрес: г. Москва, ул. Примерная, д. 1</p>
          <p>☎ Телефон: <a href="tel:+79991234567">+7 (999) 123-45-67</a></p>
          <p>✉ Email: <a href="mailto:info@bdk.ru">info@bdk.ru</a></p>
          <p>🕐 График работы: Пн-Пт 9:00-18:00</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2025 БДК. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;

