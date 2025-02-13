import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

type PageContainerProps = {
  title?: string;
};

const PageContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PageContainerProps
>(({ className, children, title, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn('w-full h-full flex flex-col', className)}
      {...props}
    >
      {title && (
        <span className="h-fit w-fit px-6 mt-8 md:mt-12">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
            {title}
          </h1>
        </span>
      )}
      {children}
    </main>
  );
});

PageContainer.displayName = 'PageContainer';

export default PageContainer;
