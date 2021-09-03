import { Rental } from '../entities/rental';
import { ResponseModel } from './responseModel';

export interface CustomerResponseModel extends ResponseModel {
  data: Rental[];
}
