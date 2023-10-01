import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { ListEmployeeService } from './list-employee.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employeeList: Employee[] = [];
  role: any;

  // Keep track property 
  employeeCountRadioButton: string = 'All';
  searchText: string = '';
  keyword = "";
  public current: number = 1;
  public total: number = 0;


  constructor(
    private listEmployeeService: ListEmployeeService,
    private router: Router
  ) { }



  getTotal() {
    return this.employeeList.length;
  }

  getQC() {
    return this.employeeList.filter(e => e.departmentId === 8).length;
  }

  getQA() {
    return this.employeeList.filter(e => e.departmentId === 9).length;
  }

  getDesign() {
    return this.employeeList.filter(e => e.departmentId === 10).length;
  }




  ngOnInit(): void {
    console.log("come init");
    // set role from response
    // get pageNo from url if no = 0, | 
    const fullURL: string = window.location.href;
    if (fullURL.includes("pageNo")) {
      const pageNo = (new URLSearchParams(fullURL)).get("pageNo");
      // set current = pageNo 
      this.current = pageNo !== null ? parseInt(pageNo) : 1;
    }

    this.getEmployeeListByPage(this.current, this.keyword);

  }


  // public getEmployees(): void {
  //   this.listEmployeeService.getEmployees().subscribe((result: any) => {
  //     this.total = result.length; // divide for num of employee per page
  //     console.log(result);
  //   });
  // }

  onFilterRadioButtonChanged(data: any) {
    console.log(data);
    if (data == 'QC') data = 8;
    if (data == 'QA') data = 9;
    if (data == 'Design') data = 10;
    this.employeeCountRadioButton = "" + data;
  }

  deleteEmployee(data: any): void {
    console.log("id is: " + data);
    this.listEmployeeService.deleteEmployee(data);
  }

  updateEmployee(data: any) {
    this.router.navigate(['/update-employee', data]);
  }

  public getEmployeeListByPage(pageNo: number, keyword: any): void {
    // get max page
    this.listEmployeeService.getMaxPage(this.keyword).subscribe((maxPage: number) => {
      this.total = maxPage;
    });

    // get list
    this.listEmployeeService.getEmployeeListByPage(pageNo, keyword).subscribe((result: any) => {
      this.employeeList = result;
      console.log(result);
    });
  }

  // Emitter 
  // pagination
  public onGoTo(page: number): void {
    this.current = page;
    console.log(this.current);
    // this.router.navigate(['list-employee?pageNo='+page]);
    this.getEmployeeListByPage(page, this.keyword);
  }

  public onNext(page: number): void {
    page++;
    this.current = page;
    this.getEmployeeListByPage(page, this.keyword);
  }

  public onPrevious(page: number): void {
    --page;
    this.current = page;
    this.getEmployeeListByPage(page, this.keyword);
  }

  // search
  onSearchTextChanged(data: any): void {
    this.current = 1;
    this.keyword = data;
    this.getEmployeeListByPage(this.current, this.keyword);
  }

}
