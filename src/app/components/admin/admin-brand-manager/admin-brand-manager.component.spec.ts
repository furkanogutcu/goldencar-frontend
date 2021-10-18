import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandManagerComponent } from './admin-brand-manager.component';

describe('BrandManagerComponent', () => {
  let component: BrandManagerComponent;
  let fixture: ComponentFixture<BrandManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
