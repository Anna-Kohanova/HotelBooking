interface IRoom {
    id?: number;
    name?: string;
    number?: number;
    visitors?: number;
    price?: number;
    rating?: number;
    description?: string;
}
export class Room implements IRoom {
    id:number;
    name:string;
    number:number;
    visitors:number;
    price:number;
    rating:number;
    description:string;

    constructor(obj:IRoom = {} as IRoom) {
        let {
            name = '0',
            number = 0,
            visitors = 0,
            price = 0,
            rating = 0,
            description = '0'
            }:IRoom = obj as IRoom;
        this.name = name;
        this.number = number;
        this.visitors = visitors;
        this.price = price;
        this.rating = rating;
        this.description = description;
    }
}