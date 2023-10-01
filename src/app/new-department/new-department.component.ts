import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AddDepartmentService } from './add-department.service';
@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css']
})
export class NewDepartmentComponent implements OnInit {

  formGroup: FormGroup =new FormGroup({});

  constructor(
    private addDepartmentService : AddDepartmentService,
    private route : Router
    ) { }
    
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
            name : new FormControl('', [Validators.required]),
          })
  }

    public addDepartment(): void {
      if(this.formGroup.valid) {
        console.log(this.formGroup?.value)
        this.addDepartmentService.addDepartment(this.formGroup?.value).subscribe(result => {
            this.route.navigate(['admin-home']);
        });
      }
    }
}
