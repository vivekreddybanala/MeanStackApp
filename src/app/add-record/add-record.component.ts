import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppserviceService } from '../appservice.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit, OnDestroy {
  @Input() set setId(Id) {
    console.log(Id);
    if (Id >= 0) {
      this.Id = Id;
      this.getRecord();
    }

  }
  Id: number;
  record: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
    type: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required)
  });

  subscriptions: Subscription[] = [];

  constructor(private service: AppserviceService, private _bsModalRef: NgbActiveModal) { }

  ngOnInit(): void {
  }

  // GET employee details by using ID
  getRecord() {
    this.subscriptions[0] = this.service.getEmployeebyId(this.Id).subscribe(data => {
      this.record.patchValue({
        name: data[0].name,
        designation: data[0].designation,
        salary: data[0].salary,
        type: data[0].type,
        joiningDate: data[0].joiningDate
      })
    })
  }

  // POST add employee to DB
  addRecord(): void {
    if (!this.Id) {
      this.subscriptions[1] = this.service.addEmployees(this.record.value).subscribe(data => {
        if (data.status === 'ok') {
          this._bsModalRef.close();
        }
      })
    } else {
      this.subscriptions[2] = this.service.updateEmployee(this.Id, this.record.value).subscribe(data => {
        if (data.status === 'ok') {
          this._bsModalRef.close();
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(item => {
      if (item) {
        item.unsubscribe();
      }
    })
  }
}
