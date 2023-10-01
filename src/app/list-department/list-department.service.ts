import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class ListDepartmentService {


  // api property
  apiRootDepartment: string = `${environment.apiBaseUrl}/api/v1/department`;
  myHeaders: any;
  httpOptions: any;

  // pagination property
  currentUser: any;
  token: any;

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

  getDepartments(keyword: any): any {
    console.log(Object.keys(this.http.get<any>(this.apiRootDepartment)));
    return this.http.get<any>(this.apiRootDepartment + "?keyword=" + keyword,
      this.httpOptions);
  }


  getDepartById(id: any): Observable<any> {
    console.log(this.http.get<any>(this.apiRootDepartment + "/" + id));
    return this.http.get<any>(this.apiRootDepartment + "/" + id, this.httpOptions);
  }


  deleteDepartment(id: any) {
    var requestOptions: any = {
      method: 'DELETE',
      headers: this.myHeaders.headers,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/department/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  getMaxPage(keyword: any): Observable<number> {
    return this.getDepartments(keyword).pipe(
      map((result: any) => Math.ceil(result.length / 4))
    );
  }

  getDepartmentListByPage(page: number, keyword: string): any {
    console.log("getEmployeeListByPage: " + this.httpOptions);
    return this.http.get(this.apiRootDepartment + "/paging" + "?pageNo=" + (page - 1) + "&keyword=" + keyword, this.httpOptions);
  }

  getEmployeesBySearch(data: string): any {
    return this.http.get(this.apiRootDepartment + "/search" + "?name=", this.httpOptions);
  }

}
