import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  Type,
  ViewChild,
} from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { typeInjectionToken } from './comp-meta.directive';
import { MetaComponent } from './metacomp';
import { NumValueProvider, ValueProvider } from './value-provider';

@Component({
  selector: 'num-input',
  templateUrl: './numinput.component.html',
  styleUrls: ['./numinput.component.css'],
  /* providers: [
    {
      provide: typeInjectionToken,
      useValue: {
        componentTypeName: 'NumInputComponent',
      },
    },
  ],*/
})
export class NumInputComponent extends MetaComponent implements AfterViewInit {
  @Input()
  valueProvider: ValueProvider<unknown>;

  @ViewChild('inputField', {
    read: ElementRef,
    static: false,
  })
  inputField: ElementRef;

  public readonly componentType = 'InputNumber';

  constructor(private inj: Injector) {
    super();
    this.valueProvider = new NumValueProvider();
    this.valueProvider.value = 9.99;
  }

  public getName() {
    return 'NumInputcomponent';
  }

  ngAfterViewInit() {
    const natElem = this.inputField.nativeElement as HTMLElement;
    const t = natElem.getAttribute('ng-reflect-comp-type');
    console.log('####input field elem', this.inputField, t, typeof t);
  }
}
