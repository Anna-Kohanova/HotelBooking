import {Role} from "./role";

interface IUser {
    id?: number;
    username?: string;
    password?: string;
    firstname?: string;
    surname?: string;
    photo?: string;
}
export class User implements IUser {
    id: number;
    username: string;
    password: string;
    firstname: string;
    surname: string;
    photo: string;
    roles: Role[];
    token: string;

    constructor(obj: IUser = {}as IUser) {
        let {
            username = '0',
            password = '0',
            firstname = '0',
            surname = '0',
            photo = '0'
        }:IUser = obj as IUser;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.surname = surname;
        this.photo = photo;
    }
}