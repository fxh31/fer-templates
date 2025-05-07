import zhTWCustomLocale from './zh_TW.json';
import { flattenObject } from '../helper';

const customLocale = flattenObject(zhTWCustomLocale);

export default {
  message: {
    ...customLocale,
  },
};
