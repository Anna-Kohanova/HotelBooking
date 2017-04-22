import {Injectable, Inject} from '@angular/core';
import { TRANSLATIONS } from './translations';

@Injectable()
export class TranslateService {
    private curentLang: string;

    public get currentLang() {
        return this.curentLang;
    }

    constructor(@Inject(TRANSLATIONS) private translations: any) {
    }

    public use(lang: string): void {
        this.curentLang = lang;
    }

    private translate(key: string): string {
        let translation = key;

        if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
            return this.translations[this.currentLang][key];
        }

        return translation;
    }

    public instant(key: string) {
        return this.translate(key);
    }
}