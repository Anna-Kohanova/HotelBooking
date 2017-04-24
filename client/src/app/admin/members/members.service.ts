import {Injectable} from "@angular/core";
import {User} from "../../model/user";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {environment} from "../../constants/environment";

@Injectable()
export class MembersService {
    public currentUser: User;

    constructor(private http: Http) {
    }

    loadUsers(){
        return this.http.get(environment.USERS_URL)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    update(user: User) {
        const body = JSON.stringify({
            id: user.id, username: user.username, password: user.password,
            firstname: user.firstname, surname: user.surname, photo: user.photo
        });
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({headers: headers});
        return this.http.put(environment.USER_UPDATE_URL, body, options)
            .map((response: Response) => response.status === 200)
            .catch(this.handleError);
    }

    remove(id: number){
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({headers: headers});
        return this.http.delete(environment.USER_DELETE_URL + "/" + id, options)
            .map((response) => response.status === 200)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}