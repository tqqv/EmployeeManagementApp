import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Employee } from '../model/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListEmployeeService {

  // API
  apiGetEmployee: string = `${environment.apiBaseUrl}/api/v1/employee`;

  // Assets
  currentUser: any;
  token: any;
  myHeaders: any;
  httpOptions: any;


  // Constructor
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

  getEmployees(keyword: any): any {
    console.log(this.myHeaders.headers);
    return this.http.get(this.apiGetEmployee + "?keyword=" + keyword,
      {
        headers: this.myHeaders
      }
    );
  }

  deleteEmployee(id: any) {
    console.log(this.myHeaders);
    var requestOptions: any = {
      method: 'DELETE',
      headers: this.myHeaders.headers,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/employee/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  getMaxPage(keyword: any): Observable<number> {
    return this.getEmployees(keyword).pipe(
      map((result: any) => Math.ceil(result.length / 4))
    );
  }

  getEmployeeListByPage(page: number, keyword: any): any {
    return this.http.get(
      this.apiGetEmployee + "/paging" + "?pageNo=" + (page - 1) + "&keyword=" + keyword, this.httpOptions
    );
  }

}
