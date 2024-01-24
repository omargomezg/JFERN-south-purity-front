import {Component, OnInit} from '@angular/core';
import {CommonClientService} from "../../service/common-client.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";
import {PlaceInterface} from "../../../core/model";

@Component({
  selector: 'app-add-place', templateUrl: './add-place.component.html', styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  countries: string[] = [];
  places: PlaceInterface[] = [];
  loadedPlaces: PlaceInterface[] = [];
  myPlaceForm = this.formBuilder.group({
    country: ['', Validators.required],
    id: ['', Validators.required],
    address: ['', Validators.required],
    isPrincipal: [true, Validators.required]
  })

  constructor(private commonClientService: CommonClientService, private formBuilder: FormBuilder,
              public matDialogRef: MatDialogRef<AddPlaceComponent>,
              private toastr: ToastrService) {
    this.places = [];
  }

  save(): void {
    let {id, address, isPrincipal} = this.myPlaceForm.value;
    this.commonClientService.addPlace({idPlace: id, address: address, isPrincipal: isPrincipal}).subscribe(() => {
      this.toastr.success('Bien! ya has registrado una dirección de entrega.');
      this.matDialogRef.close(true);
    });
  }

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.commonClientService.getPlaces().subscribe(places => {
      this.places = places;
      this.loadCountries(places);
    });
  }

  loadCountries(places: PlaceInterface[]): void {
    places.forEach(place => {
      if (!this.countries.includes(place.country)) {
        this.countries.push(place.country);
      }
    })
  }

  loadPlacesByCountry($event: MatSelectChange): void {
    this.loadedPlaces = this.places.filter(place => place.country == $event.value);
  }
}
