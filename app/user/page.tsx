"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";

export default function UserListPage() {

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const { users, isLoading, error } = useUser();
    if (isLoading) return <p>Loading…</p>;
    if (error) return <p>{error.message}</p>;
    if (!users) return <p>User not found.</p>;

    return (
        <>
            <div className="flex flex-col mx-10 gap-5 bg-background">
                <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-semibold text-text-primary">จัดการผู้ใช้งาน</h1>
                    <Link href="/user/create">
                        <Button><Plus />เพิ่มผู้ใช้งาน</Button>
                    </Link>
                </div>
                <div>
                    <DataTable data={users ?? []} columns={columns} />
                </div>
            </div>
        </>
    );
}