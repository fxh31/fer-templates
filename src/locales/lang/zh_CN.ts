import zhCNCustomLocale from './zh_CN.json';
import { flattenObject } from '../helper';

const customLocale = flattenObject(zhCNCustomLocale);

export default {
  message: {
    ...customLocale,
  },
};
