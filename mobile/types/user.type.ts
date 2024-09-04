export interface UserInfo {
    password: string;
    email: string;
  }
  
  export interface IUser {
    _id: number;
    name: string;
    email: string;
    password: string;
    friends:User[]
    resetKey: string;
    resetKeyTimeStamp: string;
  }
  
  export interface User {
    name: string;
    email: string;
    password: string;
    friends:User[]
  }
  