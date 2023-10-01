import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide= true;
  ngOnInit(): void {
    this.initForm()
  }

  formGroup: FormGroup =new FormGroup({});

  initForm() {
    this.formGroup = new FormGroup({
            username: new FormControl(null),
            password: new FormControl(null),
            email : new FormControl(null, [Validators.required, Validators.email]),
            name:  new FormControl(null),
            dob:  new FormControl(null),
          })
  }
  
  constructor(
    private registerService : RegisterService,
    private route : Router
    ) { }

  public register(): void {
    if(this.formGroup.valid) {
      console.log(this.formGroup?.value)
      this.registerService.register(this.formGroup?.value).subscribe(result => {
          this.route.navigate(['admin-home']);

      });
    }
  }

  // getErrorMessage() { 
  //   if (this.formGroup.value.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.formGroup.value.email.hasError('email') ? 'Not a valid email' : '';
  // }
}

