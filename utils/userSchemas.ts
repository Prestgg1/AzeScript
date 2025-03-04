import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const scriptSchema = toTypedSchema(z.object({
    name: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    slug: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    category: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    features: z.string({ message: 'Bu sahə tələb olunur' }).min(1, { message: 'Bu sahə tələb olunur' }),
    requirements: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    description: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    image: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
    demoLink: z.string({ message: 'Bu sahə tələb olunur' }).min(2, { message: 'Bu sahə tələb olunur' }),
}));