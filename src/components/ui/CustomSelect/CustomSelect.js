import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

/**
 * Кастомное выпадающее меню (как в RequestFormSection).
 * options: [{ value, label }]
 * placeholder: текст при пустом value (не показывается в списке)
 */
const CustomSelect = ({ value, options, onChange, label, id, className = '', placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const selectedLabel = value !== '' && value != null
    ? (options.find((o) => o.value === value)?.label ?? '')
    : (placeholder ?? options[0]?.label ?? '');

  return (
    <div className={`custom-select ${className}`}>
      {label && <label className="custom-select__label">{label}</label>}
      <div className="custom-select__wrap" ref={ref}>
        <button
          type="button"
          className={`custom-select__trigger ${open ? 'custom-select__trigger--open' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          aria-expanded={open}
          aria-haspopup="listbox"
          id={id}
        >
          <span className="custom-select__value">{selectedLabel}</span>
          <svg className="custom-select__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <ul
          className="custom-select__list"
          role="listbox"
          hidden={!open}
          style={{ display: open ? 'block' : 'none' }}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`custom-select__option ${value === opt.value ? 'custom-select__option--active' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
