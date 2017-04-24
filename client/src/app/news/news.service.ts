import {Injectable} from "@angular/core";
import {environment} from "../constants/environment";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {News} from "../model/news";

@Injectable()
export class NewsService {

    constructor(private http: Http) {
    }

    getNewsByAuthor(id: number) {
        return this.http.get(environment.NEWS_URL + "/" + id)
            .map(response => response.json())
            .catch(this.handleError);
    }

    create(news: News) {
        const body = JSON.stringify({
            title: news.title, content: news.content, user: news.author
        });
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({headers: headers});
        return this.http.post(environment.NEWS_ADD_URL, body, options)
            .map((response: Response) => response.status === 201)
            .catch(this.handleError);
    }

    remove(id: number){
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({headers: headers});
        return this.http.delete(environment.NEWS_DELETE_URL + "/" + id, options)
            .map((response) => response.status === 200)
            .catch(this.handleError);
    }

    getNewsByFriends(id: number) {
        return this.http.get(environment.FRIENDS_NEWS_URL + "/" + id)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}