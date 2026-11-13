
import { menu } from "../data/menu";
import type { Category } from "../data/menu";
import { MAX_QUANTITY } from "../orderItems";
import type { OrderItem } from "../orderItems";
import ProductRow from "./ProductRow";

type MenuProps = {
    order: OrderItem[];
    onAdd: (id: number) => void;
}

// le categorie, nell'ordine in cui le mostro
const categorie: Category[] = ['panini', 'bevande', 'dolci'];

const Menu = ({ order, onAdd }: MenuProps) => {

    // quanti pezzi di questo prodotto ci sono nell'ordine (0 se non c'è)
    function quantita(id: number) {
        const item = order.find(i => i.productId === id);
        return item ? item.quantity : 0;
    }

    return (
        <div>
            {categorie.map(categoria =>
                <div key={categoria} className="mb-8">
                    <h2 className="font-bold text-2xl mb-3 capitalize">{categoria}</h2>
                    <div className="flex flex-col gap-3">
                        {menu.filter(product => product.category === categoria).map(product =>
                            <ProductRow
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                onAdd={() => onAdd(product.id)}
                                disabled={quantita(product.id) >= MAX_QUANTITY}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Menu