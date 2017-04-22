import {User} from "./user";
interface IFriends {
    id?: number;
    friend1?: User;
    friend2?: User;
    status?: boolean;
}
export class Friends implements IFriends {
    id: number;
    friend1: User;
    friend2: User;
    status: boolean;

    constructor(obj: IFriends = {}as IFriends) {
        let {
            friend1 = null,
            friend2 = null,
            status = false,

        }:IFriends = obj as IFriends;
        this.friend1 = friend1;
        this.friend2 = friend2;
        this.status = status;

    }
}