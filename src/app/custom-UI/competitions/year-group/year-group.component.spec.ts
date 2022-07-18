import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearGroupComponent } from './year-group.component';

describe('YearGroupComponent', () => {
  let component: YearGroupComponent;
  let fixture: ComponentFixture<YearGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
