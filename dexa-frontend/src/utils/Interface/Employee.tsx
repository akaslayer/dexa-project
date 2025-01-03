
export interface Employee {
    id: number;
    code: string;
    email: string;
    name: string;
    role:string;
  }

  export interface CreateEmployeeForm{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
  }