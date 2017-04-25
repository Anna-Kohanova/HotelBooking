import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {environment} from "../constants/environment";
import {Room} from "../model/room";

@Injectable()
export class RoomService {

    constructor(private http:Http) {
    }

    loadRooms() {
        return this.http.get(environment.ROOMS_URL)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    create(room: Room) {
        const body = JSON.stringify({
            name: room.name, visitors: room.visitors, price: room.price, rating: room.rating, description: room.description
        });
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({headers: headers});
        return this.http.post(environment.ROOMS_ADD_URL, body, options)
            .map((response: Response) => response.status === 201)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
