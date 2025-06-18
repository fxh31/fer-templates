import { Input, DatePicker } from 'ant-design-vue';

// fer 组件（用于二次封装 Form 组件）
import { BasicCaption } from '@/components/Basic';
import { FerInput, FerTextarea } from './Input';
import { FerAlert } from './Alert';
import { FerDivider } from './Divider';
import { FerCheckbox, FerCheckboxSingle } from './Checkbox';
import { FerCron } from './Cron';
import { FerEmpty } from './Empty';
import { FerSelect } from './Select';
import { FerRadio } from './Radio';
import { FerNumberRange } from './NumberRange';
import { FerInputNumber } from './InputNumber';

const FerInputPassword = Input.Password;
FerInputPassword.name = 'FerInputPassword';
const FerInputGroup = Input.Group;
FerInputGroup.name = 'FerInputGroup';
const FerInputSearch = Input.Search;
FerInputSearch.name = 'FerInputSearch';

const FerGroupTitle = BasicCaption;
FerGroupTitle.name = 'FerGroupTitle';
const FerMonthPicker = DatePicker.MonthPicker;
FerMonthPicker.name = 'FerMonthPicker';
const FerWeekPicker = DatePicker.WeekPicker;
FerWeekPicker.name = 'FerWeekPicker';

export {
  FerAlert,
  FerInput,
  FerTextarea,
  FerDivider,
  FerCheckbox,
  FerCheckboxSingle,
  FerCron,
  FerInputPassword,
  FerInputGroup,
  FerInputSearch,
  FerGroupTitle,
  FerMonthPicker,
  FerWeekPicker,
  FerEmpty,
  FerSelect,
  FerRadio,
  FerNumberRange,
  FerInputNumber,
};
