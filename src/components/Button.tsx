import { cn } from "../utils/cn";

type ButtonProps = {
    children: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary'; // primary = blu, secondary = grigio
    disabled?: boolean;
    className?: string; // classi in più, per esempio per i bottoni piccoli + e −
    type?: 'button' | 'submit'; // submit = invia il form, button = non lo invia
}

const Button = ({ children, onClick, variant = 'primary', disabled, className, type = 'button' }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "px-5 py-2 rounded-full font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
                variant === 'primary' ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800",
                className
            )}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button