export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

export interface User {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}