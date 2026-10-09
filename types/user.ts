export type UserRole = "admin" | "user"

export type UserListItem = {
    id: number
    firstName: string
    lastName: string
    name: string
    email: string
    company: string
    companyImageUrl?: string | null;
    role: UserRole
    status: boolean
}

export type UserListResponse = {
    data: UserListItem[]
    page: number
    perPage: number
    total: number
    totalPages: number
}

export type CreateUserInput = Pick<
    UserListItem,
    "firstName" | "lastName" | "email" | "company" | "role"
> & {
    password: string
}

export type EditUserInput = Pick<
    UserListItem,
    "firstName" | "lastName" | "email" | "company" | "role"
> & {
    password?: string
}
