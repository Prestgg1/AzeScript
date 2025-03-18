import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const scriptSchema = toTypedSchema(z.object({
    title: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    slug: z.string().optional(),
    category: z.number({ message: 'Bu sahə tələb olunur' }),
    features: z.string({ message: 'Bu sahə tələb olunur' }).min(1, { message: 'Bu sahə tələb olunur' }),
    price: z.string().optional(),
    keywords: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    requirements: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    content: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    description: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    image: z.string().optional(),
    demoLink: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
}));

export const commentSchema = toTypedSchema(z.object({
    rating: z.number().min(1,{message:'Xal verməyi unutmayın'}),
    parrentId: z.number().optional(),
    content: z.string({message:'Bu yer yazılmalıdır'}).min(5,'Ən az 5 simvoldan ibarət olmalıdır')
}))