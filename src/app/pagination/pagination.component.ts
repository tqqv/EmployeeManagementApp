import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  // activated page
  @Input()
  current: number = 0;
  // max page
  @Input()
  total: number = 0;

  // pages list onscreen
  public pages: number[] = [];

  // emitter
  @Output()
  goTo: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  next: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  previous: EventEmitter<number> = new EventEmitter<number>();

  public onGoTo(page: number): void {
    this.goTo.emit(page);
  }
  public onNext(): void {
    this.next.emit(this.current);
  }
  public onPrevious(): void {
    this.previous.next(this.current);
  }


  ngOnChanges(changes: SimpleChanges): void {
    // make sure changes of current || total
    if (
      (changes['current'] && changes['current'].currentValue) ||
      (changes['total'] && changes['total'].currentValue)
    ) {
      this.pages = this.getPages(this.current, this.total);
    }

  }

  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      const arr = [...Array(total).keys()].map(x => ++x);
      return arr;
    }
    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }
    return [1, 2, 3, 4, 5, -1, total];
  }
}
