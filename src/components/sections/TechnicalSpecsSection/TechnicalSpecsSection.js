import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TechnicalSpecsSection.css';

const TechnicalSpecsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="technical-specs">
      <div className="container">
        <h2>Технические характеристики</h2>
        <div className="technical-specs__table">
          <table>
            <thead>
              <tr>
                <th>Параметр</th>
                <th>Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Класс прочности</td>
                <td>К24, К26, К28</td>
              </tr>
              <tr>
                <td>Влажность</td>
                <td>12±2%</td>
              </tr>
              <tr>
                <td>Соответствие</td>
                <td>ГОСТ 20850-2014</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="btn-outline"
          onClick={() => navigate('/documents')}
        >
          Полная техническая документация
        </button>
      </div>
    </section>
  );
};

export default TechnicalSpecsSection;

