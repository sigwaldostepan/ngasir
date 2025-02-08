import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

type SectionContainerProps = {
  title?: string;
  padded?: boolean;
  minHScreen?: boolean;
};

const SectionContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & SectionContainerProps
>(({ className, children, title, padded, minHScreen }) => {
  return (
    <section
      className={cn(
        'container flex flex-col xl:max-w-screen-lg',
        padded && 'px-6 py-4 md:py-4',
        minHScreen && 'min-h-[calc(100vh-64px)]',
        className
      )}
    >
      {title && (
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          {title}
        </h1>
      )}
      {children}
    </section>
  );
});

export default SectionContainer;
