// i dati del form di conferma
export type Checkout = {
    nome: string;
    classe: string;                       
    ritiro: 'ricreazione' | 'pranzo';
    pagamento: 'contanti' | 'carta';
    note: string; // se non scrivo niente restano ""
}