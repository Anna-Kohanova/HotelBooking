import {Component, OnInit} from "@angular/core";
import {Room} from "../../model/room";
import {RoomService} from "../../room/room.service";

@Component({
    selector: 'hotelrooms-component',
    templateUrl: './hotelrooms.component.html'
})

export class HotelRoomsComponent implements OnInit {
    roomsList: Room[];

    constructor(private roomsService: RoomService) {
    }

    public ngOnInit(): void {
        this.loadData();
    }

    private loadData() {
        this.roomsService.loadRooms()
            .subscribe(roomsList => this.roomsList = roomsList);
    }
}
