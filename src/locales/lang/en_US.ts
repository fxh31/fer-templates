import antdLocale from 'ant-design-vue/es/locale/en_US';
import enCustomLocale from './en_US.json';
import { flattenObject } from '../helper';

const customLocale = flattenObject(enCustomLocale);

export default {
  message: {
    ...customLocale,
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en_US',
};
