import { TestBed } from '@angular/core/testing';

import { CarImagesService } from './car-images.service';

describe('CarImagesService', () => {
  let service: CarImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
