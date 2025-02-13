import { useMutation } from '@tanstack/react-query';
import { EditProductSchema } from '../forms/edit-product';
import apiClient from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

const editProduct = async ({
  id,
  values,
}: {
  id: number;
  values: EditProductSchema;
}) => {
  return await apiClient.put(`/products/${id}`, values);
};

const useEditProductMutation = (
  config?: MutationConfig<typeof editProduct>
) => {
  const mutation = useMutation({
    mutationKey: ['edit-product'],
    mutationFn: editProduct,
    ...config,
  });

  return {
    editProduct: mutation.mutateAsync,
    ...mutation,
  };
};

export default useEditProductMutation;
