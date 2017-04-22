import {Component, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {User} from "../../model/user";
import {LoginService} from "../../authorization/login.service";
import {Validators, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
    selector: 'update-profile',
    templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent implements OnInit {

    profileUser: User;
    currentUser: User;
    profileForm: FormGroup;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadData();
        this.createEmptyForm();
    }

    private createEmptyForm(): void {
        this.profileForm = new FormGroup({
            firstname: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            photo: new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        this.profileUser.firstname = this.profileForm.value.firstname;
        this.profileUser.surname = this.profileForm.value.surname;
        this.profileUser.photo = this.profileForm.value.photo;
        this.userService.update(this.profileUser)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/user']);
                } else {
                    this.router.navigate(['/user/update-profile']);
                }
            });
    }

    loadData() {
        this.currentUser = LoginService.getCurrentUser();
        this.userService.getUserByUsername(this.currentUser.username)
            .subscribe(profileList => this.profileUser = profileList);
    }
}