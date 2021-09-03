import { ResponseModel } from './responseModel';
import { Car } from '../entities/car';
export interface CarResponseModel extends ResponseModel {
  data: Car[];
}
