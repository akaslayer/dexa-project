
export interface EmployeeAttendences {
  id: number;
  name: string;
  email: string;
  code: string;
  attendances: Attendances[];
}

export interface Attendances {
  time_in: string | null;
  time_out: string | null;
  status: string;
  date: string;
  proofs: AttendanceProofs[];
}

export interface TodayAttendance {
  id:number;
  time_in: string | null;
  time_out: string | null;
  status: string;
  date: string;
  user_id:number;
}
interface AttendanceProofs {
  proof_id: number;
  img_proof: string;
}
