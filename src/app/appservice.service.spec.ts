import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppserviceService, Employee } from './appservice.service';
import { Observable } from 'rxjs';
import { mockAppserviceService } from './add-record/mock-service';

describe('AppserviceService', () => {
  let service: AppserviceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpClient
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get employees', () => {
    service.getEmployees().subscribe(data => {
      expect(data).toBeTruthy();
    })
  });

  it('should be get employee by id', () => {
    service.getEmployeebyId(0).subscribe(data => {
      expect(data).toBeTruthy();
    })
  });

  it('should be add employee', () => {
    service.addEmployees(new mockAppserviceService().Data[0]).subscribe(data => {
      expect(data.status).toEqual('ok');
    })
  });

  it('should be update employee', () => {
    service.updateEmployee(0, new mockAppserviceService().Data[0]).subscribe(data => {
      expect(data.status).toEqual('ok');
    })
  });

  it('should be delete employee', () => {
    service.deleteEmployee(0).subscribe(data => {
      expect(data.status).toEqual('ok');
    })
  });

});
