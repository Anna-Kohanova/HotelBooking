import {Component, OnInit} from "@angular/core";
import {UserService} from "./user.service";
import {User} from "../model/user";
import {LoginService} from "../authorization/login.service";

@Component({
    selector: 'user-component',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    profileUser: User;
    currentUser: User;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.loadData()
    }

    loadData() {
        this.currentUser = LoginService.getCurrentUser();
        this.userService.getUserByUsername(this.currentUser.username)
            .subscribe(profileList => this.profileUser = profileList);
    }
}

