import useEmployees from "@/hooks/useEmployees";
import { Employee } from "@/utils/Interface/Employee";
import { CalendarRangeIcon, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TabelAdminPagination from "./TabelAdminPagination";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export interface PaginationResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Employee[];
  totalPages: number;
  totalData: number;
  currentPage: number;
}

const TabelAbsensiKaryawan = () => {
  const { fetchAllEmployees } = useEmployees();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response: PaginationResponse = await fetchAllEmployees(
          currentPage
        );
        setEmployees(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    getEmployees();
  }, [currentPage]);

  const openAttendancePage = (employee: Employee) => {
    navigate(`/admin/absensi-karyawan/${employee.id}`);
  };

  return (
    <div className="lg:px-10">
      <div className="min-h-80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Karyawan</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.code}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={undefined} />
                        <AvatarFallback>
                          {(employee.name.split(" ")[0]?.charAt(0) || "") +
                            (employee.name.split(" ")[1]?.charAt(0) || "")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-bold text-base">{employee.name}</p>
                        <p className="text-gray-600 text-sm">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="flex justify-center items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => openAttendancePage(employee)}
                        >
                          <CalendarRangeIcon className="mr-1 h-4 w-4" />
                          Detail Absensi
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <TabelAdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TabelAbsensiKaryawan;
