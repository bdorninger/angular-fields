import { InjectionToken } from '@angular/core';

export interface ComponentMeta {
  componentTypeName: string;
  typeCtor: new (...args: any) => any;
}

export const typeInjectionToken = new InjectionToken<ComponentMeta>(
  'Component Type Meta Information'
);
