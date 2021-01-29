import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { mockAppserviceService } from './add-record/mock-service';
import { AppComponent } from './app.component';
import { AppserviceService, Employee, Response } from './appservice.service';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AppserviceService, useClass: mockAppserviceService },
        NgbModal, HttpClient
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Mean Stack Application'`, () => {
    expect(component.title).toEqual('Mean Stack Application');
  });
  it('should get Data', () => {
    component.ngOnInit();
    expect(component.employees$).toBeTruthy();
  });
  it('should get Data', () => {
    component.ngOnInit();
    expect(component.employees$).toBeTruthy();
  });

  it('should get load Component', () => {
    component.load(0);
    expect(document.getElementById('AddRecordComponent')).toBeTruthy();
  });

  it('should get delete employee record', () => {
    component.delete(0);
    expect(component.employees$).toBeTruthy();
  });

});
