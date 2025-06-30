import type { Component } from 'vue';
import type { ComponentType } from './types/index';

import { FerAlert, FerInput, FerInputSearch, FerDivider, FerTextarea, FerCheckbox, FerCheckboxSingle, FerCron, FerTreeSelect } from '@/components/Fer';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Alert', FerAlert);
componentMap.set('Input', FerInput);
componentMap.set('InputSearch', FerInputSearch);
componentMap.set('BillRule', FerInput);
componentMap.set('Textarea', FerTextarea);
componentMap.set('Divider', FerDivider);
componentMap.set('Checkbox', FerCheckbox);
componentMap.set('CheckboxSingle', FerCheckboxSingle);
componentMap.set('Cron', FerCron);
componentMap.set('TreeSelect', FerTreeSelect);
componentMap.set('ModifyTime', FerInput);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
