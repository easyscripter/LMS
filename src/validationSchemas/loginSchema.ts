import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(2, { message: "Пожалуйста, введите имя пользователя" }),
    password: z.string().min(1, { message: "Пожалуйста, введите пароль" })
        .min(8, { message: "Пароль должен содержать не менее 8 символов" })
        .max(32, { message: "Пароль должен содержать не более 32 символов" }),
})