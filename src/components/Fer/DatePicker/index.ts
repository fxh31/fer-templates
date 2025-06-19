import { withInstall } from '@/utils';
import DatePicker from './src/DatePicker.vue';
import DateRange from './src/DateRange.vue';
import TimePicker from './src/TimePicker.vue';
import TimeRange from './src/TimeRange.vue';

export const FerDatePicker = withInstall(DatePicker);
export const FerDateRange = withInstall(DateRange);
export const FerTimePicker = withInstall(TimePicker);
export const FerTimeRange = withInstall(TimeRange);
