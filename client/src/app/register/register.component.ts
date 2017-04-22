import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../user/user.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";

@Component({
    selector: 'register-component',
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    userForm: FormGroup;
    error: string = '';

    constructor(private userService: UserService, private router: Router) {
    }


    ngOnInit(): void {
        this.userForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            firstname: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        this.userService.create(new User({username:this.userForm.value.username,
            password:this.userForm.value.password,
            firstname:this.userForm.value.firstname,
            surname:this.userForm.value.surname}))
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/user']);
                } else {
                    this.router.navigate(['/register']);
                }
            });
    }

    reset() {
        this.userForm.reset();
    }

}
