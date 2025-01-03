import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginInterface } from "@/utils/Interface/Login";
import { loginSchema } from "@/utils/Schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MdLogin,
  MdOutlineAlternateEmail,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { SiLetsencrypt } from "react-icons/si";
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {Login} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data: LoginInterface) => {
    try {
      setIsLoading(true);
      const result  = await Login(data);    
      if(result.role == "Employee"){
        navigate("/home")
      }else if(result.role == "Admin"){
        navigate('/admin/manajemen-karyawan')
      }
    } catch (error) {
      Swal.fire({
        title: "Gagal Login!",
        text: "Email / Password salah !",
        icon: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 border-2 border-gray-100 rounded-lg shadow-md m-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 max-w-sm"
        >
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-3xl">Login</h1>
            <p className="text-gray-500 text-sm">
              Selamat datang, silahkan masukkan email dan password anda untuk
              login.
            </p>
          </div>

          <div className="flex flex-col text-base gap-2">
            <Label htmlFor="email">
              Email<span className="text-red-600">*</span>
            </Label>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <div className="p-4 border-[1px] border-gray-200 rounded-l-lg border-r-0">
                  <MdOutlineAlternateEmail className="text-gray-500 size-4" />
                </div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="masukkan email anda"
                  className={`rounded-l-none px-4 py-6 focus-visible:ring-0 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col text-xs gap-2">
            <Label htmlFor="password">
              Password<span className="text-red-600">*</span>
            </Label>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <div className="p-4 border-[1px] border-gray-200 rounded-l-lg border-r-0">
                  <SiLetsencrypt className="text-gray-500 size-4" />
                </div>
                <div className="relative w-full">
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="masukkan kata sandi anda"
                    className={`rounded-l-none px-4 py-6 focus-visible:ring-0 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <div
                    className="absolute right-5 bottom-1/2 translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <MdVisibility className="text-gray-500" size={20} />
                    ) : (
                      <MdVisibilityOff className="text-gray-500" size={20} />
                    )}
                  </div>
                </div>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`border-[1px] p-2 rounded-md border-gray-200 flex items-end gap-1 justify-center hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed ${
              isLoading ? "bg-gray-100" : ""
            }`}
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                Login <MdLogin size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
