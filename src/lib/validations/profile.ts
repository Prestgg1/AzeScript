import { z } from 'zod';

// Profile form validation schema
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Ad Soyad en az 2 karakter olmalıdır')
    .max(50, 'Ad Soyad çok uzun'),
  email: z
    .string()
    .min(1, 'E-posta adresi gereklidir')
    .email('Geçerli bir e-posta adresi giriniz'),
  bio: z
    .string()
    .max(500, 'Biyografi çok uzun')
    .optional(),
  location: z
    .string()
    .max(100, 'Konum çok uzun')
    .optional(),
  website: z
    .string()
    .url('Geçerli bir URL giriniz')
    .optional(),
});

// Password change validation schema
export const passwordChangeSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Mevcut şifre gereklidir'),
  newPassword: z
    .string()
    .min(6, 'Yeni şifre en az 6 karakter olmalıdır')
    .max(100, 'Yeni şifre çok uzun'),
});