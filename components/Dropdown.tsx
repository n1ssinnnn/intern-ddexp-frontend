"use client";

import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Option = { label: string; value: string; disabled?: boolean };

type DropdownFieldProps = {
    label: string;
    required?: boolean;
    error?: string;
    hint?: string;
    placeholder?: string;
    options: Option[];
    disabled?: boolean;
    className?: string;
    triggerClassName?: string;
    size?: "sm" | "md";
    leftIcon?: ReactNode;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
};

export default function DropdownField({
    label,
    required,
    error,
    hint,
    placeholder = "Placeholder",
    options,
    disabled,
    className,
    triggerClassName,
    size = "md",
    leftIcon,
    value,
    defaultValue,
    onValueChange,
}: DropdownFieldProps) {
    const triggerBase = cn(
        "w-full rounded-md border border-gray-300 bg-white overflow-hidden body1 text-text-primary",
        size === "sm" ? "min-h-[36px] py-1.5 px-3.5" : "min-h-[44px] py-2.5 px-3.5",
        "hover:border-primary-500 transition duration-300 placeholder:text-text-secondary",
        "focus-visible:ring-[3px] focus-visible:ring-primary-500/20 outline-none focus-visible:border-primary-500",
        "disabled:pointer-events-none",
        disabled && "text-text-disabled bg-gray-50 cursor-not-allowed",
        error &&
        "border-error-500 focus-visible:ring-error-500/30 focus-visible:border-error-500 hover:border-error-500",
        triggerClassName
    );

    return (
        <div className={cn("space-y-1 flex flex-col items-start font-noto-sans-thai", className)}>
            <Label className="leading-5 flex items-center">
                {label} {required && <span className="text-error-500">*</span>}
            </Label>

            <Select
                value={value}
                defaultValue={defaultValue}
                onValueChange={(nextValue) => onValueChange?.(nextValue ?? "")}
                disabled={disabled}
            >
                <SelectTrigger
                    size={size === "sm" ? "sm" : "default"}
                    className={cn(triggerBase, "w-full cursor-pointer data-[placeholder]:text-text-disabled")}
                    disabled={disabled}
                >
                    <span className="flex flex-1 items-center gap-2 min-w-0">
                        {leftIcon && <span className="shrink-0 text-gray-500">{leftIcon}</span>}
                        <SelectValue placeholder={placeholder} />
                    </span>
                </SelectTrigger>

                <SelectContent className="font-noto-sans-thai">
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                            className="data-highlighted:bg-gray-100 w-full cursor-pointer"
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="pt-1">
                {error ? (
                    <p className="caption text-error-500">{error}</p>
                ) : hint ? (
                    <p className="caption text-text-secondary">{hint}</p>
                ) : null}
            </div>
        </div>
    );
}
