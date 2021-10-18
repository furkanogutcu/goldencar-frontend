import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDeleteComponent } from './admin-brand-delete.component';

describe('BrandDeleteComponent', () => {
  let component: BrandDeleteComponent;
  let fixture: ComponentFixture<BrandDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
