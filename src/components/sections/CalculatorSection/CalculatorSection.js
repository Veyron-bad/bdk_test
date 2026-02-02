import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculate, WOOD_LABELS, HEIGHT_OPTIONS, FLANGE_OPTIONS, WEB_OPTIONS, DELIVERY_LABELS } from '../../../utils/calculatorLogic';
import BeamVisualization from './BeamVisualization';
import CustomSelect from '../../ui/CustomSelect/CustomSelect';
import './CalculatorSection.css';

const HEIGHT_OPTS = HEIGHT_OPTIONS.map((h) => ({ value: h, label: `${h} мм` }));
const FLANGE_OPTS = FLANGE_OPTIONS.map((t) => ({ value: t, label: `${t} мм` }));
const WEB_OPTS = WEB_OPTIONS.map((t) => ({ value: t, label: `${t} мм` }));
const WOOD_OPTS = Object.entries(WOOD_LABELS).map(([k, v]) => ({ value: k, label: v }));
const DELIVERY_OPTS = Object.entries(DELIVERY_LABELS).map(([k, v]) => ({ value: k, label: v }));

const STEPS = [
  { id: 'main', label: 'Основные параметры' },
  { id: 'options', label: 'Дополнительно' },
  { id: 'delivery', label: 'Доставка' },
];

