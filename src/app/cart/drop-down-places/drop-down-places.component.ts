import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceModel} from '../../core/model';
import {AuthService, PublicService, UserService} from '../../core/service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-drop-down-places',
  templateUrl: './drop-down-places.component.html',
  styleUrls: ['./drop-down-places.component.scss']
})
export class DropDownPlacesComponent implements OnInit {
  @Output()
  public onPlaceSelected: EventEmitter<PlaceModel> = new EventEmitter<PlaceModel>();

  @Input()
  public place: PlaceModel = {} as PlaceModel;

  formPlace: FormGroup;
  places: PlaceModel[] = [];
  profile = this.authService.getProfile();

  constructor(private publicService: PublicService, private authService: AuthService,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    this.formPlace = this.buildForm();
  }

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.publicService.getPlaces().subscribe(list => {
      this.places = list;
      this.setValueChanges();
      if (this.place.id) {
        this.formPlace.get('place')?.setValue(this.place.id);
      }
    });
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      place: ['', [Validators.required]]
    });
  }

  private setValueChanges(): void {
    this.formPlace.valueChanges.subscribe((form) => {
      const place: PlaceModel = this.getPlace(form.place);
      this.updateClientPlace(place);
      this.onPlaceSelected.emit(place);
    });
  }

  private updateClientPlace(place: PlaceModel): void {
    if (!this.authService.isLogged()) return;
    if (this.authService.getProfile()?.role !== 'CUSTOMER') return;
    this.userService.updatePlace(this.profile?.id as string, place.id).subscribe(() => {
    });
  }

  private getPlace(id: string): PlaceModel {
    let place = this.places.find(place => place.id === id) as PlaceModel;
    return place === undefined ? {} as PlaceModel : place;
  }
}
