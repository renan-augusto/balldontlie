import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { PoModule } from '@po-ui/ng-components';
import { ICommonType } from 'src/app/models/common.model';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent],
      imports: [PoModule]
    });
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title via input', () => {
    const title: string = '';
    component.title = title;

    fixture.detectChanges();

    expect(component.title).toEqual(title);
  });

  it('should set options via @input', () => {
    const options: ICommonType[] = [];
    component.options = options;

    fixture.detectChanges();
    expect(component.options).toEqual(options);
  });
});
