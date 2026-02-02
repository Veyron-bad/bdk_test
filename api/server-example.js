/**
 * Пример Express-сервера для API калькулятора и заявок
 * Установка: npm install express cors
 * Запуск: node api/server-example.js
 */

const express = require('express');
const cors = require('cors');
const { calculateCost } = require('./calculator');
const { handleRequest } = require('./request-handler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Калькулятор стоимости
app.post('/api/calculator', calculateCost);

// Приём заявок (форма + расчёт из калькулятора)
app.post('/api/request', handleRequest);

// Проверка работоспособности
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
