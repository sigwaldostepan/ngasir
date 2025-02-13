import PageContainer from '@/components/layouts/PageContainer';
import SectionContainer from '@/components/layouts/SectionContainer';
import { Form } from '@/components/ui/Form';
import { useRouter } from 'next/router';
import useGetProductById from '../api/get-product';
import { editProductSchema, EditProductSchema } from '../forms/edit-product';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import HeadMetaData from '@/components/seo/HeadMetaData';
import { Skeleton } from '@/components/ui/Skeleton';
import Spinner from '@/components/ui/Spinner';
import useEditProductMutation from '../api/edit-product';
import EditProductForm from '../components/EditProductForm';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const EditProductPage = () => {
  const router = useRouter();

  const { data: product, isPending: isFetching } = useGetProductById({
    id: Number(router.query.id),
  });

  const form = useForm<EditProductSchema>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: '',
      price: 0,
    },
  });

  const { editProduct, isPending } = useEditProductMutation({
    onSuccess: () => {
      toast.success('Produk berhasil diedit');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(error.message);
      }
    },
  });

  const onSubmit = (values: EditProductSchema) => {
    try {
      toast.promise(editProduct({ id: product?.id as number, values }), {
        loading: 'Bntr, lgi ngeditin',
      });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        price: product.price,
      });
    }
  }, [product, form]);

  return (
    <>
      <HeadMetaData title="Edit produk" />
      <PageContainer>
        <SectionContainer
          padded
          minHScreen
          className="flex items-center justify-center"
        >
          <Card className="w-full max-w-sm lg:max-w-md relative">
            {isFetching && (
              <Skeleton className="absolute inset-0 w-full h-full flex items-center justify-center z-10 backdrop-blur-[2px]">
                <Spinner />
              </Skeleton>
            )}
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Edit Produk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <EditProductForm isSubmitting={isPending} onSubmit={onSubmit} />
              </Form>
            </CardContent>
          </Card>
        </SectionContainer>
      </PageContainer>
    </>
  );
};

export default EditProductPage;
