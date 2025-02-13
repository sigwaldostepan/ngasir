import apiClient from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Product } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getProduct = async (id: number): Promise<Product> => {
  const products = await apiClient.get(`/products/${id}`);

  return products.data;
};

type UseGetProductByIdOptions = {
  id: number;
  config?: MutationConfig<typeof getProduct>;
};

const useGetProductById = ({ id, config }: UseGetProductByIdOptions) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    ...config,
  });
};

export default useGetProductById;
