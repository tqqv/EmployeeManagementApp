import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListDepartmentService } from '../list-department/list-department.service';
import { Department } from '../model/department';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateDepartmentService } from './update-department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  id: any;


  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public departmentService: ListDepartmentService,
    public updateDepartmentService: UpdateDepartmentService) { }

  ngOnInit(): void {
    // get param id
    this.route.params.subscribe(param => {
      this.id = param["id"];
      console.warn("URL id: " + param["id"]);
    });

    // get department by id => init form
    let department = this.getDepartmentById(this.id);
    department.subscribe(de => {
      console.log(de.id);
      console.log(de.name);
      this.updateForm(de);
    });


  }


  formGroup = this.fb.group({
    id: [""],
    name: ["", [Validators.required]],
  });

  formGroup2: FormGroup = new FormGroup({});
  initForm(department: Department) {
    this.formGroup2 = new FormGroup({

      name: new FormControl(department.name),
    });
  }

  protected updateForm(department: Department): void {
    this.formGroup.patchValue({
      id: department.id + "",
      name: department.name,
    });
  }


  getDepartmentById(id: any): Observable<Department> {
    return this.departmentService.getDepartById(id);
  };

  updateDepartment(): any {
    console.log(this.formGroup);
    let department = {
      id: this.formGroup.get(["id"])!.value,
      name: this.formGroup.get(["name"])!.value
    };
    console.warn("updated " + department.name);
    console.warn("updated " + department.id);
    this.updateDepartmentService.updateDepartment(this.id, department).subscribe(result => {
      console.log(result);
      if (result) this.navigateToUpdateDepartment();
    });
  }

  navigateToUpdateDepartment() {
    this.router.navigate(['update-department/' + this.id]);
  }


}
