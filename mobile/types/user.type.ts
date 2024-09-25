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

export enum BookmarkType {
    WISHLIST = "deseados",
    PURCHASED = "bodega",
}

export interface CreateBookmark {
    productId: number,
    userId: number;
    type: BookmarkType
}

export interface Bookmark {
    productId: number,
    bookmarkId: number,
    type: BookmarkType
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    roles: string[];
    password: string;
    resetKey: string | null;
    resetKeyTimeStamp: string | null;
    formattedBookmarks: Bookmark[];
}

export enum ProfileOption {
    PROFILE = "profile",
    WISHLIST = "wishlist",
    STORE = "store",
    PUNCTUATION = 'punctuation'
}