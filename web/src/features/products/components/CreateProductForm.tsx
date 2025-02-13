import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { CreateProductSchema } from '../forms/create-product';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

type CreateProductFormProps = {
  onSubmit: (values: CreateProductSchema) => void;
  isSubmitting: boolean;
};

const CreateProductForm = ({
  onSubmit,
  isSubmitting,
}: CreateProductFormProps) => {
  const form = useFormContext<CreateProductSchema>();
  const router = useRouter();

  const buttonDisabled = !form.formState.isDirty || isSubmitting;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Nama Produk</FormLabel>
            <FormControl>
              <Input placeholder="Masukkin nama produk" {...field} />
            </FormControl>
            {fieldState.error ? (
              <FormMessage />
            ) : (
              <FormDescription>Minimal 3 karakter yak.</FormDescription>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Harga Produk</FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkin harga produk"
                type="number"
                {...field}
                value={Number(field.value).toString()}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="stock"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Stok Awal Produk</FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkin stok awal"
                type="number"
                {...field}
                value={Number(field.value).toString()}
              />
            </FormControl>
            {fieldState.error ? (
              <FormMessage />
            ) : (
              <FormDescription>Opsional</FormDescription>
            )}
          </FormItem>
        )}
      />

      <div className="flex items-center justify-end mt-4 gap-4">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Kembali
        </Button>
        <Button type="submit" disabled={buttonDisabled}>
          {isSubmitting && <Spinner />}
          Buat Produk
        </Button>
      </div>
    </form>
  );
};

export default CreateProductForm;
