import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Employee } from '../model/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmployeeService {


  api: string = `${environment.apiBaseUrl}/api/v1/employee`;

  currentUser: any;
  token: any;
  myHeaders: any;
  httpOptions: any;


  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('currentUser');
    this.token = JSON.parse(this.currentUser ?? "").token;
    this.myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', ' http://localhost:4200',)
      .set('Accept', 'application/json')
      .set("Authorization", "Bearer " + this.token);
    this.httpOptions = {
      headers: this.myHeaders
    };
    console.log("token: " + this.token);
  }

  updateEmployee(id: number, e: Employee): Observable<any> {
    return this.http.put(this.api + '/' + id, e, this.httpOptions);
  }

  getEmployeebyId(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`, this.httpOptions);
  }


}
