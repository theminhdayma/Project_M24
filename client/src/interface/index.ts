
export interface User {
    id: number,
    name: string,
    age: number
    address: string
    numberPhone: string,
    email: string,
    password: string,
    image: string
    role: number,
    created_at: string
    updated_at: string
    status: boolean,
}

export interface Category {
    id: number,
    name: string,
    products: []
    description: string
    created_at: string
    status: boolean
}

export interface ProductType {
    id: number,
    idCategory: number
    brand: string
    name: string,
    total: number,
    price: number
    purchaseCount: number
    description: string
    imageProduct: string[]
    created_at: string
    updated_at: string
    statusProduct: boolean
}

export interface Orders {
    id: number,
    idUser: number,
    idProduct: number
    order_at: string
    quantity: number,
    price: number
    note: string
    order_details: []
    created_at: string
    updated_at: string
    status: boolean
}

export interface OrderDetails {
    id: number,
    idProduct: number
    name: string
    price: number
    quantity: number
}

export interface Comment {
    id: number,
    idUser: number
    idProduct: number
    content: string,
    statusComment: boolean
}