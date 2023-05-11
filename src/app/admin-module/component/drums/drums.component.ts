import {Component} from '@angular/core';
import {CommonAdminService} from "../../service/common-admin.service";
import {PlaceInterface} from "../../service/interface/place.interface";
import {FormBuilder, Validators} from "@angular/forms";
import {OrderInterface} from "../../service/interface/order.interface";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-drums',
  templateUrl: './drums.component.html',
  styleUrls: ['./drums.component.css']
})
export class DrumsComponent {
  formDrum = this.formBuilder.group({
    place: ['', Validators.required],
    lockNumber:  [0, Validators.required],
    padlockKey: [0, Validators.required],
  });
  places: PlaceInterface[] = [];

  constructor(private commonAdminService: CommonAdminService, private formBuilder: FormBuilder,
              private toastr: ToastrService) {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.commonAdminService.getPlaces().subscribe(places => this.places = places);
  }

  saveDrum(): void {
    let order = this.formDrum.value as OrderInterface;
    this.commonAdminService.postOrder(order).subscribe(result =>{
      this.toastr.success('Bidon registrado :)');
      this.formDrum.controls['lockNumber'].setValue(0);
      /*this.formDrum.controls['lockNumber'].markAsPristine();
      this.formDrum.controls['lockNumber'].markAsUntouched();
      this.formDrum.controls['lockNumber'].updateValueAndValidity();*/
      this.formDrum.controls['padlockKey'].setValue(0);
      /*this.formDrum.controls['padlockKey'].markAsPristine();
      this.formDrum.controls['padlockKey'].markAsUntouched();
      this.formDrum.controls['padlockKey'].updateValueAndValidity();*/
    })
  }
}
