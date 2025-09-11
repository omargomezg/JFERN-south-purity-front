import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommuneInterface, PlaceInterface} from "../../core/model";
import {CommonAdminService} from "../../core/service";
import {LocationService} from "../../core/service/location.service";
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-form-place',
  templateUrl: './form-place.component.html',
  styleUrls: ['./form-place.component.scss']
})
export class FormPlaceComponent implements OnInit {
  communes: CommuneInterface[] = [];
  filteredCommunes: Observable<string[]> = new Observable<string[]>();
  placeForm = this.formBuilder.group({
    id: [''],
    address: ['', Validators.required],
    availableStock: [0, [Validators.required, Validators.min(0)]],
    country: ['', Validators.required],
    status: true
  })

  constructor(private formBuilder: FormBuilder,
              private commonService: CommonAdminService,
              private readonly locationService: LocationService,
              public dialogRef: MatDialogRef<FormPlaceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PlaceInterface) {
    if (data) this.loadData();
  }

  ngOnInit(): void {
    this.locationService.getComunas().subscribe(data => {
      this.communes = data;
      this.filteredCommunes = this.placeForm.controls['country'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
  }

  loadData(): void {
    this.placeForm.controls['id'].setValue(this.data.id);
    this.placeForm.controls['country'].setValue(this.data.country);
    this.placeForm.controls['availableStock'].setValue(this.data.availableStock);
    this.placeForm.controls['address'].setValue(this.data.address);
    this.placeForm.controls['status'].setValue(this.data.status === 'ENABLED');
  }

  getData(): PlaceInterface {
    return {
      id: this.placeForm.controls['id'].value as string,
      country: this.placeForm.controls['country'].value as string,
      availableStock: this.placeForm.controls['availableStock'].value as number,
      address: this.placeForm.controls['address'].value as string,
      padlocks: 0,
      status: this.placeForm.controls['status'].value ? 'ENABLED' : 'DISABLED'
    };
  }

  save(): void {
    this.commonService.postPlace(this.getData()).subscribe(() => {
      this.dialogRef.close();
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.communes.filter(option => option.nombre.toLowerCase().includes(filterValue))
      .map(option => option.nombre);
  }

}
