import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppserviceService, Employee, Response } from './appservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRecordComponent } from './add-record/add-record.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModal]

})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Mean Stack Application';
  employees$: Observable<Employee[]>;
  deleteEmployee: Subscription;
  constructor(private service: AppserviceService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.employees$ = this.service.getEmployees();
  }

  // Load component to add record using model service
  load(id?: number): void {
    const modelComponent = this.modalService.open(AddRecordComponent)
    modelComponent.componentInstance.setId = id;
    modelComponent.result.then(item => {
      this.ngOnInit();
    }).catch(err => {
      console.log(err);
    });
  }

  // DELETE Employee using ID
  delete(id: number) {
    this.deleteEmployee = this.service.deleteEmployee(id).subscribe((res: Response) => {
      if (res.status === 'ok') {
        this.ngOnInit();
      }
    })
  }
  ngOnDestroy(): void {
    this.deleteEmployee.unsubscribe();
  }
}
