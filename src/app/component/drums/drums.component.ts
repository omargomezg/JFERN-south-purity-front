import {Component, OnInit} from '@angular/core';
import {CommonAdminService} from "../../core/service";
import {PlaceInterface, ProductInterface} from "../../core/model";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-drums',
    templateUrl: './drums.component.html',
    styleUrls: ['./drums.component.css']
})
export class DrumsComponent implements OnInit {
    formDrum = this.formBuilder.group({
        place: ['', Validators.required],
        lockNumber: [0, Validators.required],
        padlockKey: ['', Validators.required],
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

    saveDrum(): void {
        let order = this.formDrum.value as ProductInterface;
        this.commonAdminService.postProduct(order).subscribe(() => {
            this.toastr.success('Bidón registrado :)');
            this.formDrum.controls['lockNumber'].setValue(0);
            this.formDrum.controls['padlockKey'].setValue('');
            this.reloadListOfDrums = !this.reloadListOfDrums;
        }, error => {
            console.log(error);
            this.toastr.error(error);
        })
    }

    cancel() {
        this.router.navigateByUrl('/puntos-de-venta');
    }
}
