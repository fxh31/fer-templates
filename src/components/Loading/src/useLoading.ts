import type { LoadingProps } from './typing';
import type { Ref } from 'vue';

import { unref } from 'vue';
import { createLoading } from './createLoading';

export interface UseLoadingOptions {
  target?: any;
  props?: Partial<LoadingProps>;
}

interface Fn {
  (): void;
}

export function useLoading(props: Partial<LoadingProps>): [Fn, Fn, (string) => void];
export function useLoading(opt: Partial<UseLoadingOptions>): [Fn, Fn, (string) => void];

export function useLoading(opt: Partial<UseLoadingOptions> | Partial<LoadingProps>): [Fn, Fn, (string) => void] {
  let props: Partial<LoadingProps>;
  let target: HTMLElement | Ref<ElRef> = document.body;
  // todo
}
