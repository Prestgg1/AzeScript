import { z } from "zod";

// Script forması üçün doğrulama sxemi
export const scriptSchema = z.object({
  title: z.string().min(3, "Başlıq ən az 3 simvoldan ibarət olmalıdır"),
  category: z.string().min(1, "Kategoriya Seçilməlidir"),
  price: z.number().min(0, "Qiymət 0 dan aşağı ola bilməz"),
  description: z
    .string()
    .min(5, "Açıqlama hissəsi ən azı 5 simvoldan ibarət olmalıdır"),
  isFree: z.boolean(),
  scriptUrl: z.string().url("Geçerli bir URL girilmelidir"),
  demoUrl: z.string().url("Geçerli bir URL girilmelidir").optional(),
});
