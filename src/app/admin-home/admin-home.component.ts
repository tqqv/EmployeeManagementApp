import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  showFiller = false;


  navigateToDepartment(): void {
    console.log("hello")
    window.location.href = 'http://localhost:4200/admin-home/list-department';

  }
}
