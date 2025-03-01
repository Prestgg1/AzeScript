import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const categorySchema = toTypedSchema(z.object({
    name: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
    slug: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
    description: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
    image: z.string().min(2, { message: 'Bu sahə tələb olunur' }),
}));