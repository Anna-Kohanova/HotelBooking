import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'add-hotelrooms-component',
    templateUrl: './add-hotelrooms.component.html'
})

export class AddHotelRoomsComponent {
    roomsForm: FormGroup;

    ngOnInit(): void {
        this.roomsForm = new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            rating: new FormControl('', Validators.required),
            visitors: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
        });
    }

}