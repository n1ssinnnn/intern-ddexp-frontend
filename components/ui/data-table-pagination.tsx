import { type ReactTable, type RowData } from "@tanstack/react-table"
import {
    ChevronLeft,
    ChevronRight,
    ChevronFirst,
    ChevronLast,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { type DataTableFeatures } from "@/components/ui/data-table-features"

interface DataTablePaginationProps<TData extends RowData> {
    table: ReactTable<DataTableFeatures, TData>
}

export function DataTablePagination<TData extends RowData>({
    table,
}: DataTablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between px-5 py-3">
            <h1 className="text-sm font-normal text-text-primary">{table.getFilteredRowModel().rows.length} รายการ</h1>
            <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-normal text-gray-700">แสดงแถว</p>
                    <Select
                        value={`${table.state.pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.state.pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-center text-sm font-normal text-gray-700">
                    {table.state.pagination.pageIndex + 1} จาก {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronFirst />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronLast />
                    </Button>
                </div>
            </div>
        </div>
    )
}
