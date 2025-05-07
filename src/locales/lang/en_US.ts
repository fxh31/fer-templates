import enCustomLocale from './en_US.json';
import { flattenObject } from '../helper';

const customLocale = flattenObject(enCustomLocale);

export default {
  message: {
    ...customLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en_US',
};
