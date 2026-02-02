# Интеграция калькулятора с backend

## Frontend

Калькулятор выполняет расчёт на клиенте (`src/utils/calculatorLogic.js`). Для верификации или единого источника правды можно дублировать расчёт на backend.

### Отправка заявки с расчётом

При нажатии «Сохранить расчёт и отправить заявку»:
1. Формируется текст расчёта (summary)
2. Выполняется переход на `/request?from=calculator&summary=...`
3. Форма заявки подставляет summary в поле «Комментарий»
4. При отправке формы summary уходит вместе с остальными полями

### Подключение к API (опционально)

```javascript
// src/utils/api.js
const API_BASE = process.env.REACT_APP_API_URL || '';

export async function submitRequest(data) {
  const res = await fetch(`${API_BASE}/api/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Ошибка отправки');
  return res.json();
}

export async function calculateFromServer(params) {
  const res = await fetch(`${API_BASE}/api/calculator`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Ошибка расчёта');
  return res.json();
}
```

В `RequestFormSection` при submit вызывать `submitRequest({ name, phone, email, projectType, comment })`.

## Backend

### Запуск примера

```bash
cd bdk_new
npm install express cors
node api/server-example.js
```

API будет доступен на `http://localhost:3001`.

### Эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| POST | /api/calculator | Расчёт стоимости. Body: см. CALCULATOR_ALGORITHM.md |
| POST | /api/request | Приём заявки. Body: name, phone, email?, projectType, comment |
| GET | /api/health | Проверка сервера |

### Отправка на почту

Для отправки писем можно использовать `nodemailer`:

```javascript
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({ /* SMTP */ });

await transporter.sendMail({
  from: 'site@company.ru',
  to: 'sales@company.ru',
  subject: 'Новая заявка с сайта',
  text: formatPayload(payload),
});
```
