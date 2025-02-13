import PageContainer from '@/components/layouts/PageContainer';
import SectionContainer from '@/components/layouts/SectionContainer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  createProductSchema,
  CreateProductSchema,
} from '../forms/create-product';
import useCreateProductMutation from '../api/create-product';
import { toast } from 'sonner';
import React from 'react';
import { Form } from '@/components/ui/Form';
import CreateProductForm from '../components/CreateProductForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import HeadMetaData from '@/components/seo/HeadMetaData';

const CreateProductPage = () => {
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
    },
  });

  const { createProduct, isPending } = useCreateProductMutation({
    onSuccess: () => {
      toast.success('Produk berhasil ditambahin');
      form.reset();
    },
    onError: () => {
      toast.error('Gagal nambahin produk');
    },
  });

  const onSubmit = async (values: CreateProductSchema) => {
    try {
      const response = await createProduct(values);

      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <HeadMetaData title="Buat produk" />
      <PageContainer>
        <SectionContainer
          padded
          minHScreen
          className="flex items-center justify-center"
        >
          <Card className="w-full max-w-sm lg:max-w-md">
            <CardHeader>
              <CardTitle className="font-bold text-2xl md:text-3xl">
                Tambah Produk Baru
              </CardTitle>
              <CardDescription>Angjay produk baru nich</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <CreateProductForm
                  isSubmitting={isPending}
                  onSubmit={onSubmit}
                />
              </Form>
            </CardContent>
          </Card>
        </SectionContainer>
      </PageContainer>
    </>
  );
};

export default CreateProductPage;
