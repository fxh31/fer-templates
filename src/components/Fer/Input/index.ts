import { withInstall } from '@/utils';
import Input from './src/Input.vue';
import Textarea from './src/Textarea.vue';
import I18nInput from './src/I18nInput.vue';

export const FerInput = withInstall(Input);
export const FerTextarea = withInstall(Textarea);
export const FerI18nInput = withInstall(I18nInput);
