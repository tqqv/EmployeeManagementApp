import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateEmployeeService } from './update-employee.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { Department } from '../model/department';
import { ListDepartmentService } from '../list-department/list-department.service';
import { EmployeeHomeComponent } from '../employee-home/employee-home.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {


  id: any;
  employee: Employee | undefined;
  departmentList: Department[] = [];
  defaultFullname: any;
  defaultDob: any;
  defaultDepartment: string = "";


  formGroup = this.fb.group({
    id: [""],
    fullname: [""],
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
    email: ["", [Validators.required]],
    dob: [new Date],
    departmentId: [""],
    role: [""]
  });


  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected updateEmployeeService: UpdateEmployeeService,
    protected departmentService: ListDepartmentService,
    protected fb: FormBuilder
  ) { }



  ngOnInit(): void {
    // get param id
    this.route.params.subscribe(param => {
      this.id = param["id"];
      console.warn("URL id: " + param["id"]);
    });

    // get department list
    this.getDepartments();

    // get emloyee by id => init
    let e = this.getEmployeeById(this.id);
    e.subscribe(em => {
      // get departmentNameById
      this.departmentService.getDepartById(em.departmentId).subscribe(de => {
        this.defaultDepartment = de.name;
      });
      // this.initForm(em);
      this.updateForm(em);
      console.log(em);
      this.defaultFullname = em.fullname;
      this.defaultDob = em.dob;

    });
  }

  getDepartments(): void {
    this.departmentService.getDepartments("").subscribe((result: any) => {
      this.departmentList = result;
    });
  }

  protected updateForm(employee: Employee): void {
    this.formGroup.patchValue({
      id: employee.id + "",
      fullname: employee.fullname,
      username: employee.username,
      password: employee.password,
      email: employee.email,
      dob: employee.dob,
      departmentId: this.defaultDepartment,
      role: employee.role + "",
    });
  }



  // get user infor by path variable
  public getEmployeeById(id: number): Observable<Employee> {
    return this.updateEmployeeService.getEmployeebyId(id);
  }

  // update 

  protected updateProfile(): any {
    console.log(this.formGroup);
    let employee = {
      id: (Number)(this.formGroup.get(['id'])!.value),
      fullname: this.formGroup.get(['fullname'])!.value,
      username: this.formGroup.get(['username'])!.value,
      password: this.formGroup.get(['password'])!.value,
      dob: this.formGroup.get(['dob'])!.value,
      email: this.formGroup.get(['email'])!.value,
      departmentId: this.formGroup.get(['departmentId'])!.value,
      role: this.formGroup.get(['role'])!.value,
    };
    console.log(employee);

    this.updateEmployeeService.updateEmployee(this.id, employee).subscribe(result => {
      console.log(result);
      if (result) this.navigateToUpdateProfile();
    });
  }

  // navigation
  navigateToUpdateProfile() {
    this.router.navigate(['update-employee/' + this.id]);
  }


  findDepartByIdDepart(id: any): any {
    return this.departmentList.find((de) => de.id = id);
  }
}

