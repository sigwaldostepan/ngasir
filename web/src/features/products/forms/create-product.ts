import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string({ required_error: 'Nama produk gak boleh kosong' })
    .min(3, 'Nama produk minimal 3 karakter')
    .max(80, 'Nama produk maksimal 80 karakter'),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({ required_error: 'Harga produk gak boleh kosong' })
      .min(1, 'Harga produk miniaml Rp. 1 deck')
  ),
  stock: z.preprocess((val) => Number(val), z.number().default(0).optional()),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
