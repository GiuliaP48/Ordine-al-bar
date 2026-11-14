import type { OrderItem } from "./orderItems";

// i dati del form di conferma
export type Checkout = {
    nome: string;
    classe: string;                       
    ritiro: 'ricreazione' | 'pranzo';
    pagamento: 'contanti' | 'carta';
    note: string; // se non scrivo niente restano ""
}

// un ordine confermato che aspetta di essere ritirato
export type PickupOrder = {
    id: number;
    checkout: Checkout;     // nome, classe, ritiro, pagamento, note
    items: OrderItem[];     // i prodotti ordinati
    total: number;          // il totale pagato
}