import type { PropType } from 'vue';
import type { PaginationProps } from './types/pagination';
import type { BasicColumn, FetchSetting, TableSetting, SorterResult, TableCustomRecord, TableRowSelection, SizeType } from './types/table';
import type { FormProps } from '@/components/Form';

import { DEFAULT_FILTER_FN, DEFAULT_SORT_FN, FETCH_SETTING, DEFAULT_SIZE } from './const';
import { propTypes } from '@/utils/propTypes';

export const basicProps = {
  clickToRowSelect: { type: Boolean, default: true },
  // 树型数据展开（只针对表格是树型结构）
  isTreeTable: Boolean,
  defaultExpandAllRows: { type: Boolean, default: true },
  // 表格头部右侧设置，需配合 showTableSetting（tableSetting）
  tableSetting: propTypes.shape<TableSetting>({
    expand: propTypes.bool,
  }),
  showTableSetting: { type: Boolean, default: true },
  inset: Boolean,
  sortFn: {
    type: Function as PropType<(sortInfo: SorterResult) => any>,
    default: DEFAULT_SORT_FN,
  },
  filterFn: {
    type: Function as PropType<(data: Partial<Recordable<string[]>>) => any>,
    default: DEFAULT_FILTER_FN,
  },
  autoCreateKey: { type: Boolean, default: true },
  striped: { type: Boolean, default: false },
  showSummary: Boolean,
  summaryFunc: {
    type: [Function, Array] as PropType<(...arg: any[]) => any[]>,
    default: null,
  },
  summaryData: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  indentSize: propTypes.number.def(24),
  canColDrag: { type: Boolean, default: true },
  // 异步数据源（先于同步）
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null,
  },
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null,
  },
  handleSearchInfoFn: {
    type: Function as PropType<Fn>,
    default: null,
  },
  fetchSetting: {
    type: Object as PropType<FetchSetting>,
    default: () => {
      return FETCH_SETTING;
    },
  },
  // 立即请求接口（false 可后续 reload 手动调用）
  immediate: { type: Boolean, default: true },
  emptyDataIsShowTable: { type: Boolean, default: true },
  // 额外的请求参数
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  // 默认的排序参数
  defSort: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  // 使用搜索表单
  useSearchForm: propTypes.bool,
  // 表单配置
  formConfig: {
    type: Object as PropType<Partial<FormProps>>,
    default: null,
  },
  columns: {
    type: Array as PropType<BasicColumn[]>,
    default: () => [],
  },
  showIndexColumn: { type: Boolean, default: true },
  indexColumnProps: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  ellipsis: { type: Boolean, default: true },
  isCanResizeParent: { type: Boolean, default: false },
  canResize: { type: Boolean, default: true },
  clearSelectOnPageChange: propTypes.bool,
  resizeHeightOffset: propTypes.number.def(0),
  rowSelection: {
    type: Object as PropType<TableRowSelection | null>,
    default: null,
  },
  // 表头标题（优先显示 slots.tableTitle 的内容）
  title: {
    type: [String, Function] as PropType<string | ((data: Recordable) => string)>,
    default: null,
  },
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
  },
  maxHeight: propTypes.number,
  // 同步数据源
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record: Recordable) => string)>,
    default: '',
  },
  bordered: propTypes.bool,
  pagination: {
    type: [Object, Boolean] as PropType<PaginationProps | boolean>,
    default: null,
  },
  loading: propTypes.bool,
  rowClassName: {
    type: Function as PropType<(record: TableCustomRecord<any>, index: number) => string>,
  },
  customRow: {
    type: Function as PropType<(record: TableCustomRecord<any>, index: number) => object>,
    default: null,
  },
  scroll: {
    type: Object as PropType<{ x: number | string | true; y: number | string }>,
    default: null,
  },
  beforeEditSubmit: {
    type: Function as PropType<(data: { record: Recordable; index: number; key: string | number; value: any }) => Promise<any>>,
  },
  size: {
    type: String as PropType<SizeType>,
    default: DEFAULT_SIZE,
  },
};
