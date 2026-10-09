"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "../../components/ui/data-table-features"
import { UserListItem } from "@/types/user"
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const USER_STATUS_COLOR = {
    active: "text-success-700 bg-success-100 border-success-700 border rounded-full",
    inactive: "text-error-700 bg-error-100 border-error-700 border rounded-full",
} as const;

export const getUserStatusBadgeProps = (status: boolean) => {
    if (status) {
        return {
            label: "เปิดใช้งาน",
            color: USER_STATUS_COLOR.active,
        };
    }

    return {
        label: "ปิดใช้งาน",
        color: USER_STATUS_COLOR.inactive,
    };
};

const columnHelper = createColumnHelper<DataTableFeatures, UserListItem>()

export const columns = columnHelper.columns([
    columnHelper.accessor("id", {
        header: () => <div className="text-sm font-semibold text-text-secondary">รหัสผู้ใช้งาน</div>,
        cell: ({ row }) => {
            const { id } = row.original;
            return <Link href={`/user/${id}`} className="text-sm font-normal text-info-500 underline">{id}</Link>
        }
    }),
    columnHelper.accessor("name", {
        header: () => <div className="text-sm font-semibold text-text-secondary">ชื่อผู้ใช้งาน</div>,
        cell: ({ row }) => {
            return <div className="text-sm font-normal text-text-secondary">{row.getValue("name")}</div>
        }
    }),
    columnHelper.accessor("role", {
        header: () => <div className="text-sm font-semibold text-text-secondary">สิทธิการใช้งาน</div>,
        cell: ({ row }) => {
            return <div className="text-sm font-normal text-text-secondary">{row.getValue("role")}</div>
        }
    }),
    columnHelper.accessor("company", {
        header: () => <div className="text-sm font-semibold text-text-secondary">บริษัท</div>,
        cell: ({ row }) => {

            const { company, companyImageUrl } = row.original;

            return <div className="flex flex-row items-center gap-2">
                <div>
                    {companyImageUrl ? (
                        <img
                            src={companyImageUrl}
                            alt={company}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-muted-foreground" />
                    )
                    }
                </div>
                <h1 className="text-sm font-normal text-text-secondary">{company}</h1>
            </div>
        }
    }),
    columnHelper.accessor("status", {
        header: () => <div className="text-sm font-semibold text-text-secondary">สถานะ</div>,
        cell: ({ row }) => {
            const { status } = row.original;
            const { label, color } = getUserStatusBadgeProps(status);

            return <Badge className={cn("text-xs", color)}>{label}</Badge>;
        }
    }),
])