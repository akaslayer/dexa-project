import { Attendances } from "@/utils/Interface/Attendence";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { Dispatch, SetStateAction, useState } from "react";
import DialogModal from "./Dialog";
import TabelAdminPagination from "./TabelAdminPagination";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import no_image from "@/assets/no-image.png";

interface EmployeeAttendencesProps {
  employeeAttendances: Attendances[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const TabelDetailAbsensiKaryawan: React.FC<EmployeeAttendencesProps> = ({
  employeeAttendances,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const [activeImages, setActiveImages] = useState<Record<string, string>>({});

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-green-500 text-white";
      case "Tertunda":
        return "bg-yellow-500 text-white";
      case "Tidak Hadir":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const mapStatus = (status: string) => {
    switch (status) {
      case "Complete":
        return "Selesai";
      case "Absent":
        return "Tidak Hadir";
      case "Pending":
        return "Tertunda";
      default:
        return status;
    }
  };

  const dialogTrigger = <Button>Bukti Absensi</Button>;

  const dialogContent = (item: Attendances) => {
    const handleThumbnailClick = (proofImage: string) => {
      setActiveImages((prev) => ({ ...prev, [item.date]: proofImage }));
    };

    if (item.proofs && item.proofs.length > 0 && !activeImages[item.date]) {
      setActiveImages((prev) => ({
        ...prev,
        [item.date]: item.proofs[0]?.img_proof,
      }));
    }

    return (
      <>
        <Card className="bg-white h-full w-full overflow-hidden">
          <CardContent className="p-2">
            <div className="relative w-full">
              <img
                src={
                  activeImages[item.date] ||
                  (item.proofs?.length > 0
                    ? item.proofs[0]?.img_proof
                    : no_image)
                }
                alt="main"
                className="rounded-md object-cover w-full h-72"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-2">
          {item.proofs.map((proof, index) => (
            <Card
              key={index}
              className={`bg-white p-1 cursor-pointer hover:shadow-md duration-300 overflow-hidden 
                ${
                  activeImages[item.date] === proof.img_proof
                    ? "ring-2 ring-blue-500"
                    : ""
                }
              `}
              onClick={() => handleThumbnailClick(proof.img_proof)}
            >
              <CardContent className="p-0">
                <div className="relative w-full h-24">
                  <img
                    src={proof.img_proof}
                    alt={`Thumbnail ${index + 1}`}
                    className="rounded-md object-cover w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    );
  };

  const dialogFooter = <></>;

  return (
    <div className="lg:px-10">
      <div className="min-h-80">
        {employeeAttendances.length === 0 ? (
          <div className="text-center text-lg text-gray-500">
            No attendance data available.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomor</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jam Masuk</TableHead>
                <TableHead>Jam Keluar</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeAttendances.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {format(item.date, "d MMMM yyyy", { locale: id })}
                    </TableCell>
                    <TableCell>
                      {item.time_in != null
                        ? format(
                            parse(item.time_in, "HH:mm:ss", new Date()),
                            "HH:mm"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {item.time_out != null
                        ? format(
                            parse(item.time_out, "HH:mm:ss", new Date()),
                            "HH:mm"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getBadgeColor(
                          mapStatus(item.status)
                        )} inline-flex items-center justify-center w-28 h-6`}
                      >
                        {mapStatus(item.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex justify-center items-center">
                      {item.status !== "Absent" && (
                        <DialogModal
                          trigger={dialogTrigger}
                          title="Bukti Absensi Karyawan"
                          description="Anda dapat melihat bukti absensi karyawan disini."
                          content={dialogContent(item)}
                          footer={dialogFooter}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
      <TabelAdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TabelDetailAbsensiKaryawan;
