import PageContainer from '@/components/layouts/PageContainer';
import SectionContainer from '@/components/layouts/SectionContainer';
import HeadMetaData from '@/components/seo/HeadMetaData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { MoreHorizontal } from 'lucide-react';
import ProductTableRow from '../components/ProductTableRow';
import useGetProducts from '../api/get-products';
import Link from 'next/link';

const ProductPage = () => {
  const { data: products, isPending } = useGetProducts();

  return (
    <>
      <HeadMetaData title="Daftar produk" />
      <PageContainer>
        <SectionContainer padded>
          <div className="mt-4 flex w-full items-center justify-between">
            <span className="h-fit w-fit">
              <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
                Daftar Produk
              </h1>
            </span>
            <Link href="/products/new">
              <Button>Tambah produk</Button>
            </Link>
          </div>

          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                // show skeleton when still fetching
                isPending && !products ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="flex justify-end">
                        <Button variant="ghost" size="icon" disabled>
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : // if there's no product yet
                (products?.length as number) <= 0 ? (
                  <TableRow>
                    <TableCell rowSpan={4}>Blom ada produk nich</TableCell>
                  </TableRow>
                ) : (
                  products?.map((product) => {
                    return (
                      <ProductTableRow key={product.id} product={product} />
                    );
                  })
                )
              }
            </TableBody>
          </Table>
        </SectionContainer>
      </PageContainer>
    </>
  );
};

export default ProductPage;
