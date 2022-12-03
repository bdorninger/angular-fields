import {
  ComponentRef,
  Directive,
  ElementRef,
  Host,
  Inject,
  InjectionToken,
  Optional,
  Self,
  Type,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { AutoCompleteInputComponent } from './autocomplete-input.component';
import { MetaComponent } from './metacomp';
import { NumInputComponent } from './numinput.component';

export interface ComponentMeta {
  componentTypeName: string;
  typeCtor: Type<any>;
}

export const typeInjectionToken = new InjectionToken<ComponentMeta>(
  'Component Type Meta Information'
);

@Directive({
  selector: '[compMeta]',
})
export class ComponentMetaDirective {
  constructor(
    /* @Inject(typeInjectionToken)
    @Optional()
    @Self()
    private compMeta: ComponentMeta | null,*/
    @Inject(MetaComponent)
    @Optional()
    @Host()
    @Self()
    private compRef: any
  ) {
    console.error('compmeta ctor', this.compRef); // this.compMeta);
    // console.warn('lc', (this.compRef as any)?._lContainer[0][8]);
  }
}
