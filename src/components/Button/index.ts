import type { ExtractPropTypes } from 'vue';

import { withInstall } from '@/utils';
import { buttonProps } from './src/props';
import button from './src/BasicButton.vue';
import popConfirmButton from './src/PopConfirmButton.vue';
import modelConfirmButton from './src/ModelConfirmButton.vue';

export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;
export const Button = withInstall(button);
export const PopConfirmButton = withInstall(popConfirmButton);
export const ModelConfirmButton = withInstall(modelConfirmButton);
