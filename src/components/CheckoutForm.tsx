import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import type { Checkout } from "../types";
import { cn } from "../utils/cn";

// le props che CheckoutForm riceve da App
type CheckoutFormProps = {
    onSubmit?: (data: Checkout) => void;
    disabled: boolean; // true quando l'ordine è vuoto: "Conferma ordine" non si può premere
    total: number; // il totale dell'ordine: serve per il minimo di 3 € con la carta
}

// nessun errore:
const emptyErrors = {
    nome: [] as string[],
    classe: [] as string[],
    pagamento: [] as string[],
    note: [] as string[]
}

// un solo stato: i valori e se il form è già stato inviato
const defaultState = {
    values: {
        nome: "",
        classe: "",
        ritiro: 'ricreazione',
        pagamento: 'contanti',
        note: "",
    } as Checkout,
    submitted: false, // diventa true al primo invio: da lì gli errori si aggiornano da soli
}

const CheckoutForm = ({ onSubmit, disabled, total }: CheckoutFormProps) => {
    const [formState, setFormState] = useState(defaultState);

    // controlla i valori e restituisce gli errori di ogni campo
    function validate(values: Checkout) {
        let errors = { ...emptyErrors };
        const nome = values.nome.trim();

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
        if (!values.classe) {
            errors = { ...errors, classe: ['La classe è obbligatoria'] };
        } else if (!/^[1-5][A-Z]$/.test(values.classe)) {
            // ^ = inizio, [1-5] = un numero da 1 a 5, [A-Z] = una lettera maiuscola, $ = fine (quindi niente altro)
            errors = { ...errors, classe: ['Scrivi un numero da 1 a 5 e una lettera maiuscola (es. 4B)'] };
        }

        // PAGAMENTO: con la carta il minimo è 3 €
        if (values.pagamento === 'carta' && total < 3) {
            errors = { ...errors, pagamento: ['Con la carta l\'ordine minimo è 3,00 €'] };
        }

        // NOTE (facoltative)
        if (values.note.length > 100) {
            errors = { ...errors, note: ['Le note possono avere al massimo 100 caratteri'] };
        }

        return errors;
    }

    // prima del primo invio nessun errore, dopo li ricalcolo a ogni modifica (anche quando cambia l'ordine)
    const errors = formState.submitted ? validate(formState.values) : emptyErrors;

    function confirmCheckout(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault(); // la pagina non si ricarica

        // se almeno un campo ha errori, mi fermo
        // submitted: true --> da adesso gli errori si vedono e si aggiornano da soli
        if (Object.values(validate(formState.values)).some(arr => arr.length)) {
            setFormState(prev => ({ ...prev, submitted: true }));
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
                errors={errors.nome}
            />

            <Input
                placeholder="Classe (es. 4B)"
                value={formState.values.classe}
                onChange={(valore) => setFormState(prev => ({
                    ...prev,
                    values: { ...prev.values, classe: valore },
                }))}
                errors={errors.classe}
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
            {errors.pagamento.map(err => (
                <p key={err} className="text-red-600 text-sm mt-1 px-4">{err}</p>
            ))}

            {/* note: su più righe, quindi textarea invece di Input */}
            <textarea
                placeholder="Note (facoltative)"
                value={formState.values.note}
                rows={3}
                onChange={(e) => setFormState(prev => ({
                    ...prev,
                    values: { ...prev.values, note: e.target.value },
                }))}
                className={cn("bg-gray-200 rounded-xl w-full py-2 px-4",errors.note.length > 0 && "border-2 border-red-500")}
            />
            {/* contatore dei caratteri: rosso sopra 100 */}
            <p className={cn("text-sm px-4 text-gray-500", formState.values.note.length > 100 && "text-red-600")}>
                {formState.values.note.length}/100
            </p>

            {errors.note.map(err => (
                <p key={err} className="text-red-600 text-sm mt-1 px-4">{err}</p>
            ))}

            {/* questo invia il form (anche premendo Invio); con l'ordine vuoto è disattivato */}
            <Button type="submit" disabled={disabled} className="w-fit">Conferma ordine</Button>
        </form>
    )
}

export default CheckoutForm