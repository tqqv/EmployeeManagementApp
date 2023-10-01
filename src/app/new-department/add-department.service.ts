import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AddDepartmentService {

  
  // api property
  apiRegister:string = `${environment.apiBaseUrl}/api/v1/department`;
  myHeaders: any;
  httpOptions: any;

  // pagination property
  currentUser: any;
  token: any;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('currentUser');
    this.token = JSON.parse(this.currentUser??"").token;
    this.myHeaders = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', ' http://localhost:4200',)
          .set('Accept', 'application/json')
          .set("Authorization", "Bearer " +this.token)
    this.httpOptions = {
    headers: this.myHeaders
  }
  console.log("token: " + this.token)
}

  addDepartment(data: any): Observable<any>  {
    console.log(data.name);
    return this.http.post<any>(this.apiRegister, data, this.httpOptions);
  }

}
