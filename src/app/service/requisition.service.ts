import { Injectable } from '@angular/core';
import { Test } from '../models/test.model';
import { Requisition } from '../models/requisition.model';

@Injectable({
  providedIn: 'root',
})
export class RequisitionService {
  private tests: Test[] = [];
  private requisitions: Requisition[] = []; 

  constructor() {
    this.loadTests(); 
  }

  private loadTests(): void {
    this.tests = [
      { TestId: 1, Mnemonic: 'Na', Description: 'Sodium', IsActive: true, selected: false },
      { TestId: 2, Mnemonic: 'K', Description: 'Potassium', IsActive: true , selected: false},
      { TestId: 3, Mnemonic: 'Cr', Description: 'Creatinine', IsActive: true , selected: false},
      { TestId: 4, Mnemonic: 'Ucr', Description: 'Urine-Creatinine', IsActive: false , selected: false},
      { TestId: 5, Mnemonic: 'Ur', Description: 'Urea', IsActive: true , selected: false },
      { TestId: 6, Mnemonic: 'UCE', Description: 'Urea+Creatinine+Electrolytes', IsActive: true , selected: false },
    ];
  }

  public getTests(): Test[] {
    return this.tests.filter(test => test.IsActive);
  }

  public addRequisition(requisition: Requisition): void {
    this.requisitions.push(requisition);
  }
  public generateReport(requisition: Requisition, format: 'json' | 'text', fileName?: string): void {
    let reportContent: string;

    if (format === 'json') {
        reportContent = JSON.stringify(requisition, null, 2); //
    } else {
        reportContent = `
            Requisition ID: ${requisition.RequisitionId}
            Time Sample Taken: ${requisition.TimeSampleTaken}
            Patient Name: ${requisition.FirstName} ${requisition.Surname}
            Gender: ${requisition.Gender}
            Date of Birth: ${requisition.DateOfBirth}
            Age: ${requisition.Age}
            Mobile Number: ${requisition.MobileNumber}
            Requested Tests:
            ${requisition.RequestedTests.map(r => `Test ID: ${r.TestId}, Result: ${r.Result}, Comment: ${r.Comment}`).join('\n')}
        `;
    }

    const defaultFileName = `Requisition_Report_${new Date().toISOString().slice(0, 10)}.${format}`;
    const finalFileName = fileName || defaultFileName; 

    const blob = new Blob([reportContent], { type: format === 'json' ? 'application/json' : 'text/plain' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = finalFileName;

    document.body.appendChild(link);
    
    link.click();
    
    document.body.removeChild(link);
    console.log('Report generated:', reportContent);
}

}
