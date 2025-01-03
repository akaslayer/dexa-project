import { z } from "zod";

export const NewEmployeeSchema = z
  .object({
    name: z.string().min(3, { message: "Nama harus diisi minimal 3 karakter" }),
    email: z
      .string()
      .email({ message: "Email tidak valid" })
      .nonempty({ message: "Email harus diisi" }),
    password: z
      .string()
      .min(6, { message: "Password harus memiliki minimal 6 karakter" })
      .nonempty({ message: "Password harus diisi" }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Konfirmasi password harus memiliki minimal 6 karakter",
      })
      .nonempty({ message: "Konfirmasi password harus diisi" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export const UpdateEmployeeSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
});
