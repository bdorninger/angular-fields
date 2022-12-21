import {
  formatNumber,
  getLocaleNumberSymbol,
  NumberSymbol,
} from '@angular/common';

import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  VERSION,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { typeInjectionToken } from './comp-meta.directive';

import { VisibilityTrackEvent } from './track-visibility.directive';
import {
  NumValueProvider,
  StrValueProvider,
  ValueProvider,
} from './value-provider';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  name = 'Angular ' + VERSION.major;

  @ViewChild('textArea', {
    read: ElementRef,
    static: false,
  })
  textArea: ElementRef;

  @ViewChild('genspace', { read: ViewContainerRef, static: true })
  genspace: ViewContainerRef;

  valueProvider?: ValueProvider<unknown>;

  _inputSelector: boolean;

  /* @ViewChild('outerContainer',  {

  }
  )
  outerCont: ElementRef;
  */

  @ViewChild('nif', {
    read: ElementRef,
    static: false,
  })
  nif: ElementRef<HTMLInputElement>;

  @ViewChild('inputField', {
    read: ViewContainerRef,
    static: false,
  })
  inputField: ViewContainerRef;

  constructor(private readonly container: ViewContainerRef) {
    this.inputSelector = false;
  }

  onNumberChg(ev: Event) {
    console.log('number change', (ev.target as any).value, ev);
  }

  onFocusIn(event: FocusEvent) {
    console.log('FOCUS IN', event);
  }

  ngAfterViewInit(): void {
    console.log('app init', this.genspace);
    document.addEventListener('selectionchange', (ev) => {
      const el = document.activeElement as HTMLInputElement;
      /*
      console.warn(
        'SELCHG',
        el.selectionStart,
        el.selectionEnd,
        el.selectionDirection,
        ev
      );
      */
    });
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

  onPointer(event: Event) {
    const ev = event as PointerEvent;
    console.log(ev.type, ev.buttons, ev.button, ev);
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

  findComponentMeta() {
    const metainfo = this.inputField.injector.get(typeInjectionToken);
    return metainfo;
  }

  checkSelChg(ev: Event) {
    let current = this.nif.nativeElement.valueAsNumber;
    current = isNaN(current) ? 0.9 : current + 0.1;
    this.nif.nativeElement.value = `${current.toPrecision(2)}`;
    // console.log('blurring', ev.target);
    // (ev.target as HTMLElement).blur();

    // console.log('ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ', formatNumber(234.56, 'es'));
    console.log(
      'ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ',
      getLocaleNumberSymbol('es', NumberSymbol.Decimal)
    );
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

  onMetaClick(ev: Event) {
    this.genspace.clear();
    const metainfo = this.findComponentMeta();
    console.log('metainfo is ', metainfo);
    const ref = this.genspace.createComponent(metainfo.typeCtor, {});
    this.genspace.insert(ref.hostView);
  }

  onClearClick() {
    this.genspace.clear();
  }
}
