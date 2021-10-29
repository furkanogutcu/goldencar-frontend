import { ConfirmOrderOutputModel } from './../../models/paymentModels/confirm-order-output-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.css']
})
export class PaymentSuccessfulComponent implements OnInit {

  @Input() confirmOrderOutputModel: ConfirmOrderOutputModel;

  constructor() { }

  ngOnInit(): void {
        
  }

}
