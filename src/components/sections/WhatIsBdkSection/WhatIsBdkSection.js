import React, { useState, useCallback, useEffect } from 'react';
import './WhatIsBdkSection.css';

import balkaBdk from '../../../images/balka_bdk.png';
import bdkBalki from '../../../images/bdk_balki.jpg';
import bdkBalki1 from '../../../images/bdk_balki_1.jpg';
import bdkBalki2 from '../../../images/bdk_balki_2.jpg';

const SLIDES = [
  { src: balkaBdk, alt: 'Балка БДК — производство' },
  { src: bdkBalki, alt: 'Балки БДК' },
  { src: bdkBalki1, alt: 'Балки БДК в строительстве' },
  { src: bdkBalki2, alt: 'Балки БДК' },
];

const WhatIsBdkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? SLIDES.length - 1 : i - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i >= SLIDES.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [goNext]);

  return (
    <section className="what-is-bdk">
      <div className="container">
        <h2>Что такое балки БДК?</h2>
        <div className="what-is-bdk__content">
          <div className="what-is-bdk__text">
            <p>
              БДК (балка двутавровая клеёная) — это современный строительный материал
              из древесины, который сочетает в себе прочность, экологичность и
              экономичность.
            </p>
            <h3>Преимущества БДК:</h3>
            <ul>
              <li>Высокая несущая способность</li>
              <li>Экологически чистый материал</li>
              <li>Долговечность и надёжность</li>
              <li>Возможность создания больших пролётов</li>
            </ul>
          </div>

          <div className="what-is-bdk__image">
            {SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className="what-is-bdk__slide"
                aria-hidden={currentIndex !== idx}
                style={{
                  opacity: currentIndex === idx ? 1 : 0,
                  pointerEvents: currentIndex === idx ? 'auto' : 'none',
                  zIndex: currentIndex === idx ? 1 : 0,
                }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="what-is-bdk__img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
            <button
              type="button"
              className="what-is-bdk__slider-btn what-is-bdk__slider-btn--prev"
              aria-label="Предыдущий слайд"
              onClick={goPrev}
            >
              <svg className="what-is-bdk__slider-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="what-is-bdk__slider-btn what-is-bdk__slider-btn--next"
              aria-label="Следующий слайд"
              onClick={goNext}
            >
              <svg className="what-is-bdk__slider-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <div className="what-is-bdk__dots" role="tablist" aria-label="Слайды">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`Слайд ${idx + 1}`}
                  className={`what-is-bdk__dot ${idx === currentIndex ? 'what-is-bdk__dot--active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsBdkSection;
