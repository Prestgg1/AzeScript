import { z } from "zod";

// Login form validation schema
export const contactSchema = z.object({
    email: z
        .string()
        .min(1, "E-poçt ünvanı tələb olunur")
        .email("Etibarlı bir e-poçt ünvanı daxil edin"),
    name: z.string().min(2, "Ad 2 herifden böyük olmalıdır. "),
    message: z.string().min(10, "Messajınız 10 simvoldan çox olmalıdır"),
});

export type ContactFormSchema = z.infer<typeof contactSchema>;