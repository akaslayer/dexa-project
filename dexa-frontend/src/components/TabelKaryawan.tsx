import useEmployees from "@/hooks/useEmployees";
import { Employee } from "@/utils/Interface/Employee";
import { MoreHorizontal, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import EditEmployeeModal from "./EditEmployeeDialog";
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
import Swal from "sweetalert2";

const TabelKaryawan = () => {
  const { fetchAllEmployees, updateEmployee } = useEmployees();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateEmployee = async (formData: any) => {
    try {
      const result = await updateEmployee(formData);
      if (result) {
        Swal.fire({
          title: "Berhasil Melakukan Update Data Employee!",
          text: "Data employee berhasil diubah!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Gagal Merubah Data Employee!",
        text: "Terdapat kesalahan dalam server !",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await fetchAllEmployees(currentPage);
        setEmployees(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    getEmployees();
  }, [currentPage, handleUpdateEmployee]);

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
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
                          onClick={() => openEditModal(employee)}
                        >
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Edit
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

      <EditEmployeeModal
        isOpen={isModalOpen}
        selectedEmployee={selectedEmployee}
        onClose={closeModal}
        onSave={handleUpdateEmployee}
      />
    </div>
  );
};

export default TabelKaryawan;
