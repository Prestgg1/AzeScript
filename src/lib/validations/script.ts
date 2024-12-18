import { z } from 'zod';

// Script forması üçün doğrulama sxemi
export const scriptSchema = z.object({
  title: z
    .string()
    .min(2, 'Skript adı ən az 2 simvol olmalıdır')
    .max(100, 'Skript adı çox uzundur'),
  category: z
    .string()
    .min(1, 'Kateqoriya seçimi tələb olunur'),
  price: z
    .number()
    .min(0, 'Qiymət 0-dan kiçik ola bilməz')
    .optional(),
  isFree: z
    .boolean(),
  description: z
    .string()
    .min(10, 'Açıqlama ən az 10 simvol olmalıdır')
    .max(1000, 'Açıqlama çox uzundur'),
  file: z
    .instanceof(File, { message: 'Skript faylı tələb olunur' })
    .refine((file) => {
      const validTypes = ['.zip', '.rar', '.7zip'];
      return validTypes.some(type => file.name.endsWith(type));
    }, 'Yanlış fayl formatı. Yalnız .zip, .rar və ya .7zip faylları yükləyə bilərsiniz.')
});
