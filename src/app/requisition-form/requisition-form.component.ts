import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Requisition } from '../models/requisition.model';
import { RequisitionService } from '../service/requisition.service';
import { CommonModule } from '@angular/common';
import { Test } from '../models/test.model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-requisition-form',
  standalone: true,
  imports: [FormsModule, CommonModule,MatInputModule,MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule
  
  ],
  templateUrl: './requisition-form.component.html',
  styleUrls: ['./requisition-form.component.css']
})
export class RequisitionFormComponent {
  requisition: Requisition = {
    RequisitionId: '',
    TimeSampleTaken: new Date(),
    FirstName: '',
    Surname: '',
    Gender: 'U',
    DateOfBirth: new Date(),
    Age: 0,
    MobileNumber: '+27',
    RequestedTests: [],
  };

  reportFilename: string = ''; 
  format: 'json' | 'text' = 'json';

  tests: Test[] = []; 

  constructor(private requisitionService: RequisitionService) {
    this.tests = this.requisitionService.getTests(); 
  }

  onSubmit(): void {
    this.requisition.RequisitionId = this.generateRequisitionId();

   
    const today = new Date();
    const birthDate = new Date(this.requisition.DateOfBirth);
    this.requisition.Age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      this.requisition.Age -= 1;
    }

    this.requisitionService.addRequisition(this.requisition);
    console.log(this.requisition);
    alert('Requisition submitted!');
  }

  generateReport(): void {
    if (!this.requisition.RequisitionId) {
      alert('Please submit the requisition first to generate a report.');
      return;
    }

    const fileName = `${this.reportFilename || 'requisition'}_${this.requisition.RequisitionId}.${this.format}`;
    this.requisitionService.generateReport(this.requisition, this.format, fileName);
  }

  isTestSelected(testId: number): boolean {
    return this.requisition.RequestedTests.some((test) => test.TestId === testId);
  }

  onTestSelectionChange(test: Test) {
    const index = this.requisition.RequestedTests.findIndex((t) => t.TestId === test.TestId);
    if (index >= 0) {
   
      this.requisition.RequestedTests.splice(index, 1);
    } else {
      this.requisition.RequestedTests.push({ TestId: test.TestId, Result: '', Comment: '' });
    }
  }

  updateTestResult(testId: number, result: string): void {
    const testRequest = this.requisition.RequestedTests.find(r => r.TestId === testId);
    if (testRequest) {
      testRequest.Result = result;
    }
  }

  updateTestComment(testId: number, comment: string): void {
    const testRequest = this.requisition.RequestedTests.find(r => r.TestId === testId);
    if (testRequest) {
      testRequest.Comment = comment;
    }
  }

  generateRequisitionId(): string {
    const min = 1;
    const max = 9999;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomId.toString().padStart(4, '0');
  }
}
