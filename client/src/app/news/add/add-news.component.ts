import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NewsService} from "../news.service";
import {News} from "../../model/news";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {LoginService} from "../../authorization/login.service";

@Component({
    selector: 'add-news',
    templateUrl: './add-news.component.html'
})
export class AddNewsComponent{
    newsForm: FormGroup;
    currentUser: User;

    constructor(private newsService: NewsService, private router: Router){}

    ngOnInit(): void {
        this.newsForm = new FormGroup({
            title: new FormControl('', Validators.required),
            content: new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        this.currentUser = LoginService.getCurrentUser();
        this.newsService.create(new News({title:this.newsForm.value.title,
            content:this.newsForm.value.content, author:this.currentUser}))
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['../user/news']);
                } else {
                    this.router.navigate(['/user']);
                }
            });
    }

    reset() {
        this.newsForm.reset();
    }
}