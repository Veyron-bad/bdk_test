import React, { useState } from 'react';
import './CatalogFilters.css';

const CatalogFilters = ({ onFilterChange = () => {} }) => {
  const [filters, setFilters] = useState({
    length: { min: 1000, max: 12000 },
    height: [],
    width: [],
    type: [],
    purpose: [],
    strength: [],
    surface: [],
    price: { min: 0, max: 100000 },
    availability: 'all',
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };

    if (
      filterType === 'height' ||
      filterType === 'width' ||
      filterType === 'type' ||
      filterType === 'purpose' ||
      filterType === 'strength' ||
      filterType === 'surface'
    ) {
      const index = newFilters[filterType].indexOf(value);
      if (index > -1) {
        newFilters[filterType] = newFilters[filterType].filter(
          (item) => item !== value,
        );
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
    } else {
      newFilters[filterType] = value;
    }

    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="catalog-filters">
      <h3>Фильтры</h3>

      {/* Длина */}
      <div className="filter-group">
        <label>Длина (мм)</label>
        <div className="filter-group__range">
          <input
            type="number"
            value={filters.length.min}
            onChange={(e) =>
              handleFilterChange('length', {
                ...filters.length,
                min: parseInt(e.target.value, 10),
              })
            }
            min="1000"
            max="12000"
          />
          <span>—</span>
          <input
            type="number"
            value={filters.length.max}
            onChange={(e) =>
              handleFilterChange('length', {
                ...filters.length,
                max: parseInt(e.target.value, 10),
              })
            }
            min="1000"
            max="12000"
          />
        </div>
        <div className="filter-group__quick-values">
          <button
            type="button"
            onClick={() =>
              handleFilterChange('length', { min: 3000, max: 3000 })
            }
          >
            3000
          </button>
          <button
            type="button"
            onClick={() =>
              handleFilterChange('length', { min: 6000, max: 6000 })
            }
          >
            6000
          </button>
          <button
            type="button"
            onClick={() =>
              handleFilterChange('length', { min: 9000, max: 9000 })
            }
          >
            9000
          </button>
          <button
            type="button"
            onClick={() =>
              handleFilterChange('length', { min: 12000, max: 12000 })
            }
          >
            12000
          </button>
        </div>
      </div>

      {/* Высота */}
      <div className="filter-group">
        <label>Высота (мм)</label>
        {[200, 250, 300, 350, 400, 450, 500].map((height) => (
          <label key={height} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.height.includes(height)}
              onChange={() => handleFilterChange('height', height)}
            />
            {height}
          </label>
        ))}
      </div>

      {/* Ширина полки */}
      <div className="filter-group">
        <label>Ширина полки (мм)</label>
        {[80, 100, 120, 140, 160, 180, 200].map((width) => (
          <label key={width} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.width.includes(width)}
              onChange={() => handleFilterChange('width', width)}
            />
            {width}
          </label>
        ))}
      </div>

      {/* Тип балки */}
      <div className="filter-group">
        <label>Тип балки</label>
        {['Стандартная', 'Индивидуальная', 'С вырезами', 'С усилением'].map(
          (type) => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => handleFilterChange('type', type)}
              />
              {type}
            </label>
          ),
        )}
      </div>

      {/* Назначение */}
      <div className="filter-group">
        <label>Назначение</label>
        {[
          'Перекрытия',
          'Стропильные системы',
          'Несущие конструкции',
          'Специальные решения',
        ].map((purpose) => (
          <label key={purpose} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.purpose.includes(purpose)}
              onChange={() => handleFilterChange('purpose', purpose)}
            />
            {purpose}
          </label>
        ))}
      </div>

      {/* Класс прочности */}
      <div className="filter-group">
        <label>Класс прочности</label>
        {['К24', 'К26', 'К28'].map((strength) => (
          <label key={strength} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.strength.includes(strength)}
              onChange={() => handleFilterChange('strength', strength)}
            />
            {strength}
          </label>
        ))}
      </div>

      {/* Обработка поверхности */}
      <div className="filter-group">
        <label>Обработка поверхности</label>
        {[
          'Необработанная',
          'Шлифованная',
          'Обработанная защитным составом',
        ].map((surface) => (
          <label key={surface} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.surface.includes(surface)}
              onChange={() => handleFilterChange('surface', surface)}
            />
            {surface}
          </label>
        ))}
      </div>

      {/* Цена */}
      <div className="filter-group">
        <label>Цена (₽)</label>
        <div className="filter-group__range">
          <input
            type="number"
            value={filters.price.min}
            onChange={(e) =>
              handleFilterChange('price', {
                ...filters.price,
                min: parseInt(e.target.value, 10),
              })
            }
            min="0"
          />
          <span>—</span>
          <input
            type="number"
            value={filters.price.max}
            onChange={(e) =>
              handleFilterChange('price', {
                ...filters.price,
                max: parseInt(e.target.value, 10),
              })
            }
            min="0"
          />
        </div>
        <div className="filter-group__price-buttons">
          <button
            type="button"
            onClick={() =>
              handleFilterChange('price', { min: 0, max: 10000 })
            }
          >
            до 10 000₽
          </button>
          <button
            type="button"
            onClick={() =>
              handleFilterChange('price', { min: 10000, max: 30000 })
            }
          >
            10 000-30 000₽
          </button>
          <button
            type="button"
            onClick={() =>
              handleFilterChange('price', { min: 30000, max: 50000 })
            }
          >
            30 000-50 000₽
          </button>
          <button
            type="button"
            onClick={() =>
              handleFilterChange('price', { min: 50000, max: 1000000 })
            }
          >
            от 50 000₽
          </button>
        </div>
      </div>

      {/* Наличие */}
      <div className="filter-group">
        <label>Наличие</label>
        <label className="radio-label">
          <input
            type="radio"
            name="availability"
            value="all"
            checked={filters.availability === 'all'}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
          />
          Оба варианта
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="availability"
            value="in-stock"
            checked={filters.availability === 'in-stock'}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
          />
          В наличии
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="availability"
            value="order"
            checked={filters.availability === 'order'}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
          />
          Под заказ
        </label>
      </div>

      <button
        type="button"
        className="catalog-filters__reset"
        onClick={() => {
          const resetFilters = {
            length: { min: 1000, max: 12000 },
            height: [],
            width: [],
            type: [],
            purpose: [],
            strength: [],
            surface: [],
            price: { min: 0, max: 100000 },
            availability: 'all',
          };
          setFilters(resetFilters);
          onFilterChange(resetFilters);
        }}
      >
        Сбросить фильтры
      </button>
    </div>
  );
};

export default CatalogFilters;

