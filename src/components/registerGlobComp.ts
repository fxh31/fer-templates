import type { App } from 'vue';

import { Button } from './Button';
import {
  Input,
  InputNumber,
  Layout,
  Form,
  Switch,
  Dropdown,
  Menu,
  Select,
  Table,
  Checkbox,
  Tabs,
  Collapse,
  Card,
  Tooltip,
  Row,
  Col,
  Popconfirm,
  Divider,
  Alert,
  AutoComplete,
  Cascader,
  Rate,
  Slider,
  Avatar,
  Tag,
  Space,
  Steps,
  Popover,
  Radio,
  Progress,
  Image,
  Upload,
} from 'ant-design-vue';

import { FerEmpty } from './Fer';

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(Form)
    .use(Button)
    .use(Tooltip)
    .use(Radio)
    .use(Checkbox)
    .use(Row)
    .use(Col)
    .use(Tabs)
    .use(Card)
    .use(Divider)
    .use(Select)
    .use(Tag)
    .use(AutoComplete)
    .use(Switch)
    .use(Popover)
    .use(FerEmpty);
}
