import {Component, OnInit} from "@angular/core";
import {User} from "../../model/user";
import {LoginService} from "../../authorization/login.service";
import {UserService} from "../../user/user.service";
import {FriendsService} from "../friends.service";
import {Router} from "@angular/router";
@Component({
    selector: 'request-friends',
    templateUrl: './request.component.html'
})
export class RequestComponent   implements OnInit {
    public currentUser: User;
    requestList: User[];

    constructor(private userService: UserService,
                private friendsService: FriendsService,
                private router: Router) { }

    ngOnInit(): void {
        this.loadData()
    }

    private loadData() {
        this.currentUser = LoginService.getCurrentUser();
        this.userService.loadRequestedUsers(this.currentUser.id)
            .subscribe(requestList => this.requestList = requestList);
    }

    onSubmit(id: number){
        this.currentUser = LoginService.getCurrentUser();
        this.friendsService.update(id, this.currentUser.id)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/user/friends']);
                } else {
                    this.router.navigate(['/request']);
                }
            });
    }
}
