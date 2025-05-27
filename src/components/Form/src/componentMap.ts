import type { Component } from 'vue';
import type { ComponentType } from './types/index';

import { FerAlert, FerInput, FerDivider, FerTextarea } from '@/components/Fer';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Alert', FerAlert);
componentMap.set('Input', FerInput);
componentMap.set('Textarea', FerTextarea);
componentMap.set('Divider', FerDivider);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
