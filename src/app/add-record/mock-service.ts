import { Observable, of } from 'rxjs';
import { Employee, Response } from '../appservice.service';


export class mockAppserviceService {
    Data: Employee[] = [
        {
            "_id": "7",
            "name": "vivek",
            "designation": "developer",
            "salary": 5000,
            "type": "Full Time",
            "joiningDate": new Date("2021-01-19"),
        },
        {
            "_id": "8",
            "name": "test",
            "designation": "kjsvsjn",
            "salary": 3243,
            "type": "Contractor",
            "joiningDate": new Date("2021-01-19"),
        },
        {
            "_id": "9",
            "name": "hsbcsdhb",
            "designation": "696868",
            "salary": 89889,
            "type": "Full Time",
            "joiningDate": new Date("2021-01-19"),
        },
        {
            "_id": "10",
            "name": "jhsvhs",
            "designation": "7668",
            "salary": 66,
            "type": "Full Time",
            "joiningDate": new Date("2021-01-19"),
        }
    ]
    getEmployees(): Observable<Employee[]> {
        return of(this.Data);
    }

    getEmployeebyId(id): Observable<Employee[]> {
        return of(this.Data);
    }

    addEmployees(employee: Employee): Observable<Response> {
        return of({ status: 'ok', message: 'msg' });
    }
    updateEmployee(id, employee: Employee): Observable<Response> {
        return of({ status: 'ok', message: 'msg' });
    }
    deleteEmployee(id): Observable<Response> {
        return of({ status: 'ok', message: 'msg' });
    }
}

