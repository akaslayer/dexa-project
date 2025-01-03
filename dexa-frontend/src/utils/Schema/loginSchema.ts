import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .max(50, "Password maksimal 50 karakter"),
});
