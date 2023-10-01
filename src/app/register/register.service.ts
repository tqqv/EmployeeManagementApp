import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})


export class RegisterService {
 
  // api 
  apiRegister:string = `${environment.apiBaseUrl}/api/v1/auth/register`;
 
  constructor(private http: HttpClient) { 
  }
  



  register(data: any): Observable<any>  {
    console.log(data.dob);
    let date = data.dob;
    const day = ((new Date(date)).getDate()+"").padStart(2, "0");
    const month = (date.getMonth() + 1 +"").padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${year}-${month}-${day}`;
    // console.log(formattedDate)
    data.dob = formattedDate;
    console.log(data)

    return this.http.post<any>(this.apiRegister, data);
  }

  
}
