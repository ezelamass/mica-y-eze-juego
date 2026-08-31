// Items de la tienda. Los tres regalos son reales (del viaje) y se retiran
// de la tienda al comprarse. Los caprichos son recomprables e infinitos.
// "Cita sorpresa" no vive acá: se arma dinámicamente en engine.ts a partir
// de los destinos ya desbloqueados en places.ts.

export type ShopItemId =
  | "regalochico"
  | "regalomediano"
  | "regalogrande"
  | "masaje5"
  | "masaje10"
  | "cupon24";

export interface ShopItem {
  id: ShopItemId;
  name: string;
  description?: string;
  price: number;
  /** los regalos son de una sola vez: se sacan de la tienda al comprarse */
  oneTime: boolean;
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: "regalochico", name: "Regalo chico", description: "Real, del viaje", price: 8, oneTime: true },
  { id: "regalomediano", name: "Regalo mediano", description: "Real, del viaje", price: 18, oneTime: true },
  { id: "regalogrande", name: "Regalo grande", description: "Real, del viaje", price: 35, oneTime: true },
  { id: "masaje5", name: "Masaje de 5 minutos", price: 2, oneTime: false },
  { id: "masaje10", name: "Masaje de 10 minutos", description: "Con extra: 25% off", price: 4, oneTime: false },
  { id: "cupon24", name: "Cupón: cuando ella quiera", description: "Válido 24 horas", price: 5, oneTime: false },
];

export const CITA_PRICE = 6;
