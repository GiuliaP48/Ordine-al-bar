
// formatPrice --> trasforma un numero (1.5) in un prezzo in euro scritto all'italiana ("1,50 €")
export function formatPrice(price: number) {
    // toLocaleString --> scrive il numero secondo le regole di una lingua:
    // "it-IT" = italiano (virgola per i decimali); style "currency" + currency "EUR" = prezzo in euro con 2 decimali e simbolo €
    return price.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}