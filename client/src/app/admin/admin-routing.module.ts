import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {MembersComponent} from "./members/members.component";
import {HotelRoomsComponent} from "./hotelrooms/hotelrooms.components";
import {AddHotelRoomsComponent} from "./hotelrooms/add/add-hotelrooms.component";

const routes: Routes = [
    {
        path: 'admin', component: AdminComponent,
        children: [
            {
                path: 'members',
                component: MembersComponent
            },
            {
                path: 'hotelrooms',
                component: HotelRoomsComponent,
                children: [
                    {
                        path: 'add-hotelrooms',
                        component: AddHotelRoomsComponent
                    }
                ]
            },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}