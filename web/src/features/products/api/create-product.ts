import apiClient from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { CreateProductSchema } from '../forms/create-product';
import { MutationConfig } from '@/lib/react-query';

const createProduct = async (payload: CreateProductSchema) => {
  try {
    const response = await apiClient.post('/products', payload);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useCreateProductMutation = (
  config: MutationConfig<typeof createProduct>
) => {
  const mutation = useMutation({
    mutationKey: ['create-product'],
    mutationFn: createProduct,
    ...config,
  });

  return {
    createProduct: mutation.mutateAsync,
    ...mutation,
  };
};

export default useCreateProductMutation;
