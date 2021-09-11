import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/entities/brand';

@Pipe({
  name: 'filterBrandPipe'
})
export class FilterBrandPipePipe implements PipeTransform {

  transform(value: Brand[], filterText:string): Brand[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((b:Brand)=>b.name.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
