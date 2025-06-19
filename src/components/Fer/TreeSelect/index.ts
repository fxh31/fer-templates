import type { ExtractPropTypes } from 'vue';

import { withInstall } from '@/utils';
import TreeSelect from './src/TreeSelect.vue';
import { treeSelectProps } from './src/props';

export const FerTreeSelect = withInstall(TreeSelect);
export declare type TreeSelectProps = Partial<ExtractPropTypes<typeof treeSelectProps>>;