const CalculatorSection = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [params, setParams] = useState({
    length: 6,
    height: 200,
    flangeThickness: 50,
    webThickness: 10,
    wood: 'pine',
    quantity: 1,
    antiseptic: false,
    fireProtection: false,
    millingGrooves: false,
    millingHoles: false,
    holesCount: 4,
    deliveryRegion: 'local',
    deliveryUrgent: false,
    deliveryDistance: 100,
  });

  const updateParam = useCallback((key, value) => {
    setParams((p) => ({ ...p, [key]: value }));
  }, []);

  const result = useMemo(() => calculate(params), [params]);

  const handleSaveAndRequest = () => {
    const summary = [
      `БДК ${params.length}м × ${params.height}×${params.flangeThickness}×${params.webThickness}`,
      `Порода: ${WOOD_LABELS[params.wood]}`,
      `Количество: ${params.quantity} шт`,
      params.antiseptic && 'Антисептик',
      params.fireProtection && 'Огнезащита',
      params.millingGrooves && 'Фрезеровка пазов',
      params.millingHoles && `Фрезеровка отверстий (${params.holesCount} шт)`,
      `Доставка: ${DELIVERY_LABELS[params.deliveryRegion]}${params.deliveryUrgent ? ', срочная' : ''}`,
      `Итого: ${result.total.toLocaleString('ru-RU')} ₽`,
    ]
      .filter(Boolean)
      .join('\n');
    const encoded = encodeURIComponent(summary);
    navigate(`/request?from=calculator&summary=${encoded}`);
  };

  const formatPrice = (n) => n.toLocaleString('ru-RU') + ' ₽';

  return (
    <section className="calculator" id="calculator">
      <div className="container">
        <h2 className="calculator__title">Калькулятор стоимости БДК-балок</h2>
        <p className="calculator__subtitle">Рассчитайте стоимость за несколько шагов</p>

        <div className="calculator__layout">
          <div className="calculator__form-wrap">
            <ul className="calculator__steps" role="tablist">
              {STEPS.map((s, i) => (
                <li
                  key={s.id}
                  className={`calculator__step ${step >= i + 1 ? 'calculator__step--active' : ''} ${step === i + 1 ? 'calculator__step--current' : ''}`}
                  role="tab"
                  aria-selected={step === i + 1}
                >
                  <button type="button" onClick={() => setStep(i + 1)}>
                    <span className="calculator__step-num">{i + 1}</span>
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="calculator__form">
              {step === 1 && (
                <div className="calculator__step-content">
                  <div className="form-group">
                    <label>Длина балки (м)</label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      step={0.5}
                      value={params.length}
                      onChange={(e) => updateParam('length', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <CustomSelect
                      label="Высота сечения (мм)"
                      value={params.height}
                      options={HEIGHT_OPTS}
                      onChange={(v) => updateParam('height', v)}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <CustomSelect
                        label="Толщина полки (мм)"
                        value={params.flangeThickness}
                        options={FLANGE_OPTS}
                        onChange={(v) => updateParam('flangeThickness', v)}
                      />
                    </div>
                    <div className="form-group">
                      <CustomSelect
                        label="Толщина стенки (мм)"
                        value={params.webThickness}
                        options={WEB_OPTS}
                        onChange={(v) => updateParam('webThickness', v)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <CustomSelect
                      label="Порода древесины"
                      value={params.wood}
                      options={WOOD_OPTS}
                      onChange={(v) => updateParam('wood', v)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Количество (шт)</label>
                    <input
                      type="number"
                      min={1}
                      value={params.quantity}
                      onChange={(e) => updateParam('quantity', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="calculator__step-content">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={params.antiseptic}
                        onChange={(e) => updateParam('antiseptic', e.target.checked)}
                      />
                      <span>Антисептическая обработка (+15%)</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={params.fireProtection}
                        onChange={(e) => updateParam('fireProtection', e.target.checked)}
                      />
                      <span>Огнезащита (+25%)</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={params.millingGrooves}
                        onChange={(e) => updateParam('millingGrooves', e.target.checked)}
                      />
                      <span>Фрезеровка пазов (800 ₽/м)</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={params.millingHoles}
                        onChange={(e) => updateParam('millingHoles', e.target.checked)}
                      />
                      <span>Фрезеровка отверстий</span>
                    </label>
                    {params.millingHoles && (
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={params.holesCount}
                        onChange={(e) => updateParam('holesCount', parseInt(e.target.value, 10) || 4)}
                        className="calculator__holes-input"
                        placeholder="Кол-во отверстий на балку"
                      />
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="calculator__step-content">
                  <div className="form-group">
                    <CustomSelect
                      label="Регион доставки"
                      value={params.deliveryRegion}
                      options={DELIVERY_OPTS}
                      onChange={(v) => updateParam('deliveryRegion', v)}
                    />
                  </div>
                  {params.deliveryRegion === 'interregional' && (
                    <div className="form-group">
                      <label>Расстояние (км)</label>
                      <input
                        type="number"
                        min={300}
                        value={params.deliveryDistance}
                        onChange={(e) => updateParam('deliveryDistance', parseInt(e.target.value, 10) || 300)}
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={params.deliveryUrgent}
                        onChange={(e) => updateParam('deliveryUrgent', e.target.checked)}
                      />
                      <span>Срочная доставка</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="calculator__nav">
                {step > 1 ? (
                  <button type="button" className="btn-outline" onClick={() => setStep(step - 1)}>
                    Назад
                  </button>
                ) : (
                  <span />
                )}
                {step < 3 ? (
                  <button type="button" className="btn-primary" onClick={() => setStep(step + 1)}>
                    Далее
                  </button>
                ) : (
                  <span />
                )}
              </div>
            </div>
          </div>

          <aside className="calculator__aside">
            <BeamVisualization
              length={params.length}
              height={params.height}
              flangeThickness={params.flangeThickness}
              webThickness={params.webThickness}
            />
            <div className="calculator__result">
              <div className="calculator__result-total">
                <span className="calculator__result-label">Итого</span>
                <span className="calculator__result-value">{formatPrice(result.total)}</span>
              </div>
              <div className="calculator__result-details">
                <p>Материал: {formatPrice(result.materialCost)}</p>
                {result.millingCost > 0 && <p>Фрезеровка: {formatPrice(result.millingCost)}</p>}
                {result.discountAmount > 0 && <p>Скидка: −{formatPrice(result.discountAmount)}</p>}
                <p>Доставка: {formatPrice(result.deliveryCost)}</p>
              </div>
              <p className="calculator__result-per">за шт: {formatPrice(result.pricePerBeam)}</p>
              <button
                type="button"
                className="btn-primary calculator__cta"
                onClick={handleSaveAndRequest}
              >
                Сохранить расчёт и отправить заявку
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
