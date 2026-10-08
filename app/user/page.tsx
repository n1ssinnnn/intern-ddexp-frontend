"use client";

import { Button } from "@/components/ui/button";
import { MOCK_DATA, UserList } from "@/types/user";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";

function getData(): UserList[] {
    return MOCK_DATA
}

export default function UserListPage() {
    const data = getData();

    return (
        <>
            <div className="flex flex-col mt-10 mx-10 gap-5 bg-background p-5">
                <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-semibold text-text-primary">จัดการผู้ใช้งาน</h1>
                    <Button>เพิ่มผู้ใช้งาน</Button>
                </div>
                <div>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </>
    );
}