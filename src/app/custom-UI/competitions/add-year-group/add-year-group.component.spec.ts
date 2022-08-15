import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYearGroupComponent } from './add-year-group.component';

describe('AddYearGroupComponent', () => {
  let component: AddYearGroupComponent;
  let fixture: ComponentFixture<AddYearGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddYearGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYearGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
