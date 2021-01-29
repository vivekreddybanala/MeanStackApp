import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppserviceService } from '../appservice.service';

import { AddRecordComponent } from './add-record.component';
import { mockAppserviceService } from './mock-service';

describe('AddRecordComponent', () => {
  let component: AddRecordComponent;
  let fixture: ComponentFixture<AddRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRecordComponent],
      providers: [
        { provide: AppserviceService, useClass: mockAppserviceService },
        NgbActiveModal
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get record', () => {
    component.Id = 0;
    component.getRecord();
    expect(component.record.value).toBeTruthy();
  });

  it('should Add record', () => {
    component.record.patchValue(new mockAppserviceService().Data[0]);
    component.addRecord();
    expect(component.record.value).toBeTruthy();
  });
  it('should update record', () => {
    component.record.patchValue(new mockAppserviceService().Data[0]);
    component.Id = 1;
    component.addRecord();
    component.ngOnDestroy();
    expect(component.record.value).toBeTruthy();
  });
});
