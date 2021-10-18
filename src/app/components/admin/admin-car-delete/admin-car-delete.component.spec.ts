import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDeleteComponent } from './admin-car-delete.component';

describe('CarDeleteComponent', () => {
  let component: CarDeleteComponent;
  let fixture: ComponentFixture<CarDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
