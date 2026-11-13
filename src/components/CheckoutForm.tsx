import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import type { Checkout } from "../types";

// le props che CheckoutForm riceve da App
type CheckoutFormProps = {
    onSubmit?: (data: Checkout) => void;
    disabled: boolean; // true quando l'ordine è vuoto: "Conferma ordine" non si può premere
}

// un solo stato: valori ed errori insieme
const defaultState = {
    values: {
        nome: "",
        classe: "",
        ritiro: 'ricreazione',
        pagamento: 'contanti',
        note: "",
    } as Checkout,
    errors: {
        nome: [] as string[],
    }
}

const CheckoutForm = ({ onSubmit, disabled }: CheckoutFormProps) => {
    const [formState, setFormState] = useState(defaultState);

    function confirmCheckout(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault(); // la pagina non si ricarica

        // costruisco gli errori in una variabile, e solo alla fine li salvo nello stato
        let errors = { ...defaultState.errors };

        // uso trim() per togliere gli spazi all'inizio e alla fine: così un nome fatto solo di spazi conta come vuoto
        if (!formState.values.nome.trim()) {
            errors = { ...errors, nome: ['Il nome è obbligatorio'] };
        }

        // se almeno un campo ha errori, li mostro e mi fermo
        if (Object.values(errors).some(arr => arr.length)) {
            setFormState(prev => ({ ...prev, errors }));
            return;
        }

        // reset del form e passo i dati ad App
        setFormState(defaultState);
        onSubmit?.({ ...formState.values, nome: formState.values.nome.trim() });
    }

    return (
        <form onSubmit={confirmCheckout} className="flex flex-col gap-3 mt-6">
            <Input
                placeholder="Nome per il ritiro"
                value={formState.values.nome}
                onChange={(valore) => setFormState(prev => ({
                    ...prev,
                    values: { ...prev.values, nome: valore },
                }))}
                errors={formState.errors.nome}
            />

            <Input
                placeholder="Classe (es. 4B)"
                value={formState.values.classe}
                onChange={(valore) => setFormState(prev => ({
                    ...prev,
                    values: { ...prev.values, classe: valore },
                }))}
            />

            {/* ritiro: questi due NON inviano il form */}
            <div className="flex gap-2">
                <Button
                    variant={formState.values.ritiro === 'ricreazione' ? 'primary' : 'secondary'}
                    onClick={() => setFormState(prev => ({ ...prev, values: { ...prev.values, ritiro: 'ricreazione' } }))}
                >
                    Ricreazione
                </Button>
                <Button
                    variant={formState.values.ritiro === 'pranzo' ? 'primary' : 'secondary'}
                    onClick={() => setFormState(prev => ({ ...prev, values: { ...prev.values, ritiro: 'pranzo' } }))}
                >
                    Pranzo
                </Button>
            </div>

            {/* pagamento: anche questi due NON inviano il form */}
            <div className="flex gap-2">
                <Button
                    variant={formState.values.pagamento === 'contanti' ? 'primary' : 'secondary'}
                    onClick={() => setFormState(prev => ({ ...prev, values: { ...prev.values, pagamento: 'contanti' } }))}
                >
                    Contanti
                </Button>
                <Button
                    variant={formState.values.pagamento === 'carta' ? 'primary' : 'secondary'}
                    onClick={() => setFormState(prev => ({ ...prev, values: { ...prev.values, pagamento: 'carta' } }))}
                >
                    Carta
                </Button>
            </div>

            <Input
                placeholder="Note"
                value={formState.values.note}
                onChange={(valore) => setFormState(prev => ({
                    ...prev,
                    values: { ...prev.values, note: valore },
                }))}
            />

            {/* questo invia il form (anche premendo Invio); con l'ordine vuoto è disattivato */}
            <Button type="submit" disabled={disabled} className="w-fit">Conferma ordine</Button>
        </form>
    )
}

export default CheckoutForm