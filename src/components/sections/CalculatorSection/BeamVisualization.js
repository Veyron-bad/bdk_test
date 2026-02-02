import React from 'react';
import './BeamVisualization.css';

/**
 * Схематичная визуализация БДК-балки (вид сбоку, сечение)
 * length - м, height/tf/tw - мм
 */
const BeamVisualization = ({ length = 6, height = 200, flangeThickness = 50, webThickness = 10 }) => {
  const L = Math.max(1, Math.min(12, parseFloat(length) || 6));
  const H = Math.max(150, Math.min(400, parseInt(height, 10) || 200));
  const Tf = Math.max(30, Math.min(100, parseInt(flangeThickness, 10) || 50));
  const Tw = Math.max(6, Math.min(16, parseInt(webThickness, 10) || 10));

  // Масштаб: балка помещается в контейнер ~300×120
  const maxLen = 12;
  const barLen = (L / maxLen) * 100;
  const barH = Math.min(80, (H / 400) * 80);
  const barTf = Math.max(4, (Tf / 100) * 12);
  const barTw = Math.max(2, (Tw / 16) * 8);

  return (
    <div className="beam-viz" aria-hidden="true">
      <div className="beam-viz__label">БДК {L}м × {H}×{Tf}×{Tw}</div>
      <div className="beam-viz__container">
        <svg viewBox="0 0 200 100" className="beam-viz__svg" preserveAspectRatio="xMidYMid meet">
          {/* Вид сбоку — двутавр */}
          <g transform="translate(20, 50)">
            {/* Верхняя полка */}
            <rect
              x={0}
              y={-barH / 2 - barTf}
              width={barLen}
              height={barTf}
              className="beam-viz__flange"
              rx="1"
            />
            {/* Стенка */}
            <rect
              x={barLen / 2 - barTw / 2}
              y={-barH / 2}
              width={barTw}
              height={barH}
              className="beam-viz__web"
              rx="1"
            />
            {/* Нижняя полка */}
            <rect
              x={0}
              y={barH / 2}
              width={barLen}
              height={barTf}
              className="beam-viz__flange"
              rx="1"
            />
          </g>
          {/* Сечение (увеличенное) */}
          <g transform="translate(140, 50)">
            <rect x={-barTw / 2 - 4} y={-barH / 2 - barTf - 4} width={barTf * 2 + barTw + 8} height={barTf} className="beam-viz__flange" rx="1" />
            <rect x={-barTw / 2} y={-barH / 2} width={barTw} height={barH} className="beam-viz__web" rx="1" />
            <rect x={-barTw / 2 - 4} y={barH / 2 + 4} width={barTf * 2 + barTw + 8} height={barTf} className="beam-viz__flange" rx="1" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default BeamVisualization;
