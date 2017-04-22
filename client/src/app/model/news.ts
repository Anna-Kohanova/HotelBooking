import {User} from "./user";
interface INews {
    id?: number;
    title?: string;
    content?: string;
    author?: User;
    date?: Date;
}

export class News implements INews {
    id: number;
    title: string;
    content: string;
    author: User;
    date: Date;

    constructor(obj: INews = {}as INews) {
        let {
            title = '0',
            content = '0',
            author = null,

        }:INews = obj as INews;
        this.title = title;
        this.content = content;
        this.author = author;
    }
}