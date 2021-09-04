import { Rental } from '../entities/rental';
import { ResponseModel } from './responseModel';

export interface RentalResponseModel extends ResponseModel {
  data: Rental[];
}
