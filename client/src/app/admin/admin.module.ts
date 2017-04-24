import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminService} from "./admin.service";
import {AdminComponent} from "./admin.component";
import {LoginService} from "../authorization/login.service";
import {AdminRoutingModule} from "./admin-routing.module";
import {TranslateModule} from "../translate/translate.module";
import {MembersComponent} from "./members/members.component";
import {HotelRoomsComponent} from "./hotelrooms/hotelrooms.components";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule.forRoot()
    ],
    declarations: [
        AdminComponent,
        MembersComponent,
        HotelRoomsComponent
    ],
    providers: [
        LoginService,
        AdminService
    ]
})
export class AdminModule {
}