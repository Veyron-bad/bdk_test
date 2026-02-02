import React, { useState, useEffect } from 'react';
import CustomSelect from '../../ui/CustomSelect/CustomSelect';
import './RequestFormSection.css';

const PROJECT_OPTIONS = [
  { value: 'house', label: 'Жилой дом' },
  { value: 'commercial', label: 'Коммерческое здание' },
  { value: 'banya', label: 'Баня' },
  { value: 'other', label: 'Другое' },
];

const RequestFormSection = ({ calculatorSummary = null }) => {
  const [projectType, setProjectType] = useState('');
  const [comment, setComment] = useState(calculatorSummary || '');
  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    if (calculatorSummary) setComment(calculatorSummary);
  }, [calculatorSummary]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectType) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    // TODO: заменить alert на реальную отправку формы/интеграцию с backend/CRM
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <section className="request-form">
      <div className="container">
        <h2>Оставить заявку на расчёт</h2>
        <form className="request-form__form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Ваше имя *</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Телефон *</label>
              <input type="tel" required />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" />
          </div>
          <div className={`form-group ${validationError ? 'form-group--error' : ''}`}>
            <CustomSelect
              label="Тип проекта"
              value={projectType}
              options={PROJECT_OPTIONS}
              onChange={(v) => { setProjectType(v); setValidationError(false); }}
              placeholder="Выберите тип проекта"
              className={validationError ? 'custom-select--error' : ''}
            />
            {validationError && <span className="request-form__error">Выберите тип проекта</span>}
          </div>
          <div className="form-group">
            <label>Комментарий {calculatorSummary && <span className="request-form__calc-badge">Расчёт из калькулятора</span>}</label>
            <textarea rows="4" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Опишите ваш проект или вставьте расчёт из калькулятора" />
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <p className="checkbox-text">Согласен на обработку персональных данных</p>              
            </label>
          </div>
          <button type="submit" className="btn-primary">
            Отправить заявку
          </button>
        </form>
      </div>
    </section>
  );
};

export default RequestFormSection;

