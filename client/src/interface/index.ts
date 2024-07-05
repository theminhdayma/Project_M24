
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
    status: boolean,
}

export interface Category {
    id: number,
    name: string,
    status: boolean
}

export interface ProductType {
    id: number,
    idCategory: number
    nameProduct: string,
    total: number,
    price: number
    description: string
    imageProduct: string[]
    statusProduct: boolean
}

export interface Older {
    id: number,
    idUser: number,
    idProduct: number
    quantity: number,
    price: number
    status: boolean
}

export interface Comment {
    id: number,
    idUser: number
    idProduct: number
    content: string,
    statusComment: boolean
}