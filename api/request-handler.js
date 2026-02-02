/**
 * Пример обработчика заявок (форма + расчёт из калькулятора)
 * POST /api/request
 */

// Пример: отправка в CRM, письмо на почту, сохранение в БД
async function handleRequest(req, res) {
  const { name, phone, email, projectType, comment, calculatorSummary } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Укажите имя и телефон' });
  }

  const payload = {
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: String(email || '').trim(),
    projectType: String(projectType || 'other'),
    comment: String(comment || '').trim(),
    calculatorSummary: calculatorSummary || null,
    createdAt: new Date().toISOString(),
    source: calculatorSummary ? 'calculator' : 'form',
  };

  // TODO: интеграция с CRM, email, БД
  // await sendEmail({ to: 'sales@company.ru', subject: 'Новая заявка', body: formatPayload(payload) });
  // await db.requests.insert(payload);

  console.log('[Request]', JSON.stringify(payload, null, 2));

  res.status(200).json({
    success: true,
    message: 'Заявка принята. Мы свяжемся с вами в ближайшее время.',
  });
}

function formatPayload(p) {
  return [
    `Имя: ${p.name}`,
    `Телефон: ${p.phone}`,
    `Email: ${p.email}`,
    `Тип проекта: ${p.projectType}`,
    `Источник: ${p.source}`,
    '',
    'Сообщение / расчёт:',
    p.comment || '(пусто)',
  ].join('\n');
}

module.exports = { handleRequest };
