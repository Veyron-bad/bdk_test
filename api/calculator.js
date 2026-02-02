/**
 * Пример backend API для расчёта стоимости БДК-балок
 * Используется в Node.js/Express
 */

const BASE_PRICES = {
  200: { 40: { 8: 3200 }, 50: { 10: 4100 } },
  240: { 50: { 10: 4800 }, 60: { 10: 5400 } },
  300: { 60: { 12: 7200 }, 80: { 12: 9100 } },
};

const SIZE_PRESETS = [
  { H: 200, tf: 40, tw: 8, price: 3200 },
  { H: 200, tf: 50, tw: 10, price: 4100 },
  { H: 240, tf: 50, tw: 10, price: 4800 },
  { H: 240, tf: 60, tw: 10, price: 5400 },
  { H: 300, tf: 60, tw: 12, price: 7200 },
  { H: 300, tf: 80, tw: 12, price: 9100 },
];

const WOOD_COEFFICIENTS = { pine: 1.0, larch: 1.4, cedar: 1.6 };

const VOLUME_DISCOUNTS = [
  { min: 100, rate: 0.12 },
  { min: 50, rate: 0.08 },
  { min: 10, rate: 0.05 },
  { min: 1, rate: 0 },
];

const DELIVERY_BASE = {
  local: { base: 3000, km: 0 },
  regional: { base: 8000, km: 0 },
  interregional: { base: 15000, km: 50 },
};

function getBasePricePerMeter(height, flangeThickness, webThickness) {
  const row = BASE_PRICES[height];
  if (row) {
    const col = row[flangeThickness];
    if (col && col[webThickness] != null) return col[webThickness];
  }
  let best = SIZE_PRESETS[0];
  let minDist = Infinity;
  for (const s of SIZE_PRESETS) {
    const d = Math.abs(s.H - height) + Math.abs(s.tf - flangeThickness) + Math.abs(s.tw - webThickness);
    if (d < minDist) { minDist = d; best = s; }
  }
  return best.price;
}

function getVolumeDiscountRate(quantity) {
  const q = Math.max(0, parseInt(quantity, 10) || 0);
  for (const { min, rate } of VOLUME_DISCOUNTS) {
    if (q >= min) return rate;
  }
  return 0;
}

function getDeliveryCost(region, urgent, distanceKm = 0) {
  const d = DELIVERY_BASE[region] || DELIVERY_BASE.local;
  const coeff = urgent ? 1.3 : 1.0;
  return Math.round((d.base + (d.km || 0) * Math.max(0, distanceKm)) * coeff);
}

/**
 * POST /api/calculator
 * Body: { length, height, flangeThickness, webThickness, wood, quantity, ... }
 */
function calculateCost(req, res) {
  const {
    length = 6,
    height = 200,
    flangeThickness = 50,
    webThickness = 10,
    wood = 'pine',
    quantity = 1,
    antiseptic = false,
    fireProtection = false,
    millingGrooves = false,
    millingHoles = false,
    holesCount = 4,
    deliveryRegion = 'local',
    deliveryUrgent = false,
    deliveryDistance = 0,
  } = req.body || {};

  const L = Math.max(1, Math.min(12, parseFloat(length) || 6));
  const Q = Math.max(1, parseInt(quantity, 10) || 1);
  const K_wood = WOOD_COEFFICIENTS[wood] ?? 1;
  const K_treatment = 1 + (antiseptic ? 0.15 : 0) + (fireProtection ? 0.25 : 0);

  const pricePerMeter = getBasePricePerMeter(height, flangeThickness, webThickness);
  const materialPerBeam = pricePerMeter * L * K_wood * K_treatment;
  const millingPerBeam = (millingGrooves ? 800 * L : 0) + (millingHoles ? 500 * (holesCount || 4) : 0);
  const beamsSubtotal = (materialPerBeam + millingPerBeam) * Q;
  const discountRate = getVolumeDiscountRate(Q);
  const discountAmount = beamsSubtotal * discountRate;
  const beamsTotal = beamsSubtotal - discountAmount;
  const delivery = getDeliveryCost(deliveryRegion, deliveryUrgent, deliveryRegion === 'interregional' ? deliveryDistance : 0);
  const total = Math.round(beamsTotal + delivery);

  res.json({
    materialCost: Math.round(materialPerBeam * Q),
    millingCost: Math.round(millingPerBeam * Q),
    discountRate,
    discountAmount: Math.round(discountAmount),
    beamsTotal: Math.round(beamsTotal),
    deliveryCost: delivery,
    total,
    pricePerBeam: Q > 0 ? Math.round((beamsTotal + delivery) / Q) : 0,
  });
}

module.exports = { calculateCost };
