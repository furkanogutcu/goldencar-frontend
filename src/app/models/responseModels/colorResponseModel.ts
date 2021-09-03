import { Color } from '../entities/color';
import { ResponseModel } from './responseModel';

export interface ColorResponseModel extends ResponseModel {
  data: Color[];
}
