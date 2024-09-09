export interface UserInfo {
    email: string;
    password: string;
}

export interface UserInfoRegister {
    username: string;
    email: string;
    password: string
}

export interface UserInfoRecover {
    email: string
}

export interface IUser {
    _id: number,
    documento: string,
    nombre: string,
    username: string,
    pass: string,
    accountId: string,
    email: string,
    telefono: string,
    resetKey: string,
    resetKeyTimeStamp: string
}

export interface User {
    documento: string,
    nombre: string,
    username: string,
    pass: string,
    accountId: string,
    email: string,
    telefono: string,
    isActive: boolean
}