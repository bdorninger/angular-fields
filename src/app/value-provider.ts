import { Injectable } from '@angular/core';

export interface ValueProvider<T> {
  getValue(): T;
  getInfo(): string;
  value: T;
  suggestions?: T[];
  onChange(ev: Event);
}

@Injectable({ providedIn: 'root' })
export class ValueProviderFactory {
  public createValueProvider(vtype: string) {
    if (vtype === 'number') {
      return new NumValueProvider();
    } else if (vtype === 'NameObj') {
      return new StrValueProvider();
    }
    throw new Error('unupported value provider');
  }
}

export class NumValueProvider implements ValueProvider<number> {
  _value = 0.5;

  get value(): number {
    //console.log('num get', this._value);
    return this._value;
  }

  set value(v: number) {
    console.log('num set', v);
    this._value = v;
  }

  getValue(): number {
    return this.value;
  }
  getInfo(): string {
    return typeof 100;
  }

  onChange(ev: Event) {
    console.log('numchg', ev);
  }
}

export type NameObj = { name: string };

export const allData = [
  { name: 'Hansi' },
  { name: 'Sepp' },
  { name: 'Ferdl' },
  { name: 'Karl' },
  { name: 'Pepi' },
  { name: 'Hugo' },
];

export class StrValueProvider implements ValueProvider<NameObj> {
  _value: NameObj = { name: 'foobar' };

  suggestions = [];

  get value(): NameObj {
    //console.log('strval get', this._value);
    return this._value;
  }

  set value(v: NameObj) {
    console.log('strval set', v);
    this._value = v;
  }

  getValue(): NameObj {
    return this.value;
  }
  getInfo(): string {
    return 'NameObj';
  }

  onChange(ev: Event) {
    console.log('strchg', ev);
  }
}
