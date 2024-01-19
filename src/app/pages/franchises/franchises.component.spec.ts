import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisesComponent } from './franchises.component';

describe('FranchisesComponent', () => {
  let component: FranchisesComponent;
  let fixture: ComponentFixture<FranchisesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FranchisesComponent]
    });
    fixture = TestBed.createComponent(FranchisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
