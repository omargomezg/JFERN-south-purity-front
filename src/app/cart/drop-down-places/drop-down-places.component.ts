import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceInterface} from '../../core/model';
import {AuthService, PublicService} from '../../core/service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-drop-down-places',
  templateUrl: './drop-down-places.component.html',
  styleUrls: ['./drop-down-places.component.css']
})
export class DropDownPlacesComponent implements OnInit {
  @Output()
  public onPlaceSelected: EventEmitter<PlaceInterface> = new EventEmitter<PlaceInterface>();

  @Input()
  public place: PlaceInterface = {} as PlaceInterface;

  formPlace: FormGroup;
  places: PlaceInterface[] = [];
  isLogged: boolean = this.authService.isLogged();
  profile = this.authService.getProfile();

  constructor(private publicService: PublicService, private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.formPlace = this.buildForm();
  }

  ngOnInit(): void {
    if (this.place.id) {
      this.formPlace.get('place')?.setValue(this.place.id);
    }
    this.formPlace.get('place')?.setValue(this.place.id);
    this.publicService.getPlaces().subscribe(list => {
      this.places = list;
      this.setValueChanges();
    });
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      place: ['', [Validators.required]]
    });
  }

  setPrincipal() {

  }

  private setValueChanges(): void {
    this.formPlace.valueChanges.subscribe((form) => {
      this.onPlaceSelected.emit(this.getPlace(form.place));
    });
  }

  private getPlace(id: string): PlaceInterface {
    let place = this.places.find(place => place.id === id) as PlaceInterface;
    return place === undefined ? {} as PlaceInterface : place;
  }
}
