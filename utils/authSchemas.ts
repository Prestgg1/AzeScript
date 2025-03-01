import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const loginSchema = toTypedSchema(z.object({
    email: z.string().min(1, { message: 'Bu sahə tələb olunur' }).email({ message: 'Düzgün e-poçt ünvanı deyil' }),
    password: z.string().min(1, { message: 'Bu sahə tələb olunur' }).min(8, { message: 'Çox qısa parol' }),
    rememberMe: z.boolean(),
}));


export const registerSchema = toTypedSchema(z.object({
    email: z.string().min(1, { message: 'Bu sahə tələb olunur' }).email({ message: 'Düzgün e-poçt ünvanı deyil' }),
    name: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
    username: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
    password: z.string().min(1, { message: 'Bu sahə tələb olunur' }).min(8, { message: 'Çox qısa parol' }),
    confirmPassword: z.string().min(1, { message: 'Bu sahə tələb olunur' }).min(8, { message: 'Çox qısa parol' }),
    agreeToTerms: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Parolalar eyni olmalıdır',
    path: ['confirmPassword']
}));
