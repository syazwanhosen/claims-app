export type ClaimStatus = 'Submitted' | 'Approved' | 'Processed' | 'Completed' | 'Rejected';

export interface Claim {
  id: number;
  number: string;
  incidentDate: string;
  createdAt: string;
  amount: string;
  holder: string;
  policyNumber: string;
  insuredItem: string;
  description: string;
  processingFee: string;
  status: ClaimStatus;
}

export interface Policy {
  id: number;
  number: string;
  holder: string;
}
