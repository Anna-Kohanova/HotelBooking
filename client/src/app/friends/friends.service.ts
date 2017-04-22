import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {environment} from "../constants/environment";

@Injectable()
export class FriendsService {

    constructor(private http: Http) {
    }

    getFriendsById(id: number) {
        return this.http.get(environment.FRIENDS_URL + "/" + id)
            .map(response => response.json())
            .catch(this.handleError);
    }

    create(current_id: number, friend_id: number) {
        const body = JSON.stringify({
            current_id: current_id,
            friend_id: friend_id
        });
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({headers: headers});
        console.log(body);
        return this.http.post(environment.FRIENDS_ADD_URL, body, options)
            .map((response: Response) => response.status === 201)
            .catch(this.handleError);
    }

    update(current_id: number, friend_id: number) {
        const body = JSON.stringify({
            current_id: current_id,
            friend_id: friend_id
        });
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({headers: headers});
        return this.http.put(environment.FRIENDS_CONFIRM_URL, body, options)
            .map((response: Response) => response.status === 200)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}