import { menu } from "../data/menu";
import type { PickupOrder } from "../types";
import { formatPrice } from "../utils/formatPrice";
import Button from "./Button";

// le props che PickupRow riceve da PickupList
type PickupRowProps = {
    pickup: PickupOrder; // l'ordine da mostrare
    onPickedUp?: () => void; // la funzione che parte quando clicco "Ritirato"
}

// un ordine da ritirare: nome, classe, ritiro, prodotti, totale e il bottone "Ritirato"
const PickupRow = ({ pickup, onPickedUp }: PickupRowProps) => {
    return (
        <div className="p-4 rounded-xl border border-gray-300">
            <p className="font-bold">{pickup.checkout.nome} ({pickup.checkout.classe}), ritiro a {pickup.checkout.ritiro}</p>

            {/* i prodotti: per ognuno cerco il nome nel menu */}
            {pickup.items.map(i =>
                <p key={i.productId} className="text-gray-600">
                    {i.quantity} × {menu.find(prod => prod.id === i.productId)!.name}
                </p>
            )}

            <p className="font-semibold mt-1">Totale: {formatPrice(pickup.total)}</p>
            <Button onClick={onPickedUp} className="mt-2 w-fit">Ritirato</Button>
        </div>
    )
}

export default PickupRow