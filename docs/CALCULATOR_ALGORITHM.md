# Алгоритм расчёта стоимости БДК-балок

## 1. Входные параметры

### 1.1 Основные

| Параметр | Обозначение | Диапазон | Единица |
|----------|-------------|----------|---------|
| Длина балки | `L` | 1–12 | м |
| Высота сечения | `H` | 200, 240, 300 | мм |
| Толщина полки | `tf` | 40, 50, 60, 80 | мм |
| Толщина стенки | `tw` | 8, 10, 12 | мм |
| Порода древесины | `wood` | pine, larch, cedar | — |
| Количество | `Q` | 1+ | шт |

### 1.2 Дополнительные

| Параметр | Варианты | Наценка |
|----------|----------|---------|
| Обработка антисептиком | да/нет | +15% к себестоимости материала |
| Огнезащита | да/нет | +25% к себестоимости материала |
| Фрезеровка пазов | да/нет | +800 ₽/м |
| Фрезеровка отверстий | да/нет | +500 ₽/шт |
| Доставка | регион + срочность | см. таблицу |

### 1.3 Регионы доставки (базовые)

| Регион | Базовый тариф | Коэффициент срочности |
|--------|---------------|------------------------|
| Локальный (до 50 км) | 3 000 ₽ | 1.0 / 1.5 |
| Региональный (50–300 км) | 8 000 ₽ | 1.0 / 1.3 |
| Межрегиональный (300+ км) | 15 000 ₽ + 50 ₽/км | 1.0 / 1.2 |

---

## 2. Формула расчёта

```
ИТОГО = (Стоимость балок + Наценки обработки + Услуги фрезеровки) × Скидка объёма + Доставка
```

### 2.1 Стоимость балок (базовая)

```
P_base(L, H, tf, tw) = Цена_за_метр[типоразмер] × L
```

**Таблица базовых цен за метр** (типоразмер = H × tf × tw):

| H×tf×tw (мм) | Цена/м (сосна) |
|--------------|----------------|
| 200×40×8 | 3 200 |
| 200×50×10 | 4 100 |
| 240×50×10 | 4 800 |
| 240×60×10 | 5 400 |
| 300×60×12 | 7 200 |
| 300×80×12 | 9 100 |

При отсутствии в таблице: интерполяция или ближайший типоразмер.

### 2.2 Коэффициенты породы древесины

| Порода | K_wood |
|--------|--------|
| Сосна | 1.0 |
| Лиственница | 1.4 |
| Кедр | 1.6 |

```
P_wood = P_base × K_wood
```

### 2.3 Обработка

```
K_treatment = 1 + (0.15 × антисептик) + (0.25 × огнезащита)
P_material = P_wood × K_treatment
```

### 2.4 Фрезеровка

```
P_milling = (800 × L × пазы) + (500 × Q × отверстия)
```

(Если обе опции — суммируются.)

### 2.5 Стоимость одной балки × количество

```
P_beams = (P_material + P_milling_per_beam) × Q
```

где `P_milling_per_beam` — доля фрезеровки на одну балку (пазы — на метр, отверстия — на шт).

Уточнённая логика:
- Пазы: 800 ₽/м × L × Q (если пазы включены)
- Отверстия: 500 ₽ × количество_отверстий × Q (или 500 ₽/балка при «базовом» наборе)

Упрощение:
```
P_milling = (800 × L + 500 × N_holes) × Q
```
где N_holes — число отверстий на балку (по умолчанию 0 или 4).

### 2.6 Оптовые скидки

| Объём (шт) | Скидка |
|------------|--------|
| 1–9 | 0% |
| 10–49 | 5% |
| 50–99 | 8% |
| 100+ | 12% |

```
P_with_discount = P_beams × (1 - discount_rate)
```

### 2.7 Доставка

```
P_delivery = Base_delivery[регион] × K_urgency
```

Срочность: 1.0 (обычная), 1.2–1.5 (срочная).

---

## 3. Итоговая формула (псевдокод)

```javascript
function calculate(params) {
  const { length, height, flangeThickness, webThickness, wood, quantity,
          antiseptic, fireProtection, millingGrooves, millingHoles, holesCount,
          deliveryRegion, deliveryUrgent } = params;

  const basePricePerMeter = getBasePrice(height, flangeThickness, webThickness);
  const woodCoeff = WOOD_COEFFICIENTS[wood];
  const treatmentCoeff = 1 + (antiseptic ? 0.15 : 0) + (fireProtection ? 0.25 : 0);

  let materialPerBeam = basePricePerMeter * length * woodCoeff * treatmentCoeff;
  let millingPerBeam = (millingGrooves ? 800 * length : 0) + (millingHoles ? 500 * (holesCount || 4) : 0);
  let beamsTotal = (materialPerBeam + millingPerBeam) * quantity;

  const discount = getVolumeDiscount(quantity);
  beamsTotal *= (1 - discount);

  const delivery = getDeliveryCost(deliveryRegion, deliveryUrgent);

  return {
    materialCost: materialPerBeam * quantity,
    millingCost: millingPerBeam * quantity,
    discountAmount: (materialPerBeam + millingPerBeam) * quantity * discount,
    deliveryCost: delivery,
    total: beamsTotal + delivery
  };
}
```

---

## 4. Выходные данные

| Поле | Описание |
|------|----------|
| `materialCost` | Стоимость материала балок (до скидки) |
| `millingCost` | Стоимость фрезеровки |
| `discountAmount` | Сумма скидки |
| `deliveryCost` | Стоимость доставки |
| `total` | Итоговая сумма |
| `pricePerBeam` | Стоимость за единицу (total / Q) |
