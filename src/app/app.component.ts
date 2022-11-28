import {
  AfterViewChecked,
  Component,
  ComponentRef,
  ElementRef,
  VERSION,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { VisibilityTrackEvent } from './track-visibility.directive';
import {
  allData,
  NumValueProvider,
  StrValueProvider,
  ValueProvider,
} from './value-provider';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewChecked {
  name = 'Angular ' + VERSION.major;

  @ViewChild('textArea', {
    read: ElementRef,
    static: false,
  })
  textArea: ElementRef;

  valueProvider?: ValueProvider<unknown>;

  _inputSelector: boolean;

  /* @ViewChild('outerContainer',  {

  }
  )
  outerCont: ElementRef;
  */

  @ViewChild('inputField', {
    read: ViewContainerRef,
    static: false,
  })
  inputField: ViewContainerRef;

  constructor(private readonly container: ViewContainerRef) {
    this.inputSelector = false;
  }

  onFocusIn(event: FocusEvent) {
    console.log('FOCUS IN', event);
  }

  ngAfterViewChecked(): void {
    // console.log('after view check', this.inputField, this.container);
    /* for (let i = 0; i < this.container.length; i++) {
      console.log(`---- child ${i}`, this.container.get(i));
    }
    const ta = this.textArea.nativeElement as HTMLTextAreaElement;
    console.log(
      'TEXTAREA',
      `'${ta.value ?? 'val-UNDEF'}'`,
      `'${ta.type ?? 'type-UNDEF'}'`,
      `'${ta.inputMode ?? 'inpmod-UNDEF'}'`
    );*/
    // setTimeout(() => (ta.inputMode = undefined), 1500);
  }

  onCBLostFocus(ev: Event) {
    console.log('LOST focus', ev);
  }

  onClick(ev: Event) {
    console.log('click', ev.composedPath(), ev);
  }

  onFocBtClick(ev?: Event) {
    console.log('Focus Button:', this.inputField.element.nativeElement);
    const ie = this.findInputElement(
      this.inputField.element.nativeElement as HTMLElement
    );
    if (ie) {
      console.log('Focusing :', ie);
      ie.focus();
    }
  }

  findInputElement(
    el: HTMLElement
  ): HTMLInputElement | HTMLTextAreaElement | undefined {
    // return document.querySelector('textarea');
    return el.querySelector('#ifield') ?? undefined;
  }

  blurCB(ev: Event) {
    // console.log('blurring', ev.target);
    // (ev.target as HTMLElement).blur();
  }

  get inputSelector(): boolean {
    return this._inputSelector;
  }

  set inputSelector(v: boolean) {
    this._inputSelector = v;
    this.valueProvider = v ? new NumValueProvider() : new StrValueProvider();
  }

  onVisibilityChange(ev: VisibilityTrackEvent) {
    console.log('onVisiChg', ev);
  }

  onComplete(ev: Event & { query: string }) {
    const filtered = allData.filter((sugg) =>
      ((sugg as any).name ?? '').startsWith(ev.query)
    );
    console.log('complete', ev.query, filtered);
    this.valueProvider.suggestions = filtered;
  }
}
