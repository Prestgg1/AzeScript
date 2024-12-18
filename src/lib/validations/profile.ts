import { z } from 'zod';

// Profil forması üçün doğrulama sxemi
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Ad və Soyad ən az 2 simvol olmalıdır')
    .max(50, 'Ad və Soyad çox uzundur'),
  email: z
    .string()
    .min(1, 'E-poçt ünvanı tələb olunur')
    .email('Düzgün e-poçt ünvanı daxil edin'),
  bio: z
    .string()
    .max(500, 'Bioqrafiya çox uzundur')
    .optional(),
  location: z
    .string()
    .max(100, 'Məkan çox uzundur')
    .optional(),
  website: z
    .string()
    .url('Düzgün URL daxil edin')
    .optional(),
});

// Şifrə dəyişdirmə üçün doğrulama sxemi
export const passwordChangeSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Cari şifrə tələb olunur'),
  newPassword: z
    .string()
    .min(6, 'Yeni şifrə ən az 6 simvol olmalıdır')
    .max(100, 'Yeni şifrə çox uzundur'),
});
