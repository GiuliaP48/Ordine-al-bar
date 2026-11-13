// una riga dell'ordine: salvo solo l'id del prodotto e la quantità
export type OrderItem = {
    productId: number;
    quantity: number;
};

// massimo di pezzi per prodotto
export const MAX_QUANTITY = 5;