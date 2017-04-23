import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {UpdateProfileComponent} from "./update/update-profile.component";
import {NewsComponent} from "../news/news.component";
import {AddNewsComponent} from "../news/add/add-news.component";
import {FriendsComponent} from "../friends/friends.component";
import {SearchFriendsComponent} from "../friends/search/search-friends.component";
import {RequestComponent} from "../friends/request/request.component";
import {FriendsNewsComponent} from "../news/friends-news/friends-news.component";
import {RoomComponent} from "../room/room.component";
const routes: Routes = [
    {
        path: 'user', component: UserComponent,
        children: [
            {
                path: 'update-profile',
                component: UpdateProfileComponent
            },
            {
                path: 'friends',
                component: FriendsComponent
            },
            {
                path: 'search',
                component: SearchFriendsComponent
            },
            {
                path: 'request',
                component: RequestComponent
            },
            {
                path: 'news',
                component: NewsComponent,
                children: [
                    {
                        path: 'add-news',
                        component: AddNewsComponent
                    }
                ]
            },
            {
                path: 'friends-news',
                component: FriendsNewsComponent
            },
            {
                path: 'room',
                component: RoomComponent
            },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}