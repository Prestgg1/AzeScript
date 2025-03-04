import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const loginSchema = toTypedSchema(z.object({
    email: z.string({message: "Bu sahə tələb olunur"}).min(1, { message: 'Bu sahə tələb olunur' }).email({ message: 'Düzgün e-poçt ünvanı deyil' }),
    password: z.string({ message: 'Bu sahə tələb olunur' }).min(1, { message: 'Bu sahə tələb olunur' }).min(8, { message: 'Çox qısa parol' }),
    rememberMe: z.boolean({ message: 'Bu sahə tələb olunur' }).optional(),
}));


export const registerSchema = toTypedSchema(z.object({
    email: z.string({ message: 'Bu sahə tələb olunur' }).min(1, { message: 'Bu sahə tələb olunur' }).email({ message: 'Düzgün e-poçt ünvanı deyil' }),
    name: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    username: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    password: z.string({ message: 'Bu sahə tələb olunur' }).min(1, { message: 'Bu sahə tələb olunur' }).min(8, { message: 'Çox qısa parol' }),
    confirmPassword: z.string({ message: 'Bu sahə tələb olunur' }).min(1, { message: 'Bu sahə tələb olunur' }).min(8, { message: 'Çox qısa parol' }),
    agreeToTerms: z.boolean({ message: 'Bu sahə tələb olunur' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Parolalar eyni olmalıdır',
    path: ['confirmPassword']
}));
