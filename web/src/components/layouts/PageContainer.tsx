import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

const PageContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn('w-full h-full flex flex-col', className)}
      {...props}
    >
      {children}
    </main>
  );
});

export default PageContainer;
