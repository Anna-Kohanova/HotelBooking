import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {User} from "../model/user";
import {Role} from "../model/role";

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error: string = '';
    role_admin: string = "ROLE_ADMIN";
    roles: Role[];

    constructor(private loginService: LoginService, private router: Router) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
        this.loginService.logout();
    }

    onSubmit() {
        this.loginService.login(new User({username:this.loginForm.value.username,
            password:this.loginForm.value.password}))
            .subscribe(
                result => {
                    if (result === true) {
                        this.roles = LoginService.getCurrentUser().roles;
                        if (this.roles.find(role => role.type === this.role_admin)) {
                            this.router.navigate(['/admin']);
                        } else {
                            this.router.navigate(['/user']);
                        }
                    } else {
                        this.error = 'Authentification error!';
                        this.router.navigate(['/login']);
                    }
                }
            );
    }
    reset() {
        this.loginForm.reset();
    }

}