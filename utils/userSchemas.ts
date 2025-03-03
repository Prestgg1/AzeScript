import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const scriptSchema = toTypedSchema(z.object({
    name: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
    slug: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
    category: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
    features: z.string().min(1, { message: 'Bu sahə tələb olunur' }),
    requirements: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
    description: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
    image: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
}));