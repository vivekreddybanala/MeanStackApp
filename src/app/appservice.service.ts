import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

export interface Employee {
  _id?: string;
  name: string,
  salary: number,
  designation: string,
  joiningDate: Date,
  type: string
}

export interface Response {
  status: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  private URL = 'http://localhost:4000/';
  constructor(private _http: HttpClient) { }

  // GET employee details
  getEmployees(): Observable<Employee[]> {
    return this._http.get(this.URL + 'employee') as Observable<Employee[]>;
  }

// GET employee by ID
  getEmployeebyId(id): Observable<Employee[]> {
    return this._http.get(this.URL + 'employee/' + id) as Observable<Employee[]>;
  }

// POST add employee
  addEmployees(employee: Employee): Observable<any> {
    return this._http.post(this.URL + 'employee', employee) as Observable<Response>;
  }

  // POST update employee by ID,Employee
  updateEmployee(id, employee: Employee): Observable<any> {
    return this._http.post(this.URL + 'update/' + id, employee) as Observable<Response>;
  }

  //GET delete employee by ID
  deleteEmployee(id): Observable<any> {
    return this._http.get(this.URL + 'delete/' + id) as Observable<Response>;
  }

}
