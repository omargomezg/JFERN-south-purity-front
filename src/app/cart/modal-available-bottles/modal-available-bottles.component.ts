import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../core/service";
import {ProductFilterModel} from "../../core/model/product-filter.model";
import {ProductModel} from "../../core/model/product.model";
import {CartModel} from "../../client-module/service/model";

@Component({
    selector: 'app-modal-available-bottles',
    templateUrl: './modal-available-bottles.component.html',
    styleUrls: ['./modal-available-bottles.component.scss']
})
export class ModalAvailableBottlesComponent implements OnInit {
    bottles: ProductModel[] = [];
    selectedBottles: ProductModel[] = [];
    maxBottles: number = 0;
    selectBottle: string = '';
    filter = new ProductFilterModel();

    constructor(private productService: ProductService,
                public dialogRef: MatDialogRef<ModalAvailableBottlesComponent>,
                @Inject(MAT_DIALOG_DATA) public cart: CartModel) {
    }

    ngOnInit(): void {
        this.setTotalBottles();
        this.buildBottles();
    }

    buildBottles(): void {
        this.filter.placeId = this.cart.place.id;
        this.productService.get(this.filter).subscribe(availableBottles => {
            this.bottles = availableBottles.content;
            this.cart.products.forEach(product => {
                this.selectedBottles.push(product);
                this.bottles = this.bottles.filter(b => b.id !== product.id);
            });
        });

    }

    accept(): void {
        this.cart.products = [];
        this.selectedBottles.forEach(bottle => {
            this.cart.products.push({id: bottle.id} as ProductModel);
        });
        this.dialogRef.close(this.cart);
    }

    setTotalBottles(): void {
        let totalWithBottles: number = 0;
        let totalWithoutBottles: number = 0;
        this.cart.items
            .forEach(item => {
                if (item.description === 'Recarga + Bidón') {
                    totalWithBottles += Number(item.quantity);
                }
                if (item.description === 'Recarga') {
                    totalWithoutBottles += Number(item.quantity);
                }
            });
        this.maxBottles = totalWithBottles + totalWithoutBottles;
    }

    addBottle(): void {
        if (this.selectBottle !== '') {
            this.selectedBottles.push(this.bottles.filter(b => b.id === this.selectBottle)[0]);
            this.bottles = this.bottles.filter(b => b.id !== this.selectBottle);
            this.selectBottle = '';
        }
    }
}
