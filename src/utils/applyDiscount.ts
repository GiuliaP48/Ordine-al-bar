export const DISCOUNT_CODE = 'BAR10';

// restituisce il totale scontato se il codice è giusto (in maiuscolo o minuscolo), altrimenti il totale normale
export function applyDiscount(total: number, codice: string) {
    return codice.trim().toUpperCase() === DISCOUNT_CODE ? total * 0.9 : total;
}