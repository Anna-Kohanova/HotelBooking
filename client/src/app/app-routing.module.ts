import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./authorization/login.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {NotFoundComponent} from "./notfound/not-found.component";

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    //{path: 'admin', component: AdminComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}