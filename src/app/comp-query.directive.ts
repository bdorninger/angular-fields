import {
  AfterViewInit,
  Directive,
  ElementRef,
  Host,
  Input,
  Self,
  Type,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[cqdir]',
})
export class CompQueryDirective implements AfterViewInit {
  @Input('cqdir')
  compType: Type<unknown> | string;

  constructor(@Host() @Self() private hostView: ViewContainerRef) {}

  ngAfterViewInit() {
    console.log('compquery', this.compType, this.hostView);
  }
}
