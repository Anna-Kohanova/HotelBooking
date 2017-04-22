import {Component, OnInit} from "@angular/core";
import {NewsService} from "../news.service";
import {News} from "../../model/news";
import {User} from "../../model/user";
import {LoginService} from "../../authorization/login.service";
@Component({
    selector: 'friends-news',
    templateUrl: './friends-news.component.html'
})
export class FriendsNewsComponent  implements OnInit  {

    currentUser: User;
    newsList: News[];

    constructor(private newsService: NewsService) {
    }

    ngOnInit(): void {
        this.loadData()
    }

    private loadData() {
        this.currentUser = LoginService.getCurrentUser();
        this.newsService.getNewsByFriends(this.currentUser.id)
            .subscribe(newsList => this.newsList = newsList);
    }
}