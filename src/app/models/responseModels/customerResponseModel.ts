import { Customer } from '../entities/customer';
import { ResponseModel } from './responseModel';

export interface CustomerResponseModel extends ResponseModel {
  data: Customer[];
}
