
import { menu } from "../data/menu";
import { MAX_QUANTITY } from "../orderItems";
import type { OrderItem } from "../orderItems";
import { formatPrice } from "../utils/formatPrice";
import Button from "./Button";

type OrderProps = {
    order: OrderItem[];
    total: number;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
}

const Order = ({ order, total, onIncrease, onDecrease }: OrderProps) => {

    // trova nel menu il prodotto con questo id (il ! dice che esiste di sicuro)
    function getProduct(id: number) {
        return menu.find(p => p.id === id)!;
    }

    return (
        <div>
            <h2 className="font-bold text-2xl mb-3">Il tuo ordine</h2>

            {order.length === 0 && <p className="text-gray-500">L'ordine è vuoto</p>}

            <div className="flex flex-col gap-3">
                {order.map(item =>
                    <div key={item.productId} className="flex items-center justify-between">
                        <p className="font-semibold flex-1">{getProduct(item.productId).name}</p>
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" className="px-3 py-1" onClick={() => onDecrease(item.productId)}>−</Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button
                                variant="secondary"
                                className="px-3 py-1"
                                onClick={() => onIncrease(item.productId)}
                                disabled={item.quantity >= MAX_QUANTITY}
                            >+</Button>
                        </div>
                        {/* prezzo della riga = prezzo × quantità */}
                        <p className="w-20 text-right">{formatPrice(getProduct(item.productId).price * item.quantity)}</p>
                    </div>
                )}
            </div>

            <p className="text-right font-bold mt-4 pt-3 border-t border-gray-300">Totale: {formatPrice(total)}</p>
        </div>
    )
}

export default Order