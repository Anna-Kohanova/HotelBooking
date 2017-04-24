import {Component, OnInit} from "@angular/core";
import {User} from "../model/user";
import {LoginService} from "../authorization/login.service";

@Component({
    selector: 'admin-component',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
    currentUser: User;

    ngOnInit(): void {
        this.loadAll()
    }

    private loadAll() {
        this.currentUser = LoginService.getCurrentUser();
    }
}