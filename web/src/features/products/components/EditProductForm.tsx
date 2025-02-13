import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { useFormContext } from 'react-hook-form';
import { EditProductSchema } from '../forms/edit-product';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/router';
import Spinner from '@/components/ui/Spinner';

type EditProductFormProps = {
  onSubmit: (values: EditProductSchema) => void;
  isSubmitting: boolean;
};

const EditProductForm = ({ onSubmit, isSubmitting }: EditProductFormProps) => {
  const router = useRouter();

  const form = useFormContext<EditProductSchema>();

  const disabled = !form.formState.isDirty || isSubmitting;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Nama produk</FormLabel>
              <FormControl>
                <Input placeholder="Masukkin nama produk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        name="price"
        control={form.control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Harga produk</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkin harga produk"
                  {...field}
                  type="number"
                  value={Number(field.value).toString()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <div className="w-full flex items-center justify-end mt-2 gap-4">
        <Button type="button" onClick={() => router.back()} variant="ghost">
          Kembali
        </Button>
        <Button type="submit" disabled={disabled}>
          {isSubmitting && <Spinner />}Simpen perubahan
        </Button>
      </div>
    </form>
  );
};

export default EditProductForm;
