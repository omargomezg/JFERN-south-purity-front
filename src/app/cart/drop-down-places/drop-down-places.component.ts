import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceInterface} from '../../core/model';
import {AuthService, PublicService, UserService} from '../../core/service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-drop-down-places',
  templateUrl: './drop-down-places.component.html',
  styleUrls: ['./drop-down-places.component.scss']
})
export class DropDownPlacesComponent implements OnInit {
  @Output()
  public onPlaceSelected: EventEmitter<PlaceInterface> = new EventEmitter<PlaceInterface>();

  @Input()
  public place: PlaceInterface = {} as PlaceInterface;

  formPlace: FormGroup;
  places: PlaceInterface[] = [];
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
      const place: PlaceInterface = this.getPlace(form.place);
      this.updateClientPlace(place);
      this.onPlaceSelected.emit(place);
    });
  }

  private updateClientPlace(place: PlaceInterface): void {
    if (!this.authService.isLogged()) return;
    if (this.authService.getProfile()?.role !== 'CUSTOMER') return;
    this.userService.updatePlace(this.profile?.id as string, place.id).subscribe(() => {
    });
  }

  private getPlace(id: string): PlaceInterface {
    let place = this.places.find(place => place.id === id) as PlaceInterface;
    return place === undefined ? {} as PlaceInterface : place;
  }
}
