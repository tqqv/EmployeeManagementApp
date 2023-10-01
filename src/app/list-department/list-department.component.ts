import { Component } from '@angular/core';
import { Department } from '../model/department';
import { ListDepartmentService } from './list-department.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent {

  departmentList: Department[] = [];

  // Keep track property 
  searchText: string = '';
  keyword = "";
  public current: number = 1;
  public total: number = 0;

  constructor(private listDepartmentService: ListDepartmentService,
    private router: Router
  ) { }


  ngOnInit(): void {

    const fullURL: string = window.location.href;
    if (fullURL.includes("pageNo")) {
      const pageNo = (new URLSearchParams(fullURL)).get("pageNo");
      // set current = pageNo 
      this.current = pageNo !== null ? parseInt(pageNo) : 1;
    }

    this.getDepartmentListByPage(this.current, this.keyword);
  }


  // public getDepartments(): void {
  //   this.listDepartmentService.getDepartments().subscribe((result: any) => {
  //     if (result) console.log(result);
  //     this.departmentList = result;
  //   });
  // }



  deleteDepartment(data: any): void {
    console.log("id is: " + data);
    this.listDepartmentService.deleteDepartment(data);
  }

  viewAllEmployee(data: any): void {
    // this.listDepartmentService.viewAllEmployee(data);
  }

  updateDepartment(data: any) {
    console.log("hee");
    this.router.navigate(['/update-department', data]);
  }



  public getDepartmentListByPage(pageNo: number, keyword: any): void {
    // get max page
    this.listDepartmentService.getMaxPage(this.keyword).subscribe((maxPage: number) => {
      this.total = maxPage;
    });

    // get list
    this.listDepartmentService.getDepartmentListByPage(pageNo, keyword).subscribe((result: any) => {
      this.departmentList = result;
      console.log(result);
    });
  }

  // emitter 
  // pagination
  public onGoTo(page: number): void {
    this.current = page;
    console.log(this.current);
    // this.router.navigate(['list-department?pageNo='+page]);
    this.getDepartmentListByPage(page, this.keyword);
  }

  public onNext(page: number): void {
    page++;
    this.current = page;
    this.getDepartmentListByPage(page, this.keyword);


  }

  public onPrevious(page: number): void {
    --page;
    this.current = page;
    this.getDepartmentListByPage(page, this.keyword);
  }



  // search
  onSearchTextChanged(data: any): void {
    this.current = 1;
    this.keyword = data;
    this.getDepartmentListByPage(this.current, this.keyword);
  }

}
