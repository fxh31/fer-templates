/**
 * 配置表格头（顶部）部结构和信息
 * Configure the structure and information of the table header (top)
 * @description component - TableHeader
 * @example #tableTitle
 */

import type { ComputedRef, Slots } from 'vue';
import type { BasicTableProps, InnerHandlers } from '../types/table';

import { unref, computed, h } from 'vue';
import TableHeader from '../components/TableHeader.vue';
import { isString } from '@/utils/is';
import { getSlot } from '@/utils/helper/index';

export function useTableHeader(propsRef: ComputedRef<BasicTableProps>, slots: Slots, handlers: InnerHandlers) {
  const getHeaderProps = computed((): Recordable => {
    const { title, showTableSetting, titleHelpMessage, tableSetting } = unref(propsRef);
    const hideTitle = !slots.tableTitle && !title && !slots.toolbar && !showTableSetting;
    if (hideTitle && !isString(title)) {
      return {};
    }

    return {
      title: hideTitle
        ? null
        : () =>
            h(
              TableHeader,
              {
                title,
                titleHelpMessage,
                showTableSetting,
                tableSetting,
                onColumnsChange: handlers.onColumnsChange,
              } as Recordable,
              {
                ...(slots.toolbar
                  ? {
                      toolbar: () => getSlot(slots, 'toolbar'),
                    }
                  : {}),
                ...(slots.tableTitle
                  ? {
                      tableTitle: () => getSlot(slots, 'tableTitle'),
                    }
                  : {}),
                ...(slots.headerTop
                  ? {
                      headerTop: () => getSlot(slots, 'headerTop'),
                    }
                  : {}),
              },
            ),
    };
  });
  return { getHeaderProps };
}
