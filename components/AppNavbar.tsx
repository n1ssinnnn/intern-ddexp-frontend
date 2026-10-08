import { usePathname } from "next/navigation";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";

const PAGE_TITLES: Record<string, string> = {
    "/": "หน้าหลัก",
    "/user": "จัดการผู้ใช้งาน"
}

function getPageTitle(pathname: string): string {
    if (PAGE_TITLES[pathname]) {
        return PAGE_TITLES[pathname];
    }

    const matchedKey = Object.keys(PAGE_TITLES)
        .filter((key) => key !== "/")
        .sort((a, b) => b.length - a.length)
        .find((key) => pathname.startsWith(key));

    return matchedKey ? PAGE_TITLES[matchedKey] : "Backoffice";
}

type AppNavbarProps = {
    title?: string;
};

function UserMenu() {
    // const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="group flex shrink-0 items-center rounded-md border-0 bg-transparent outline-none hover:opacity-80 focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end gap-1">
                                <p className="body1 font-semibold text-primary-500">Thanva</p>
                                <p className="body2 text-text-secondary">DDEXP</p>
                            </div>
                            <ChevronDown className="size-4 shrink-0 cursor-pointer text-primary-500 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180 hover:text-primary-600" />
                        </div>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer"
                    // onClick={() => setIsLogoutConfirmOpen(true)}
                    >
                        <LogOut className="size-4" />
                        ออกจากระบบ
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* <LogoutConfirmModal
                open={isLogoutConfirmOpen}
                onOpenChange={setIsLogoutConfirmOpen}
            /> */}
        </>
    );
}

export function AppNavbar({ title }: Readonly<AppNavbarProps>) {
    const pathname = usePathname();
    const pageTitle = title ?? getPageTitle(pathname || "/");

    return (
        <>
            <div className="sticky top-5 mx-10">
                <header className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-2xl">
                    <h1 className="text-xl font-semibold text-text-primary">{pageTitle}</h1>
                    <UserMenu />
                </header>
            </div>
        </>
    )

}