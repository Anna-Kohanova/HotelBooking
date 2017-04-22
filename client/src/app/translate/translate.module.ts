import { NgModule }      from '@angular/core';
import {TranslateService} from "./translate.service";
import {TRANSLATION_PROVIDERS} from "./translations";
import {TranslatePipe} from "./translate.pipe";

@NgModule({
    imports:        [],
    declarations:   [TranslatePipe],
    exports:        [TranslatePipe],
})

export class TranslateModule {

    static forRoot() {
        return {
            ngModule: TranslateModule,
            providers: [TRANSLATION_PROVIDERS,
                TranslateService],
        };
    }
}