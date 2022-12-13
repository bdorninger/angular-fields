import { Component } from '@angular/core';
// foo
@Component({
  selector: 'mcomp',
  template: '',
})
export abstract class MetaComponent {
  public abstract getName();
}
