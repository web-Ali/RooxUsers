type AddressType ={
    city: string
    street: string
    zipcode: string
}
type CompanyType ={
    name: string
}
export type SortType = 'city' | 'name' | 'company' | null

export type UserType = {
    id: number
    name: string
    address: AddressType
    company: CompanyType
    username: string
    email: string
    phone: string
    website: string
    mail: string
}