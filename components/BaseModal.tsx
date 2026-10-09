"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

type BaseModalProps = {
    open: boolean;
    title?: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    primaryLabel?: string | ReactNode;
    secondaryLabel?: string;
    onPrimary?: () => void | Promise<void>;
    onSecondary?: () => void;
    onOpenChange?: (open: boolean) => void;
    className?: string;
};

export function BaseModal({
    open,
    title,
    description,
    children,
    primaryLabel = "ตกลง",
    secondaryLabel = "ยกเลิก",
    onPrimary,
    onSecondary,
    onOpenChange,
    className = "",
}: BaseModalProps) {
    const [isPrimaryLoading, setIsPrimaryLoading] = useState(false);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isPrimaryLoading) {
                onSecondary?.();
                onOpenChange?.(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, isPrimaryLoading, onOpenChange, onSecondary]);

    if (!open) return null;

    const close = () => {
        if (isPrimaryLoading) return;
        onSecondary?.();
        onOpenChange?.(false);
    };

    const handlePrimary = async () => {
        if (isPrimaryLoading) return;

        setIsPrimaryLoading(true);
        try {
            await onPrimary?.();
            onOpenChange?.(false);
        } finally {
            setIsPrimaryLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
            }}
        >
            <Card
                role="dialog"
                aria-modal="true"
                aria-labelledby="base-modal-title"
                className={`w-full max-w-lg shadow-xl ${className}`}
            >
                <CardHeader>
                    {title && <CardTitle id="base-modal-title">{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
                {children && <CardContent>{children}</CardContent>}
                <CardFooter className="justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={close}
                        disabled={isPrimaryLoading}
                    >
                        {secondaryLabel}
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handlePrimary}
                        disabled={isPrimaryLoading}
                    >
                        {isPrimaryLoading ? (
                            <>
                                <Loader2 className="size-4 shrink-0 animate-spin" />
                                <span>กำลังดำเนินการ...</span>
                            </>
                        ) : (
                            primaryLabel
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
