import {Component, OnInit} from "@angular/core";
import {LoginService} from "../authorization/login.service";
import {User} from "../model/user";
import {FriendsService} from "./friends.service";
import {Friends} from "../model/friends";
@Component({
    selector: 'friends-component',
    templateUrl: './friends.component.html'
})
export class FriendsComponent  implements OnInit  {

    currentUser: User;
    friendsList: Friends[];


    constructor(private friendsService: FriendsService) {
    }

    ngOnInit(): void {
        this.loadData()
    }

    private loadData() {
        this.currentUser = LoginService.getCurrentUser();
        console.log(this.currentUser.id);
        this.friendsService.getFriendsById(this.currentUser.id)
            .subscribe(friendsList => this.friendsList = friendsList);
    }
}
