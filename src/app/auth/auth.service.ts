import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//  api
  apiAuthenticate:string = `${environment.apiBaseUrl}/api/v1/auth/authenticate`;

  constructor(private http: HttpClient) { 
  }


  public authenticateService(data:any): Observable<Employee> {
    let result = this.http.post<Employee>(this.apiAuthenticate, data);
    console.log("Observe check: "+result)
    return result;
  } 
}
