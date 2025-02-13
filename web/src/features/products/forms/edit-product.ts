import { z } from 'zod';

export const editProductSchema = z.object({
  name: z
    .string()
    .min(3, 'Nama produk minimal 3 karakter')
    .max(80, 'Nama produk maksimal 80 karakter')
    .optional(),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, 'Harga produk miniaml Rp. 1 deck').optional()
  ),
});

export type EditProductSchema = z.infer<typeof editProductSchema>;
