import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router,  ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  hide = true;

  ngOnInit(): void {
    this.initForm()
  }

  constructor(
    private aService : AuthService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute) { }


  formGroup: any;

  initForm(): void {
    this.formGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  public authenticate(): void{
    if(this.formGroup.valid) {
      console.log(this.formGroup)
      this.aService.authenticateService(this.formGroup?.value).subscribe(result => {
        console.log(result)
        localStorage.setItem('currentUser', JSON.stringify( result ));

        if(result) this.navigateToAdminHome();
      });
    }
    
  }



  // routing
  // admin
  navigateToAdminHome() {
   window.location.href = 'http://localhost:4200/admin-home';
  }

  // employee
  navigateToEmployeeHome() {
    window.location.href = 'http://localhost:4200/';
   }


}
