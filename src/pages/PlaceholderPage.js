import React from 'react';
import './PlaceholderPage.css';

const PlaceholderPage = ({ title = 'Страница' }) => {
  return (
    <div className="placeholder-page">
      <div className="container">
        <h1 className="placeholder-page__title">{title}</h1>
        <p className="placeholder-page__text">Страница в разработке</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
