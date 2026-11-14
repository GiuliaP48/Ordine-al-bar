# Ordine al bar

Applicazione in React per ordinare al bar della scuola: scelgo i prodotti dal menu, controllo l'ordine e lo confermo con nome, classe, orario di ritiro e pagamento. Gli ordini confermati restano nella lista «Da ritirare» finché non vengono ritirati.

## Tecnologie

- React + TypeScript (Vite)
- Tailwind CSS
- clsx + tailwind-merge (funzione `cn`)

## Come avviarlo

```bash
npm install
npm run dev
```

Poi apri l'indirizzo che compare nel terminale (di solito http://localhost:5173).

## Funzionalità

### Prima parte
- Menu diviso per categoria: **panini**, **bevande**, **dolci**
- **«Aggiungi»** mette il prodotto nell'ordine
- Nell'ordine ogni prodotto ha **−** e **+**; a 0 la riga sparisce
- Massimo **5 pezzi** per prodotto
- Totale dell'ordine in euro

### Seconda parte: form di conferma (un solo stato)
- **Base**: form con nome, classe, ritiro (**ricreazione** / **pranzo**), pagamento (**contanti** / **carta**) e note; confermando compare il messaggio «Ordine per … » e ordine e form si svuotano; con l'ordine vuoto «Conferma ordine» è disattivato
- **Medio**: più errori per campo, mostrati sotto il campo:
  - nome obbligatorio, almeno 2 caratteri, senza numeri
  - classe obbligatoria: un numero da 1 a 5 e una lettera maiuscola (es. 4B)
  - note facoltative, al massimo 100 caratteri, su più righe
- **Pro**:
  - con la **carta** l'ordine minimo è **3 €**
  - contatore dei caratteri delle note («37/100»), rosso sopra 100
  - dopo il primo invio gli errori si aggiornano da soli, anche quando cambia l'ordine
- **Extra pro**:
  - lista **«Da ritirare»** con nome, classe, ritiro, prodotti e totale; **«Ritirato»** toglie l'ordine
  - al massimo **3 ordini a ricreazione**: al terzo il bottone Ricreazione si disattiva e, se era già scelto, compare un errore
  - codice sconto **BAR10** (maiuscolo o minuscolo) per il **10%** di sconto:
    - un codice sbagliato dà l'errore «Codice sconto non valido»
    - il totale scontato si vede sotto il campo prima di confermare
    - vale anche per il minimo con la carta (es. 3,00 € con BAR10 diventa 2,70 €, quindi con la carta non basta)
    - il messaggio di conferma e «Da ritirare» mostrano il totale scontato

## Note

- Il form ha **un solo stato** con i valori dei campi e `submitted`. Gli errori invece li **ricalcolo ogni volta** con `validate`, così sono sempre giusti anche quando cambia l'ordine: per esempio l'errore del minimo con la carta sparisce da solo appena aggiungo prodotti e il totale supera i 3 €.
- Nell'ordine salvo solo l'**id del prodotto** e la **quantità**; nome e prezzo li prendo dal menu.
- La regola dello sconto sta in `utils/applyDiscount.ts`, perché serve in due posti: nel form (totale scontato e minimo con la carta) e in App (messaggio e «Da ritirare»).

## Struttura

```
src/
├── components/
│   ├── Button.tsx         # bottone riutilizzabile (primary / secondary)
│   ├── CheckoutForm.tsx   # form di conferma dell'ordine
│   ├── Input.tsx          # campo di testo con gli errori sotto
│   ├── Menu.tsx           # il menu diviso per categoria
│   ├── Order.tsx          # l'ordine con − / + e il totale
│   ├── PickupList.tsx     # la lista "Da ritirare"
│   ├── PickupRow.tsx      # un ordine da ritirare
│   └── ProductRow.tsx     # un prodotto del menu
├── data/
│   └── menu.ts            # i tipi Product e Category e i prodotti
├── utils/
│   ├── applyDiscount.ts   # il codice sconto BAR10 e il calcolo del totale scontato
│   ├── cn.ts              # unisce le classi di Tailwind
│   └── formatPrice.ts     # scrive i prezzi in euro (es. 2,50 €)
├── orderItems.ts          # il tipo OrderItem e il massimo di pezzi
├── types.ts               # i tipi Checkout e PickupOrder
└── App.tsx                # stato dell'ordine e degli ordini da ritirare
```