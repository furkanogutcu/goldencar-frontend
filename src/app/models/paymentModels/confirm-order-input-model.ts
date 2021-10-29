import { CartItem } from './../entities/carItem';
import { PaymentOutputModel } from './payment-output-model';

export interface ConfirmOrderInputModel extends PaymentOutputModel {
    cartItems: CartItem[]
}