
import { useState } from "react";
import { menu } from "./data/menu";
import { MAX_QUANTITY } from "./orderItems";
import type { OrderItem } from "./orderItems";
import { formatPrice } from "./utils/formatPrice";
import Menu from "./components/Menu";
import Order from "./components/Order";
import CheckoutForm from "./components/CheckoutForm";
import type { Checkout, PickupOrder } from "./types";
import PickupList from "./components/PickupList";
import { applyDiscount } from "./utils/applyDiscount";

function App() {
  // lo stato sta tutto in App e scende ai componenti con le props
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [confirmed, setConfirmed] = useState("");
  const [pickups, setPickups] = useState<PickupOrder[]>([]); // gli ordini confermati da ritirare

  // trovo nel menu il prodotto con questo id
  function getProduct(id: number) {
    return menu.find(p => p.id === id)!;
  }

  // totale con reduce: parto da 0 e per ogni riga aggiungo prezzo × quantità
  const total = order.reduce((somma, item) => somma + getProduct(item.productId).price * item.quantity, 0);

  // quanti ordini da ritirare sono a ricreazione: al massimo 3
  const numRicreazione = pickups.filter(p => p.checkout.ritiro === 'ricreazione').length;

  // "Aggiungi" e "+" fanno la stessa cosa
  function addProduct(id: number) {
    const item = order.find(i => i.productId === id);

    if (!item) {
      // non c'è ancora --> aggiungo una riga nuova con quantità 1
      setOrder([...order, { productId: id, quantity: 1 }]);
    } else if (item.quantity < MAX_QUANTITY) {
      // c'è già --> map: per la riga giusta un oggetto nuovo con quantità + 1
      setOrder(order.map(i => i.productId === id ? { ...i, quantity: i.quantity + 1 } : i));
    }
    // se è già a 5 non faccio niente
  }

  // "−": tolgo 1 alla riga giusta, poi elimino le righe arrivate a 0
  function removeProduct(id: number) {
    // map: la riga del prodotto cliccato diventa un oggetto nuovo, le altre restano uguali
    const nuovoOrdine = order.map(i => i.productId === id ? { ...i, quantity: i.quantity - 1 } : i);

    // filter: tengo solo le righe che hanno ancora almeno 1 pezzo
    setOrder(nuovoOrdine.filter(i => i.quantity > 0));
  }

  // il form mi passa i dati del ritiro: calcolo il totale scontato, mostro il messaggio, aggiungo l'ordine a "Da ritirare" e svuoto l'ordine
  function confirmOrder(checkout: Checkout) {
    // il totale con lo sconto, se c'è
    const finalTotal = applyDiscount(total, checkout.codice);

    setConfirmed(`Ordine per ${checkout.nome} (${checkout.classe}), ritiro a ${checkout.ritiro}, ${checkout.pagamento}: ${formatPrice(finalTotal)}`);
    // lo aggiungo agli ordini da ritirare: copio dati del form, prodotti e totale prima di svuotare l'ordine
    setPickups(prev => [...prev, {
      // lo 0 serve quando la lista è vuota: così il primo ordine ha id 1
      id: Math.max(0, ...prev.map(p => p.id)) + 1,
      checkout,
      items: order,
      total: finalTotal, 
    }]);
    setOrder([]);
  }

  // "Ritirato": tolgo l'ordine dalla lista
  function pickedUp(id: number) {
    setPickups(prev => prev.filter(p => p.id !== id));
  }

  return (
    <section className="min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="font-bold text-4xl text-center mb-8">Il bar della scuola</h1>

        <Menu order={order} onAdd={addProduct} />

        <Order order={order} total={total} onIncrease={addProduct} onDecrease={removeProduct} />

        {/* form di conferma: con l'ordine vuoto il bottone è disattivato; gli passo il totale (per il minimo con la carta) e se la ricreazione è piena */}
        <CheckoutForm total={total} disabled={order.length === 0} ricreazionePiena={numRicreazione >= 3} onSubmit={confirmOrder} />

        <PickupList pickups={pickups} onPickedUp={pickedUp} />

        {confirmed && <p className="text-center font-bold mt-6">{confirmed}</p>}
      </div>
    </section>
  )
}

export default App