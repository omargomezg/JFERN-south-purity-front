import {Component, OnInit} from '@angular/core';
import {CommonAdminService} from "../../core/service";
import {PlaceInterface, ProductInterface} from "../../core/model";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import { MatRadioChange } from '@angular/material/radio';

@Component({
    selector: 'app-drums',
    templateUrl: './drums.component.html',
    styleUrls: ['./drums.component.scss'],
    standalone: false
})
export class DrumsComponent implements OnInit {
  bottle20Lts = "Bidón de 20 Lts.";
  bottle10Lts = "Bidón de 10 Lts.";
    formDrum = this.formBuilder.group({
        place: ['', Validators.required],
        lockNumber: [0, Validators.required],
        padlockKey: ['', Validators.required],
      shortName: ['', Validators.required],
      priceRefill: [0, Validators.required],
      priceBottle: [0, Validators.required]
    });
    reloadListOfDrums: boolean = false;
    places: PlaceInterface[] = [];

    constructor(private commonAdminService: CommonAdminService, private formBuilder: FormBuilder,
                private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.loadPlaces();
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            if (params['placeId'])
                this.formDrum.controls['place'].setValue(params['placeId'] as string);
        });
    }

    loadPlaces(): void {
        this.commonAdminService.getPlaces().subscribe(places => this.places = places);
  }

  setDefaultPrice(event: MatRadioChange) {
    const refill = event.value == this.bottle20Lts ? 2500 : 1800;
    const bottle = event.value == this.bottle20Lts ? 4500 : 4200;
      this.formDrum.controls['priceRefill'].setValue(refill);
      this.formDrum.controls['priceBottle'].setValue(bottle);
  }

    saveDrum(): void {
        let order = this.formDrum.value as ProductInterface;
        this.commonAdminService.postProduct(order).subscribe(() => {
            this.toastr.success('Bidón registrado :)');
            this.formDrum.controls['lockNumber'].setValue(0);
            this.formDrum.controls['padlockKey'].setValue('');
            this.reloadListOfDrums = !this.reloadListOfDrums;
        }, error => {
            this.toastr.error(error);
        })
    }

    cancel() {
        this.router.navigateByUrl('/puntos-de-venta');
    }
}
