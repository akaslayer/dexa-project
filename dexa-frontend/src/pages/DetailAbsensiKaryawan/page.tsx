import TabelDetailAbsensiKaryawan from "@/components/TabelDetailAbsensiKaryawan";
import useAttendences from "@/hooks/useAttendences";
import { Attendances } from "@/utils/Interface/Attendence";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const DetailAbsensiKaryawan = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [employeeAttendences, setEmployeeAttendences] = useState<Attendances[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { fetchAllAttendences } = useAttendences();
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = async () => {
      if (!userId) return;

      try {
        const response = await fetchAllAttendences(currentPage, userId);
        setEmployeeAttendences(response.data.attendances);
        setUserName(response.data.name);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    if (userId) {
      getEmployees();
    }
  }, [currentPage]);

  return (
    <div className="p-2 lg:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center border-b py-5 lg:p-5">
          <div className="flex flex-col">
            <div
              className="flex my-5 items-center gap-4 hover:bg-gray-100 p-2 rounded-md shadow-sm w-fit cursor-pointer"
              onClick={() => navigate("/admin/absensi-karyawan")}
            >
              <ArrowLeft size={20} />
              <h1 className="text-xl font-bold">Back</h1>
            </div>
            <h1 className="text-3xl font-bold text-black">
              Detail Absensi Karyawan
            </h1>
            <p>
              Halaman ini digunakan monitoring absensi karyawan bernama{" "}
              <span className="font-bold">{userName}.</span>
            </p>
          </div>
        </div>
        <TabelDetailAbsensiKaryawan
          employeeAttendances={employeeAttendences}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DetailAbsensiKaryawan;
