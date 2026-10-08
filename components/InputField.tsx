import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputHTMLAttributes, ReactNode, useMemo } from "react"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    rightIcon?: ReactNode;
    sizeBox?: "sm" | "md";
    maxCharacters?: number;
    showCharCount?: boolean;
}

export function InputField({
    id,
    type = "text",
    name,
    placeholder,
    value,
    label,
    error,
    readOnly,
    disabled,
    rightIcon,
    className,
    required,
    sizeBox = "md",
    maxCharacters,
    showCharCount = true,
    children,
    onKeyDown,
    onChange,
    onPaste,
    ...props
}: InputFieldProps) {

    const enforceMaxLength = (text: string) =>
        maxCharacters != null ? text.slice(0, maxCharacters) : text;

    const handleChange = useMemo(() => {
        if (maxCharacters == null) return onChange;
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const next = enforceMaxLength(e.target.value);
            e.target.value = next;
            onChange?.(e);
        };
    }, [onChange, maxCharacters]);

    const currentLength = typeof value === "string" ? value.length : 0;
    const charCountLabel =
        showCharCount && maxCharacters != null
            ? `${currentLength}/${maxCharacters}`
            : null;

    const sizeClass =
        sizeBox === "sm"
            ? "min-h-[36px] py-1.5 px-3.5"
            : "min-h-[44px] py-2.5 px-3.5";

    return (
        <Field className={className}>
            {label && <FieldLabel htmlFor={id} className="font-semibold text-gray-700">{label} {required && <span className="text-error-500">*</span>}</FieldLabel>}

            <div className="relative flex items-center bg-white">
                <Input
                    id={id}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    readOnly={readOnly}
                    disabled={disabled}
                    required={required}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
                    onPaste={onPaste}
                    className={`${sizeClass} ${error ? "border-error-500 focus-visible:ring-error-500/30 focus-visible:border-error-500 hover:border-error-500" : ""}`}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute right-3 pointer-events-none">
                        {rightIcon}
                    </div>
                )}
            </div>

            {error && <FieldDescription className="text-red-500">{error}</FieldDescription>}
            {charCountLabel && (
                <FieldDescription className="text-right text-xs text-gray-400">
                    {charCountLabel}
                </FieldDescription>
            )}
        </Field>
    )
}
