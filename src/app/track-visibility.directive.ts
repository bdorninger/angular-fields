import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { ComponentMeta, typeInjectionToken } from './comp-meta.directive';

export interface VisibilityTrackEvent {
  element: Element;
  visibility: boolean;
}

@Directive({
  selector: '[trackVisibility]',
})
export class TrackVisibilityDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  @Input()
  public useZone: 'runInZone' | 'runOutsideZone' = 'runInZone';

  @Output()
  public readonly visibility = new EventEmitter<VisibilityTrackEvent>();

  constructor(private el: ElementRef<HTMLElement>, private ngZone: NgZone) {
    // console.log('trackVisDir', this.el, this.ngZone);
  }

  public ngOnInit(): void {
    if (this.useZone === 'runInZone') {
      this.ngZone.run(this.check.bind(this));
      return;
    }
    this.ngZone.runOutsideAngular(this.check.bind(this));
  }

  public ngOnDestroy(): void {
    this.observer.disconnect();
    this.visibility.emit({
      element: this.el.nativeElement,
      visibility: false,
    });
  }

  private check() {
    // console.log('installing observer on', this.el);
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        this.visibility.emit({
          element: e.target,
          visibility: e.isIntersecting,
        });
      });
    });
    this.observer.observe(this.el.nativeElement);
  }
}
