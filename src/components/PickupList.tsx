import type { PickupOrder } from "../types";
import PickupRow from "./PickupRow";

// le props che PickupList riceve da App
type PickupListProps = {
    pickups: PickupOrder[]; // gli ordini da ritirare
    onPickedUp?: (id: number) => void; // la funzione che parte quando clicco "Ritirato": me la passa App
}

const PickupList = ({ pickups, onPickedUp }: PickupListProps) => {
    return (
        <div className="mt-10">
            <h2 className="font-bold text-2xl mb-3">Da ritirare</h2>

            {pickups.length === 0 && <p className="text-gray-500">Nessun ordine da ritirare</p>}

            <div className="flex flex-col gap-3">
                {pickups.map(p =>
                    <PickupRow
                        key={p.id}
                        pickup={p}
                        onPickedUp={() => onPickedUp?.(p.id)}
                    />
                )}
            </div>
        </div>
    )
}

export default PickupList