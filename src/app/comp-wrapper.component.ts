import { ComponentMeta } from './comp-meta.directive';

export class CompWrapper<C> {
  constructor(public readonly meta: ComponentMeta) {}
}
