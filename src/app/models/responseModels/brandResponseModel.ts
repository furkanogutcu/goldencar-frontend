import { Brand } from '../entities/brand';
import { ResponseModel } from './responseModel';

export interface BrandResponseModel extends ResponseModel {
  data: Brand[];
}
