

import { Requestlab } from './requestlab.model';

export interface Requisition {
    RequisitionId: string; 
    TimeSampleTaken: Date;
    FirstName: string;
    Surname: string;
    Gender: string; 
    DateOfBirth: Date;
    Age: number;
    MobileNumber: string;
    RequestedTests: Requestlab[];
  }