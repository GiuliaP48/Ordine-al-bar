
import { formatPrice } from "../utils/formatPrice";
import Button from "./Button";

type ProductRowProps = {
    name: string;
    price: number;
    onAdd: () => void; // la funzione che parte quando clicco "Aggiungi": me la passa Menu
    disabled: boolean; // true quando di questo prodotto ce ne sono già 5 nell'ordine
}

const ProductRow = ({ name, price, onAdd, disabled }: ProductRowProps) => {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-300">
            <div>
                <p className="font-semibold">{name}</p>
                <p className="text-gray-500 text-sm">{formatPrice(price)}</p>
            </div>
            <Button onClick={onAdd} disabled={disabled}>Aggiungi</Button>
        </div>
    )
}

export default ProductRow