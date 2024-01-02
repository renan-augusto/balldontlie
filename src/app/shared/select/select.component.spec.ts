import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { PoModule } from '@po-ui/ng-components';
import { ICommonType } from 'src/app/models/common.model';
import { compileComponentFromMetadata } from '@angular/compiler';

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
    const options: ICommonType[] = [
      { label: 'Albert Einstein', value: '3' },
      { label: 'Marie Curie', value: '4' },
      { label: 'Isaac Newton', value: '5' },
      { label: 'Ada Lovelace', value: '6' },
      { label: 'Nikola Tesla', value: '7' },
      { label: 'Leonardo da Vinci', value: '8' },
      { label: 'Jane Austen', value: '9' },
      { label: 'Wolfgang Mozart', value: '10' },
      { label: 'Cleópatra', value: '11' },
      { label: 'Vincent van Gogh', value: '12' },
      { label: 'Bill Gates', value: '13' }
    ];
    component.options = options;

    fixture.detectChanges();
    expect(component.options).toEqual(options);
  });

  it('should set placeholder via @input', () => {
    const placeholder: string = 'mockedplaceholder';
    component.placeholder = placeholder;

    fixture.detectChanges();
    expect(component.placeholder).toEqual(placeholder);
  });

  it('should initialize @input isRequired as false', () => {
    expect(component.required).toBeFalse();
  });

  it('should change @input required to true when the input is provided', () => {
    const required: boolean = true;
    component.required = required;

    expect(component.required).toBeTrue();
  });

  it('should initialize @input isDisable as false', () => {
    expect(component.isdisabled).toBeFalse();
  });

  it('should change @input isDisable to true when the input is provided', () => {
     const isDisable: boolean = true;
     component.isdisabled = isDisable;
     expect(component.isdisabled).toBeTrue();
  })

  it('should initialize @input isReadOnly as false', () => {
    expect(component.isdisabled).toBeFalse();
  });

  it('should change @input readonly to true when the input is provided', () => {
    const readonly: boolean = true;
    component.isreadonly = readonly;
    expect(component.isreadonly).toBeTrue();
  });
});
