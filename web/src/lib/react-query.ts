import { UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MutationFnType extends (...args: any) => Promise<any>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0] extends undefined
    ? void
    : Parameters<MutationFnType>[0]
>;
