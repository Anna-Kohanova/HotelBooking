import {Component} from "@angular/core";
import {User} from "../../model/user";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../user/user.service";

@Component({
    selector: 'members-component',
    templateUrl: './members.component.html'
})

export class MembersComponent {
    id: number;
    userList: User[];
    profileUser: User;
    profileForm: FormGroup;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.loadAll()
    }

    private loadAll() {
        this.userService.loadUsers()
            .subscribe(userList => this.userList = userList);
    }

    private createEmptyForm(): void {
        this.profileForm = new FormGroup({
            firstname: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            photo: new FormControl('', Validators.required)
        });
    }

    onEdit(id: number){
        this.createEmptyForm();
        console.log(this.userList.find(user => user.id === id));
        this.profileUser = this.userList.find(user => user.id === id);
        this.profileForm.value.firstname = this.profileUser.firstname;
        this.profileForm.value.surname = this.profileUser.surname;
        this.profileForm.value.photo = this.profileUser.photo;
    }

    onSubmit() {
        this.profileUser.firstname = this.profileForm.value.firstname;
        this.profileUser.surname = this.profileForm.value.surname;
        this.profileUser.photo = this.profileForm.value.photo;
        this.userService.update(this.profileUser)
            .subscribe();
    }

    onDelete(id: number): void {
        this.userService.remove(id)
            .subscribe(result => result ? this.loadAll() : alert("Error!"),
                error => alert(error));
    }
}
