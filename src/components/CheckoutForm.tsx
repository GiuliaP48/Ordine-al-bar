import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import type { Checkout } from "../types";
import { cn } from "../utils/cn";

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
        classe: [] as string[], 
        note: [] as string[]
    }
}

const CheckoutForm = ({ onSubmit, disabled }: CheckoutFormProps) => {
    const [formState, setFormState] = useState(defaultState);

    function confirmCheckout(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault(); // la pagina non si ricarica

        // costruisco gli errori in una variabile, e solo alla fine li salvo nello stato
        let errors = { ...defaultState.errors };

        const nome = formState.values.nome.trim();

        // NOME
        if (!nome) {
            errors = { ...errors, nome: ['Il nome è obbligatorio'] };
        } else {
            if (nome.length < 2) {
                errors = { ...errors, nome: Array.from(new Set([...errors.nome, 'Inserisci almeno 2 caratteri'])) }
            }
            // /[0-9]/ cerca almeno un numero nel nome
            if (/[0-9]/.test(nome)) {
                errors = { ...errors, nome: Array.from(new Set([...errors.nome, 'Il nome non può contenere numeri'])) }
            }
        }

        // CLASSE
        if (!formState.values.classe) {
            errors = { ...errors, classe: ['La classe è obbligatoria'] };
        } else if (!/^[1-5][A-Z]$/.test(formState.values.classe)) {
            // ^ = inizio, [1-5] = un numero da 1 a 5, [A-Z] = una lettera maiuscola, $ = fine (quindi niente altro)
            errors = { ...errors, classe: ['Scrivi un numero da 1 a 5 e una lettera maiuscola (es. 4B)'] };
        }

        // NOTE (facoltative)
        if (formState.values.note.length > 100) {
            errors = { ...errors, note: ['Le note possono avere al massimo 100 caratteri'] };
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
                errors={formState.errors.classe}
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

            {/* note: su più righe, quindi textarea invece di Input */}
            <textarea
                placeholder="Note (facoltative)"
                value={formState.values.note}
                rows={3}
                onChange={(e) => setFormState(prev => ({
                    ...prev,
                    values: { ...prev.values, note: e.target.value },
                }))}
                className={cn("bg-gray-200 rounded-xl w-full py-2 px-4", formState.errors.note.length > 0 && "border-2 border-red-500")}
            />
            {formState.errors.note.map(err => (
                <p key={err} className="text-red-600 text-sm mt-1 px-4">{err}</p>
            ))}

            {/* questo invia il form (anche premendo Invio); con l'ordine vuoto è disattivato */}
            <Button type="submit" disabled={disabled} className="w-fit">Conferma ordine</Button>
        </form>
    )
}

export default CheckoutForm