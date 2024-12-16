import { z } from 'zod';

// Login form validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-poçt ünvanı tələb olunur')
    .email('Etibarlı bir e-poçt ünvanı daxil edin'),
  password: z
    .string()
    .min(6, 'Şifrə ən az 6 simvol olmalıdır'),
  rememberMe: z.boolean().optional(),
});

// Registration form validation schema
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Ad ən az 2 simvol olmalıdır')
    .max(50, 'Ad çox uzundur'),
  lastName: z
    .string()
    .min(2, 'Soyad ən az 2 simvol olmalıdır')
    .max(50, 'Soyad çox uzundur'),
  email: z
    .string()
    .min(1, 'E-poçt ünvanı tələb olunur')
    .email('Etibarlı bir e-poçt ünvanı daxil edin'),
  password: z
    .string()
    .min(6, 'Şifrə ən az 6 simvol olmalıdır')
    .max(100, 'Şifrə çox uzundur'),
  confirmPassword: z
    .string()
    .min(1, 'Şifrə təkrarı tələb olunur'),
  terms: z
    .boolean()
    .refine(val => val === true, {
      message: 'İstifadə şərtlərini qəbul etməlisiniz',
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifrələr uyğun deyil",
  path: ["confirmPassword"],
});

// Forgot password validation schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'E-poçt ünvanı tələb olunur')
    .email('Etibarlı bir e-poçt ünvanı daxil edin'),
});
