import {Component, OnInit} from "@angular/core";
import {Room} from "../model/room";
import {RoomService} from "./room.service";

@Component({
    selector: 'room-component',
    templateUrl: './room.component.html'
})

export class RoomComponent implements OnInit {
    roomsList: Room[];

    constructor(private roomService: RoomService) {
    }

    ngOnInit(): void {
        this.loadData()
    }

    private loadData() {
        this.roomService.loadRooms()
            .subscribe(roomsList => this.roomsList = roomsList);
    }

    onBook() {
        //TODO booking logic
    }
}
