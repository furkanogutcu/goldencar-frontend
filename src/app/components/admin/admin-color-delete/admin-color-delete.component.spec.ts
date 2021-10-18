import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDeleteComponent } from './admin-color-delete.component';

describe('ColorDeleteComponent', () => {
  let component: ColorDeleteComponent;
  let fixture: ComponentFixture<ColorDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
