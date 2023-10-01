import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListEmployeeService } from '../list-employee/list-employee.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(public listEmployeeService: ListEmployeeService) { }

  searchValue: string = '';

  // emitter
  @Output()
  searchValueChange: EventEmitter<string> = new EventEmitter<string>();


  onSearchChanged() {
    this.searchValueChange.emit(this.searchValue);
  }
  // changeSearchValue(eData : Event) : void {
  //   this.searchValue = (<HTMLInputElement>eData.target).value;
  // }

  searchEmployee(data: any) {
    console.log("search: " + data);
    this.searchValueChange.emit(data);
  }

}
