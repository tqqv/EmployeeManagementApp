import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { AuthComponent } from './auth/auth.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegisterComponent } from './register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NavComponent } from './nav/nav.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { MatTableModule } from '@angular/material/table';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NewDepartmentComponent } from './new-department/new-department.component';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  { path: 'authenticate', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list-employee', component: ListEmployeeComponent },
  { path: 'list-department', component: ListDepartmentComponent },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent },
  { path: 'update-department/:id', component: UpdateDepartmentComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'new-department', component: NewDepartmentComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    NavComponent,
    ListEmployeeComponent,
    UpdateEmployeeComponent,
    ListDepartmentComponent,
    UpdateDepartmentComponent,
    EmployeeHomeComponent,
    AdminHomeComponent,
    FilterComponent,
    SearchComponent,
    PaginationComponent,
    NewDepartmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    ReactiveFormsModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSidenavModule,
    MatPaginatorModule,

    MatSelectModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
