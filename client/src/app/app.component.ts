import {Component, OnInit} from '@angular/core';
import {environment} from "./constants/environment";
import {User} from "./model/user";
import {TranslateService} from "./translate/translate.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    public translatedText: string;
    public supportedLangs: any[];
    showLink: boolean;
    public currentUser: User;

    constructor(private _translate: TranslateService) { }

    ngOnInit(): void {
        this.supportedLangs = [
            { display: 'English', value: 'en' },
            { display: 'Русский', value: 'ru' },
        ];

        this.selectLang('en');

        if (this.currentUser != null) {
            this.showLink = true;
        }
    }

    isCurrentLang(lang: string) {
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        this._translate.use(lang);
        this.refreshText();
    }

    refreshText() {
        this.translatedText = this._translate.instant('hello');
    }

    logout(): void {
        localStorage.removeItem(environment.USER_CONST);
    }
}
