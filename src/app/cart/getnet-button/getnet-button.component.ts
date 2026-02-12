import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from "../../core/service";
import { PAYMENT_TYPE } from "../../core/constant/app.constants";

@Component({
    selector: 'app-getnet-button',
    templateUrl: './getnet-button.component.html',
    styleUrls: ['./getnet-button.component.scss']
})
export class GetnetButtonComponent implements OnInit {

    paymentTypes = PAYMENT_TYPE;

    @Output() paymentType = new EventEmitter<string>();
    paymentTypeSelected: string = PAYMENT_TYPE.GETNET;

    profile = this.authService.getProfile();

    constructor(private authService: AuthService) {
        if (this.profile?.role === 'ADMINISTRATOR') {
            this.paymentTypeSelected = PAYMENT_TYPE.CASH;
        }
    }

    ngOnInit(): void {
        this.paymentType.emit(this.paymentTypeSelected);
    }

    setPaymentType(paymentType: string): void {
        this.paymentTypeSelected = paymentType;
        this.paymentType.emit(paymentType);
    }
}
