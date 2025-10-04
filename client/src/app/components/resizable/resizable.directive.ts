import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, Inject, Output, OnInit } from "@angular/core";
import {
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
  tap
} from "rxjs/operators";
import { fromEvent, Observable, of } from "rxjs";

@Directive({
  selector: "[resizable]"
})
export class ResizableDirective implements OnInit {
  @Output()
  resizable: Observable<number> = of(0); // Initialize with a default observable

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef)
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    this.resizable = fromEvent<MouseEvent>(
      this.elementRef.nativeElement,
      "mousedown"
    ).pipe(
      tap(e => e.preventDefault()),
      switchMap(() => {
        const { width, right } = this.elementRef.nativeElement
          .closest("th")
          .getBoundingClientRect();

        return fromEvent<MouseEvent>(this.documentRef, "mousemove").pipe(
          map(({ clientX }) => width + clientX - right),
          distinctUntilChanged(),
          takeUntil(fromEvent(this.documentRef, "mouseup"))
        );
      })
    );
  }
}
