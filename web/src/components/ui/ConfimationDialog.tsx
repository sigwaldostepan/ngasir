import * as React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './AlertDialog';
import { Button } from './Button';
import { cn } from '@/lib/utils';

type ConfirmationDialogProps = {
  title?: string;
  description: string;
  destructiveAction?: boolean;
  confirmButtonText: string;
  handleClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm: (() => void) | ((...args: any[]) => any);
};

export const ConfirmationDialogWrapper = AlertDialog;

export const ConfirmationDialogInner = ({
  description,
  destructiveAction,
  title = 'Yakin gak nih?',
  confirmButtonText,
  handleClose,
  onConfirm,
}: ConfirmationDialogProps) => {
  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex items-center justify-end gap-4">
            <Button variant="secondary" onClick={handleClose}>
              Nggak
            </Button>
            <Button
              variant={destructiveAction ? 'outline' : 'default'}
              className={cn(
                destructiveAction &&
                  'border-red-600 text-red-600 hover:border-transparent hover:bg-destructive hover:text-foreground'
              )}
              onClick={onConfirm}
            >
              {confirmButtonText}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};
