import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorManagerComponent } from './admin-color-manager.component';

describe('ColorManagerComponent', () => {
  let component: ColorManagerComponent;
  let fixture: ComponentFixture<ColorManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
