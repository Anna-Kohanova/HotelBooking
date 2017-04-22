import {Component, OnInit} from "@angular/core";
import {LoginService} from "../authorization/login.service";
import {User} from "../model/user";
import {NewsService} from "./news.service";
import {News} from "../model/news";

@Component({
    selector: 'news-component',
    templateUrl: './news.component.html'
})
export class NewsComponent  implements OnInit  {

    currentUser: User;
    newsList: News[];

    constructor(private newsService: NewsService) {
    }

    ngOnInit(): void {
        this.loadData()
    }

    private loadData() {
        this.currentUser = LoginService.getCurrentUser();
        this.newsService.getNewsByAuthor(this.currentUser.id)
            .subscribe(newsList => this.newsList = newsList);
    }

    onDelete(id: number): void {
        this.newsService.remove(id)
            .subscribe(result => result ? this.loadData() : alert("Error!"),
                error => alert(error));
    }
}
