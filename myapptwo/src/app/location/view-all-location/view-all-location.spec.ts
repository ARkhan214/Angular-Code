import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllLocation } from './view-all-location';

describe('ViewAllLocation', () => {
  let component: ViewAllLocation;
  let fixture: ComponentFixture<ViewAllLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
