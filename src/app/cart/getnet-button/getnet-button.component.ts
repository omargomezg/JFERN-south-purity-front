import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../core/service";
import {PAYMENT_TYPE} from "../../core/constant/app.constants";

@Component({
    selector: 'app-getnet-button',
    templateUrl: './getnet-button.component.html',
    styleUrls: ['./getnet-button.component.scss']
})
export class GetnetButtonComponent {

    paymentTypes = PAYMENT_TYPE;

    @Output() paymentType = new EventEmitter<string>();

    profile = this.authService.getProfile();

    constructor(private authService: AuthService) {
    }

    setPaymentType(paymentType: string): void {
        this.paymentType.emit(paymentType);
    }
}
