import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RoomService} from "../../../room/room.service";
import {Room} from "../../../model/room";

@Component({
    selector: 'add-hotelrooms-component',
    templateUrl: './add-hotelrooms.component.html'
})

export class AddHotelRoomsComponent {
    roomsForm: FormGroup;

    constructor(private roomService: RoomService, private router: Router){}

    ngOnInit(): void {
        this.roomsForm = new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            rating: new FormControl('', Validators.required),
            visitors: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        this.roomService.create(new Room({name:this.roomsForm.value.name, visitors:this.roomsForm.value.visitors,
            price:this.roomsForm.value.price, rating:this.roomsForm.value.rating, description:this.roomsForm.value.description}))
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['../admin/hotelrooms']);
                } else {
                    this.router.navigate(['/admin']);
                }
            });
    }

    reset() {
        this.roomsForm.reset();
    }
}