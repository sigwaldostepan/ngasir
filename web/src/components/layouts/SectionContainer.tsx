import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

type SectionContainerProps = {
  padded?: boolean;
  minHScreen?: boolean;
};

const SectionContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & SectionContainerProps
>(({ className, children, padded, minHScreen }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        'container flex flex-col xl:max-w-screen-lg',
        padded && 'px-6 py-4 md:py-4',
        minHScreen && 'min-h-[calc(100vh-64px)]',
        className
      )}
    >
      {children}
    </section>
  );
});

SectionContainer.displayName = 'SectionContainer';

export default SectionContainer;
