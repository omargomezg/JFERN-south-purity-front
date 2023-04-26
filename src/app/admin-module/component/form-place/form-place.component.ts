import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlaceInterface} from "../../service/interface/place.interface";

@Component({
  selector: 'app-form-place',
  templateUrl: './form-place.component.html',
  styleUrls: ['./form-place.component.css']
})
export class FormPlaceComponent {

  placeForm = this.formBuilder.group({
    address: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<FormPlaceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PlaceInterface) {
  }

  save() {

  }
}
