import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const scriptSchema = toTypedSchema(z.object({
    title: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    slug: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    category: z.number({message: 'Bu sahə tələb olunur'}),
    features: z.string({ message: 'Bu sahə tələb olunur' }).min(1, { message: 'Bu sahə tələb olunur' }),
    price: z.string().optional(),
    keywords: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    requirements: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    content: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    description: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    image: z.string().optional(),
    demoLink: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
}));