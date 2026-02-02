import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../../images/logo.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="logo">
          <img src={logo} alt="БДК - Производство балок" className="logo__image" fetchPriority="high" />
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav--open' : ''}`}>
          <Link to="/" className="nav__link" onClick={() => setIsMenuOpen(false)}>Главная</Link>
          <Link to="/catalog" className="nav__link" onClick={() => setIsMenuOpen(false)}>Каталог</Link>
          <Link to="/calculator" className="nav__link" onClick={() => setIsMenuOpen(false)}>Калькулятор</Link>
          <Link to="/about" className="nav__link" onClick={() => setIsMenuOpen(false)}>О компании</Link>
          <Link to="/projects" className="nav__link" onClick={() => setIsMenuOpen(false)}>Проекты</Link>
          <Link to="/articles" className="nav__link" onClick={() => setIsMenuOpen(false)}>Статьи</Link>
          <Link to="/contacts" className="nav__link" onClick={() => setIsMenuOpen(false)}>Контакты</Link>
        </nav>

        <div className="header__actions">
          <address className="header__phone">
            <a href="tel:+79991234567">☎ +7 (999) 123-45-67</a>
          </address>
          <Link to="/request" className="btn-request" onClick={() => setIsMenuOpen(false)}>
            Заявка
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;

