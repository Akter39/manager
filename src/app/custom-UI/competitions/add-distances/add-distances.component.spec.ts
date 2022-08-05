import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistancesComponent } from './add-distances.component';

describe('AddDistancesComponent', () => {
  let component: AddDistancesComponent;
  let fixture: ComponentFixture<AddDistancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDistancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDistancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
