# Гайд по типографике — сайт БДК-балок

## Шрифтовая пара

**Рекомендация:** Montserrat + Open Sans

| Роль | Шрифт | Назначение |
|------|-------|------------|
| Заголовки | Montserrat | Визуальная иерархия, акцент |
| Текст | Open Sans | Читаемость, нейтральность |
| Цифры | Montserrat | Цены, технические параметры |

### Запасные пары

- **Exo 2** + **Source Sans 3** — более техничный вид
- **Roboto** — универсальный вариант (один шрифт)

---

## Размеры и начертания

### Заголовки

| Класс | Шрифт | Размер (px) | Вес | Line-height |
|-------|-------|-------------|-----|-------------|
| H1 | Montserrat | 36–48 | 700 | 1.1 |
| H2 | Montserrat | 28–36 | 600 | 1.2 |
| H3 | Montserrat | 22–24 | 600 | 1.3 |
| H4 | Montserrat | 18–20 | 600 | 1.35 |

### Текст

| Элемент | Шрифт | Размер | Вес | Line-height |
|---------|-------|--------|-----|-------------|
| Подзаголовок | Open Sans | 16–18 | 400 | 1.4 |
| Основной текст | Open Sans | 16 | 400 | 1.5 |
| Мелкий текст | Open Sans | 14 | 400 | 1.45 |
| Подпись/метка | Open Sans | 12 | 400 | 1.4 |

### Интерфейс

| Элемент | Шрифт | Размер | Вес |
|---------|-------|--------|-----|
| Цифры/цены | Montserrat | 20–24 | 600 |
| Кнопки | Montserrat | 14–16 | 600 |
| Навигация | Montserrat | 14–15 | 500–600 |

---

## Адаптивные размеры

| Breakpoint | H1 | H2 | H3 | Текст |
|------------|-----|-----|-----|-------|
| 320–479px (mobile) | 28px | 22px | 18px | 15px |
| 480–767px (tablet) | 32px | 26px | 20px | 16px |
| 768–1199px | 40px | 30px | 22px | 16px |
| 1200px+ (desktop) | 48px | 36px | 24px | 16px |

---

## Технические числа

- **font-variant-numeric: tabular-nums** — для таблиц и выравнивания цифр
- Единицы: через пробел — «12 м», «300 кг», «45 000 ₽»
- Разделитель тысяч: неразрывный пробел (&#8239; или `\u202F`)

---

## CSS-переменные

```css
:root {
  --font-heading: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  
  --text-h1: 48px;
  --text-h2: 36px;
  --text-h3: 24px;
  --text-h4: 20px;
  --text-body: 16px;
  --text-small: 14px;
  --text-caption: 12px;
  --text-price: 22px;
}

@media (max-width: 1199px) {
  :root {
    --text-h1: 40px;
    --text-h2: 30px;
    --text-h3: 22px;
  }
}

@media (max-width: 767px) {
  :root {
    --text-h1: 32px;
    --text-h2: 26px;
    --text-h3: 20px;
    --text-body: 16px;
  }
}

@media (max-width: 479px) {
  :root {
    --text-h1: 28px;
    --text-h2: 22px;
    --text-h3: 18px;
    --text-body: 15px;
  }
}
```

---

## Google Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

Ограничение весов (400, 500, 600, 700) для оптимизации загрузки.
