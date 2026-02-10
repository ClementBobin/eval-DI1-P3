export type Status = "Available" | "Assigned" | "Completed";

export interface Contract {
  id: number;
  title: string;
  description: string;
  reward: string;
  status: Status;
  assignedTo: number | null;
}

export interface ContractForm {
  title: string;
  description: string;
  reward: string;
}

export interface IStatus {
    status: Status;
}