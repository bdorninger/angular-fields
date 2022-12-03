import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { typeInjectionToken } from './comp-meta.directive';
import { MetaComponent } from './metacomp';
import {
  allData,
  NameObj,
  StrValueProvider,
  ValueProvider,
} from './value-provider';

@Component({
  selector: 'autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.css'],
  providers: [
    {
      provide: typeInjectionToken,
      useValue: {
        componentTypeName: 'AutoCompleteInputComponent',
      },
    },
  ],
})
export class AutoCompleteInputComponent
  extends MetaComponent
  implements AfterViewInit
{
  @Input()
  valueProvider: ValueProvider<unknown>;

  constructor(private me: ElementRef) {
    super();
    this.valueProvider = new StrValueProvider();
    this.valueProvider.value = {
      name: 'COPY',
    };
  }

  getName() {
    return 'AutoComplete';
  }

  ngAfterViewInit(): void {
    const ifield = (this.me.nativeElement as HTMLElement).querySelector(
      '#ifield'
    );
    if (ifield) {
      (ifield as HTMLInputElement).onselectionchange = (event) => {
        console.log('Sel CHANGE', event);
      };
    }
    console.log('IFIELD', ifield);
  }

  onComplete(ev: Event & { query: string }) {
    const filtered = allData.filter((sugg) =>
      ((sugg as any).name ?? '').startsWith(ev.query)
    );
    console.log('complete', ev.query, filtered);
    this.valueProvider.suggestions = filtered;
  }
}
