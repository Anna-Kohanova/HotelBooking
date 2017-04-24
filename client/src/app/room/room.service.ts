import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {environment} from "../constants/environment";

@Injectable()
export class RoomService {

    constructor(private http:Http) {
    }

    loadRooms() {
        return this.http.get(environment.ROOMS_URL)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
