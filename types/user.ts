export type UserRole = "admin" | "user"

export type UserList = {
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

export const MOCK_DATA: UserList[] = [
    {
        id: 1,
        firstName: "Thanva",
        lastName: "Yuenthon",
        name: "Thanva Yuenthon",
        email: "example@gmail.com",
        company: "DDEXP",
        companyImageUrl: "",
        role: "admin",
        status: true
    },
    {
        id: 2,
        firstName: "Tanu",
        lastName: "Tuna",
        name: "Tanu Tuna",
        email: "example1@gmail.com",
        company: "DDEXP",
        companyImageUrl: "",
        role: "user",
        status: true
    },
    {
        id: 2,
        firstName: "Tanu",
        lastName: "Tuna",
        name: "Tanu Tuna",
        email: "example1@gmail.com",
        company: "DDEXP",
        companyImageUrl: "",
        role: "user",
        status: true
    },
    {
        id: 2,
        firstName: "Tanu",
        lastName: "Tuna",
        name: "Tanu Tuna",
        email: "example1@gmail.com",
        company: "DDEXP",
        companyImageUrl: "",
        role: "user",
        status: true
    },
    {
        id: 2,
        firstName: "Tanu",
        lastName: "Tuna",
        name: "Tanu Tuna",
        email: "example1@gmail.com",
        company: "DDEXP",
        companyImageUrl: "",
        role: "user",
        status: true
    },
    {
        id: 2,
        firstName: "Tanu",
        lastName: "Tuna",
        name: "Tanu Tuna",
        email: "example1@gmail.com",
        company: "DDEXP",
        companyImageUrl: "",
        role: "user",
        status: true
    },
    {
        id: 2,
        firstName: "Tanu",
        lastName: "Tuna",
        name: "Tanu Tuna",
        email: "example1@gmail.com",
        company: "DDEXP",
        companyImageUrl: "",
        role: "user",
        status: true
    },
    {
        id: 2,
        firstName: "Tanu",
        lastName: "Tuna",
        name: "Tanu Tuna",
        email: "example1@gmail.com",
        company: "DDEXP",
        companyImageUrl: "",
        role: "user",
        status: true
    },
    {
        id: 2,
        firstName: "Tanu",
        lastName: "Tuna",
        name: "Tanu Tuna",
        email: "example1@gmail.com",
        company: "DDEXP",
        companyImageUrl: "",
        role: "user",
        status: true
    },
    {
        id: 2,
        firstName: "Tanu",
        lastName: "Tuna",
        name: "Tanu Tuna",
        email: "example1@gmail.com",
        company: "DDEXP",
        companyImageUrl: "",
        role: "user",
        status: true
    }
]