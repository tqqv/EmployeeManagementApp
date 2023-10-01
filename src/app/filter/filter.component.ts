import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  constructor() {}


  // filter by department
  @Input() all: number = 0;
  @Input() QC: number = 0;
  @Input() QA: number = 0;
  @Input() Design: number = 0;


    // keep track property may change => cause emit 
    selectedRadioButtonValue: string = "All";

    @Output()
    filterCheckSelectionChanged: EventEmitter<string> = new EventEmitter<string>();
  
    onRadioSelectionChanged(){
      this.filterCheckSelectionChanged.emit(this.selectedRadioButtonValue);
    }

}
