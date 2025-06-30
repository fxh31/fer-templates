import { withInstall } from '@/utils';

import monacoEditor from './src/monacoEditor/MonacoEditor.vue';

export const MonacoEditor = withInstall(monacoEditor);

export * from './src/typing';
