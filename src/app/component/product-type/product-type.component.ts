import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {CommonAdminService} from "../../core/service";

@Component({
    selector: 'app-product-type',
    templateUrl: './product-type.component.html',
    styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent {
    formType = this.formBuilder.group({
        shortName: ['', [Validators.maxLength(20), Validators.required]],
        priceRecharge: [0, [Validators.min(0), Validators.required]],
        priceDrum: [0, [Validators.min(0), Validators.required]],
    });

    constructor(private dialogReference: MatDialogRef<ProductTypeComponent>,
                private formBuilder: FormBuilder,
                private commonAdminService: CommonAdminService) {
    }

    save(): void {
        this.commonAdminService.createProductType(this.formType.value).subscribe(() => {
            this.dialogReference.close();
        })
    }

    cancel(): void {
        this.dialogReference.close();
    }
}
