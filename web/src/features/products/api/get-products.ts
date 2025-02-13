import apiClient from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ProductWithStock } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getProducts = async (): Promise<ProductWithStock[]> => {
  const response = await apiClient.get('/products');
  return response.data;
};

const useGetProducts = (config?: MutationConfig<typeof getProducts>) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    ...config,
  });
};

export default useGetProducts;
