import DialogModal from "@/components/Dialog";
import TabelAdmin from "@/components/TabelKaryawan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useEmployees from "@/hooks/useEmployees";
import { CreateEmployeeForm } from "@/utils/Interface/Employee";
import { NewEmployeeSchema } from "@/utils/Schema/EmployeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { PiPlusCircle } from "react-icons/pi";
import Swal from "sweetalert2";

const ManajemenKaryawan = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { createNewEmployee } = useEmployees();

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prevState) => !prevState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEmployeeForm>({
    resolver: zodResolver(NewEmployeeSchema),
  });

  const onSubmit = async (formData: CreateEmployeeForm) => {
    try {
      const result = await createNewEmployee(formData);
      if (result.statusCode === 409) {
        await Swal.fire({
          title: "Gagal Melakukan Registrasi Karyawan!",
          text: "Email sudah digunakan, silahkan gunakan email lainya!",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Berhasil Melakukan Penambahan Data Karyawan!",
          text: "Karyawan berhasil didaftarkan!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setIsDialogOpen(false);
        reset();
      }
    } catch (err) {
      await Swal.fire({
        title: "Gagal Melakukan Registrasi Karyawan!",
        text: "Email sudah digunakan, silahkan gunakan email lainya!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const dialogTrigger = (
    <button className="flex items-center gap-2 rounded-lg p-2 border-2 border-gray-100 text-lg hover:bg-gray-100">
      <PiPlusCircle size={30} />
      <span className="hidden sm:inline">Tambah Karyawan</span>
    </button>
  );

  const formRef = useState<HTMLFormElement | null>(null);

  const dialogContent = (
    <form
      ref={(el) => formRef[1](el)}
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 py-4"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">
          Nama<span className="text-red-600">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          {...register("name")}
          className="border p-2 rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">
          Email<span className="text-red-600">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="border p-2 rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">
          Password<span className="text-red-600">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="border p-2 rounded-md"
          />
          <div className="absolute right-5 bottom-1/2 translate-y-1/2">
            {showPassword ? (
              <MdVisibility
                className="text-gray-500"
                onClick={togglePasswordVisibility}
                size={20}
              />
            ) : (
              <MdVisibilityOff
                className="text-gray-500"
                onClick={togglePasswordVisibility}
                size={20}
              />
            )}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">
          Konfirmasi Password<span className="text-red-600">*</span>
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className="border p-2 rounded-md"
          />
          <div className="absolute right-5 bottom-1/2 translate-y-1/2">
            {showConfirmPassword ? (
              <MdVisibility
                className="text-gray-500"
                onClick={toggleConfirmPasswordVisibility}
                size={20}
              />
            ) : (
              <MdVisibilityOff
                className="text-gray-500"
                onClick={toggleConfirmPasswordVisibility}
                size={20}
              />
            )}
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </form>
  );

  const dialogFooter = (
    <Button type="submit" onClick={() => formRef[0]?.requestSubmit()}>
      Simpan
    </Button>
  );

  return (
    <div className="p-5">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center border-b py-5 lg:p-5">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-black">
              Manajemen Karyawan
            </h1>
            <p>Halaman ini digunakan untuk mengelola data karyawan.</p>
          </div>
          <DialogModal
            trigger={dialogTrigger}
            title="Tambah Karyawan"
            description="Anda dapat mendaftarkan karyawan baru disini."
            content={dialogContent}
            footer={dialogFooter}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </div>
        <TabelAdmin />
      </div>
    </div>
  );
};

export default ManajemenKaryawan;
