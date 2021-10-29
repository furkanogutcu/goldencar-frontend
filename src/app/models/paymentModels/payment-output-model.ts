import { RentPaymentRequest } from "./rent-payment-request";

export interface PaymentOutputModel {
    rentPaymentRequest: RentPaymentRequest;
    isCreditCardSaving: boolean;
}