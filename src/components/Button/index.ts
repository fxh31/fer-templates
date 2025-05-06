import type { ExtractPropTypes } from 'vue';

import { withInstall } from '@/utils';
import { buttonProps } from './src/props';
import button from './src/BasicButton.vue';

export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;
export const Button = withInstall(button);
