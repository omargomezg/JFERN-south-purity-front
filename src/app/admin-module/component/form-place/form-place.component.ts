import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlaceInterface} from "../../service/interface/place.interface";
import {CommonAdminService} from "../../service/common-admin.service";

@Component({
  selector: 'app-form-place',
  templateUrl: './form-place.component.html',
  styleUrls: ['./form-place.component.css']
})
export class FormPlaceComponent {

  placeForm = this.formBuilder.group({
    id: [''],
    address: ['', Validators.required],
    country: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
              private commonService: CommonAdminService,
              public dialogRef: MatDialogRef<FormPlaceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PlaceInterface) {
    if (data) this.loadData();
  }

  loadData(): void {
    this.placeForm.controls['id'].setValue(this.data.id);
    this.placeForm.controls['address'].setValue(this.data.address);
  }

  save() {
    this.commonService.postPlace(this.placeForm.value as PlaceInterface).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
