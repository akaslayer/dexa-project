import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import useAttendences from "@/hooks/useAttendences";
import { TodayAttendance } from "@/utils/Interface/Attendence";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Swal from "sweetalert2";
import { id } from "date-fns/locale";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  imageFile: z
    .any()
    .refine((files) => files?.length > 0, "Image is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max image size is 5MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

type FormValues = z.infer<typeof formSchema>;

const Home = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { userData, fetchUserData } = useAuth();
  const [employeeAttendanceData, setEmployeeAttendanceData] =
    useState<TodayAttendance>();
  const {
    fetchEmployeeAttendanceToday,
    createNewEmployeeAttendance,
    updateEmployeeAttendance,
  } = useAttendences();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0];
      const currentTime = now.toTimeString().split(" ")[0];

      const formData = new FormData();
      formData.append("imageFile", data.imageFile[0]);
      formData.append("attendanceDate", currentDate);
      formData.append("attendanceTime", currentTime);
      if (!employeeAttendanceData || !employeeAttendanceData.time_in) {
        await createNewEmployeeAttendance(formData);
      } else {
        await updateEmployeeAttendance(formData);
      }
      Swal.fire({
        title: "Absensi Karyawan Berhasil!",
        text: "Absensi berhasil dicatat.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Absensi Karyawan Gagal!",
        text: "Absensi gagal dicatat.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const getEmployeeAttendanceToday = async () => {
      try {
        const response = await fetchEmployeeAttendanceToday();
        setEmployeeAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching employee attendance:", error);
      }
    };

    getEmployeeAttendanceToday();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const today = new Date();
  const formattedDate = format(today, "d MMMM yyyy", { locale: id });

  const UserDataDisplay: React.FC<any> = ({ userData }) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">
            Name<span className="text-red-600">*</span>
          </Label>
          <Input
            type="text"
            disabled={true}
            value={userData?.name}
            className="disabled:opacity-100 rounded-l-none px-4 py-6 focus-visible:ring-0 disabled:text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">
            Email<span className="text-red-600">*</span>
          </Label>
          <Input
            type="email"
            disabled={true}
            value={userData?.email}
            className="disabled:opacity-100 rounded-l-none px-4 py-6 focus-visible:ring-0 disabled:text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="jabatan">
            Jabatan<span className="text-red-600">*</span>
          </Label>
          <Input
            type="text"
            disabled={true}
            value={userData?.role}
            className="disabled:opacity-100 rounded-l-none px-4 py-6 focus-visible:ring-0 disabled:text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="kode">
            Kode Karyawan<span className="text-red-600">*</span>
          </Label>
          <Input
            type="text"
            disabled={true}
            value={userData?.code}
            className="disabled:opacity-100 rounded-l-none px-4 py-6 focus-visible:ring-0 disabled:text-black"
          />
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:px-28 px-10 py-10">
      <h1 className="text-3xl font-semibold">
        Absensi Karyawan{" "}
        {!employeeAttendanceData
          ? "Masuk"
          : employeeAttendanceData.time_in && !employeeAttendanceData.time_out
          ? "Pulang"
          : ""}
      </h1>
      <div className="flex flex-col justify-between lg:flex-row gap-5">
        <div className="flex flex-col gap-8 mt-5 lg:flex-row">
          <div className="flex flex-col p-5 shadow-md border-2 border-gray-100">
            <div className="w-full flex flex-col items-center rounded-md">
              <div className="relative w-40 h-40 md:w-80 md:h-80 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Camera className="w-20 h-20 text-gray-400" />
                )}
              </div>
              <div className="flex flex-col items-center">
                <div>
                  <input
                    type="file"
                    id="upload-input"
                    {...register("imageFile")}
                    onChange={(e) => {
                      register("imageFile").onChange(e);
                      handleImageUpload(e);
                    }}
                    className="hidden"
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  />
                  <label
                    htmlFor="upload-input"
                    className="inline-block px-4 py-2 rounded cursor-pointer text-white bg-black hover:bg-gray-500"
                  >
                    Upload Bukti
                  </label>
                </div>
                {errors.imageFile && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.imageFile.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col p-5 shadow-md gap-4 max-w-sm lg:min-w-96">
            <h2 className="font-semibold">Data Karyawan</h2>
            <UserDataDisplay userData={userData} />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Table className="w-96 border-[2px] border-gray-100 shadow-md">
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-full text-center font-bold bg-black text-white"
                  colSpan={2}
                >
                  {formattedDate}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell
                  className="border-[1px] text-sm font-semibold w-32"
                  colSpan={1}
                >
                  Jam Masuk
                </TableCell>
                <TableCell
                  className="border-[1px] text-center w-40"
                  colSpan={1}
                >
                  {employeeAttendanceData && employeeAttendanceData.time_in
                    ? format(
                        parse(
                          employeeAttendanceData.time_in,
                          "HH:mm:ss",
                          new Date()
                        ),
                        "HH:mm"
                      )
                    : ""}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className="border-[1px] text-sm font-semibold w-32"
                  colSpan={1}
                >
                  Jam Keluar
                </TableCell>
                <TableCell
                  className="border-[1px] text-center w-40"
                  colSpan={1}
                >
                  {employeeAttendanceData && employeeAttendanceData.time_out
                    ? format(
                        parse(
                          employeeAttendanceData.time_out,
                          "HH:mm:ss",
                          new Date()
                        ),
                        "HH:mm"
                      )
                    : ""}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <button
            type="submit"
            className="inline-block px-4 py-2 rounded cursor-pointer border-[1px] border-black shadow-md hover:bg-gray-200 font-bold"
            style={{
              display:
                employeeAttendanceData?.time_in &&
                employeeAttendanceData?.time_out
                  ? "none"
                  : "inline-block",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Home;
