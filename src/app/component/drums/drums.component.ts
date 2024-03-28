import {Component, OnInit} from '@angular/core';
import {CommonAdminService} from "../../core/service";
import {PlaceInterface, ProductInterface} from "../../core/model";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ProductTypeComponent} from "../product-type/product-type.component";

@Component({
    selector: 'app-drums',
    templateUrl: './drums.component.html',
    styleUrls: ['./drums.component.scss']
})
export class DrumsComponent implements OnInit {
    formDrum = this.formBuilder.group({
        place: ['', Validators.required],
        lockNumber: [0, Validators.required],
        padlockKey: ['', Validators.required],
        productType: ['', Validators.required],
    });
    reloadListOfDrums: boolean = false;
    places: PlaceInterface[] = [];
    productTypes: any = [];

    constructor(private commonAdminService: CommonAdminService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService,
                private matDialog: MatDialog,
                private activatedRoute: ActivatedRoute, private router: Router) {
        this.loadPlaces();

    }

    ngOnInit(): void {
        this.loadProductTypes();
        this.activatedRoute.params.subscribe(params => {
            if (params['placeId'])
                this.formDrum.controls['place'].setValue(params['placeId'] as string);
        });
    }

    loadProductTypes(): void {
        this.commonAdminService.getTypeOfProducts().subscribe(productTypes => this.productTypes = productTypes);
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
            this.toastr.error(error);
        })
    }

    cancel() {
        this.router.navigateByUrl('/puntos-de-venta');
    }

    openModalProductType() {
        const dialogReference = this.matDialog.open(ProductTypeComponent, {width: '400px', disableClose: true});
        dialogReference.afterClosed().subscribe(() => {
            this.loadProductTypes();
        });
    }
}
