import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, { message: "Пароль должен содержать не менее 4 символов" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Введите корректную почту" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: "Имя должно быть не менее 2 символов" }),
      email: z.string().email({ message: "Введите корректную почту" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type TformLoginSchema = z.infer<typeof formLoginSchema>;
export type TformRegisterSchema = z.infer<typeof formRegisterSchema>;
