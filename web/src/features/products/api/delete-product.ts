import apiClient from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

const deleteProduct = async (id: number) => {
  return await apiClient.delete(`/products/${id}`);
};

const useDeleteProduct = (config?: MutationConfig<typeof deleteProduct>) => {
  const mutation = useMutation({
    mutationKey: ['delete-product'],
    mutationFn: deleteProduct,
    ...config,
  });

  return {
    deleteProduct: mutation.mutateAsync,
    ...mutation,
  };
};

export default useDeleteProduct;
