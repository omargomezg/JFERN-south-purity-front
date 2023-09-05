import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonClientService} from "../../client-module/service/common-client.service";
import {PaymentResponseModel} from "../../client-module/service/model";

@Component({
  selector: 'app-build-payment-result',
  templateUrl: './build-payment-result.component.html',
  styleUrls: ['./build-payment-result.component.css']
})
export class BuildPaymentResultComponent implements OnInit {

  public gettingPaymentStatus: boolean;
  paymentResponse = {} as PaymentResponseModel;

  constructor(private route: ActivatedRoute, private commonService: CommonClientService) {
    this.gettingPaymentStatus = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['refserence'])
        this.commonService.getStatusSaleOrder(params['reference']).subscribe(data => {
            this.paymentResponse = data;
            this.gettingPaymentStatus = false;
          }
        );
    });
  }

  handleResponse(data: PaymentResponseModel): void {
    this.paymentResponse = data;
    this.gettingPaymentStatus = false;
  }

  handleError(error: any): void {
    this.paymentResponse.paymentStatus = 'NOT_EXISTS';
    this.gettingPaymentStatus = false;
  }
}
