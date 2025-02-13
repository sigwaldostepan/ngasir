import { Button } from '@/components/ui/Button';
import {
  ConfirmationDialogWrapper,
  ConfirmationDialogInner,
} from '@/components/ui/ConfimationDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { TableCell, TableRow } from '@/components/ui/Table';
import { useDisclosure } from '@/hooks/use-disclosure';
import { ProductWithStock } from '@/types/api';
import { useQueryClient } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import useDeleteProduct from '../api/delete-product';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { toRupiah } from '@/utils/to-rupiah';

type ProductTableRowProps = {
  product: ProductWithStock;
};

const ProductTableRow = ({ product }: ProductTableRowProps) => {
  const { open, close, isOpen } = useDisclosure(false);

  const queryClient = useQueryClient();
  const { deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produk berhasil dihapus');
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error(error.message);
      }
    },
  });

  const handleDeleteProduct = (id: number) => {
    toast.promise(deleteProduct(id), {
      loading: 'Bntr, lagi ngehapus datanya',
    });

    close();
  };

  const navigate = useRouter();

  return (
    <TableRow key={product.id}>
      <TableCell>{product.name}</TableCell>
      <TableCell>{toRupiah(product.price)}</TableCell>
      <TableCell>{product.stock.quantity}</TableCell>
      <TableCell className="flex justify-end">
        <ConfirmationDialogWrapper open={isOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Buka menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate.push(`/products/${product.id}`)}
              >
                Edit produk
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-700" onClick={open}>
                Hapus produk
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ConfirmationDialogInner
            confirmButtonText="Yess, hapus ae ni item"
            description="Kamu yakin mau hapus item ini? Ga bisa direstore loo"
            destructiveAction
            handleClose={close}
            onConfirm={() => handleDeleteProduct(product.id)}
          />
        </ConfirmationDialogWrapper>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
