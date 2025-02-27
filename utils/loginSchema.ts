import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const loginSchema = toTypedSchema(z.object({
    email: z.string().min(1, { message: 'Bu sahə tələb olunur' }).email({ message: 'Düzgün e-poçt ünvanı deyil' }),
    password: z.string().min(1, { message: 'Bu sahə tələb olunur' }).min(8, { message: 'Çox qısa parol' }),
    rememberMe: z.boolean(),
}));

