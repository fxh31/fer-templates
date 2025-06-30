<template>
  <a-modal v-model:open="visible" :title="t('common.selectI18nCode')" :width="800" class="common-container-modal" :maskClosable="false">
    <template #closeIcon>
      <ModalClose :canFullscreen="false" @cancel="handleCancel" />
    </template>
    <template #footer>
      <a-button type="error" @click="handleClear()">{{ t('common.cleanText') }}</a-button>
      <a-button @click="handleCancel()">{{ t('common.cancelText') }}</a-button>
      <a-button type="primary" @click="handleSubmit()">{{ t('common.okText') }}</a-button>
    </template>
    <div class="fer-common-search-box fer-common-search-box-modal">
      <a-form :colon="false" labelAlign="right" :model="listQuery" ref="formElRef" :class="getFormClass">
        <a-row :gutter="10">
          <a-col :span="8">
            <a-form-item :label="t('common.keyword')" name="keyword">
              <a-input v-model:value="listQuery.keyword" :placeholder="t('common.enterKeyword')" allowClear @pressEnter="handleSearch" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="">
              <a-button type="primary" class="mr-2" @click="handleSearch">{{ t('common.queryText') }}</a-button>
              <a-button @click="handleReset">{{ t('common.resetText') }}</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="fer-common-search-box-right">
        <a-tooltip placement="top">
          <template #title>
            <span>{{ t('common.redo') }}</span>
          </template>
          <RedoOutlined class="fer-common-search-box-right-icon" @click="initData" />
        </a-tooltip>
      </div>
    </div>
    <a-table :data-source="list" v-bind="getTableBindValues" @change="handleTableChange" ref="tableElRef"></a-table>
  </a-modal>
</template>

<script lang="ts" setup>
  import type { FormInstance } from 'ant-design-vue';

  import { ref, unref, watch, computed, nextTick, reactive, toRefs } from 'vue';
  import { Modal as AModal } from 'ant-design-vue';
  import ModalClose from '@/components/Modal/src/components/ModalClose.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useDesign } from '@/hooks/web/useDesign';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { getBaseLangList } from '@/api/system/baseLang';

  interface State {
    list: any[];
    listQuery: any;
    loading: boolean;
    total: number;
    selectedRowKeys: any[];
    selectedRows: any[];
    columns: any[];
  }

  defineOptions({ name: 'I18nModal', inheritAttrs: false });
  const props = defineProps({
    value: { default: '' },
  });
  defineExpose({ openModal });
  const emit = defineEmits(['update:value', 'change']);
  const { t } = useI18n();
  const { prefixCls: formPrefixCls } = useDesign('basic-form');
  const { prefixCls: tablePrefixCls } = useDesign('basic-table');
  const innerValue = ref<string | undefined>(undefined);
  const selectRow = ref<any>(null);
  const visible = ref(false);
  const formElRef = ref<FormInstance>();
  const tableElRef = ref<any>(null);
  const indexColumn = {
    width: 50,
    title: t('component.table.index'),
    dataIndex: 'index',
    key: 'index',
    align: 'center',
    customRender: ({ index }) => index + 1,
  };
  const state = reactive<State>({
    list: [],
    listQuery: {
      type: 0,
      keyword: '',
      currentPage: 1,
      pageSize: 20,
    },
    loading: false,
    total: 0,
    selectedRowKeys: [],
    selectedRows: [],
    columns: [],
  });
  const { listQuery, list } = toRefs(state);

  const getFormClass = computed(() => {
    return [formPrefixCls, `${formPrefixCls}--compact`, 'search-form'];
  });
  const getPagination = computed<any>(() => {
    return {
      current: state.listQuery.currentPage,
      pageSize: state.listQuery.pageSize,
      size: 'small',
      defaultPageSize: state.listQuery.pageSize,
      showTotal: total => t('component.table.total', { total }),
      showSizeChanger: true,
      pageSizeOptions: ['20', '50', '80', '100'],
      showQuickJumper: true,
      total: state.total,
    };
  });
  const getRowSelection = computed<any>(() => ({
    type: 'radio',
    selectedRowKeys: state.selectedRowKeys,
    onChange: setSelectedRowKeys,
  }));
  const getScrollY = computed(() => window.innerHeight * 0.7 - 52 - 38 - 44);
  const getTableBindValues = computed(() => {
    return {
      columns: state.columns,
      pagination: unref(getPagination),
      rowSelection: unref(getRowSelection),
      size: 'small',
      loading: state.loading,
      rowKey: 'code',
      scroll: { y: unref(getScrollY) },
      class: unref(tablePrefixCls),
    };
  });

  watch(
    () => props.value,
    val => {
      setValue(val);
    },
    { immediate: true },
  );

  function setValue(value) {
    innerValue.value = value;
  }
  function getForm() {
    const form = unref(formElRef);
    if (!form) {
      throw new Error('form is null!');
    }
    return form;
  }
  async function openModal() {
    visible.value = true;
    nextTick(() => {
      handleReset();
      state.selectedRowKeys = innerValue.value ? [innerValue.value] : [];
      state.selectedRows = [];
      const tableEl = tableElRef.value?.$el;
      let bodyEl = tableEl.querySelector('.ant-table-body');
      bodyEl!.style.height = `${unref(getScrollY)}px`;
    });
  }
  function handleCancel() {
    visible.value = false;
  }
  function handleClear() {
    state.selectedRowKeys = [];
    state.selectedRows = [];
    innerValue.value = '';
  }
  function handleSubmit() {
    if (!state.selectedRowKeys.length && !state.selectedRows.length) {
      emit('update:value', '');
      emit('change', '', null);
      handleCancel();
      return;
    }
    if (!state.selectedRows.length || innerValue.value === state.selectedRows[0].code) return handleCancel();
    selectRow.value = state.selectedRows[0];
    innerValue.value = unref(selectRow).code;
    emit('update:value', unref(selectRow).code);
    emit('change', unref(selectRow).code, unref(selectRow));
    handleCancel();
  }
  function handleSearch() {
    state.listQuery.currentPage = 1;
    state.listQuery.pageSize = 20;
    initData();
  }
  function handleReset() {
    getForm().resetFields();
    state.listQuery.keyword = '';
    handleSearch();
  }
  function initData() {
    state.loading = true;
    getBaseLangList(state.listQuery)
      .then(res => {
        state.list = res.data.list;
        state.total = res.data.pagination.total;
        const columns = res.data.tableHead ? res.data.tableHead.map(item => ({ title: item.label, dataIndex: item.prop, key: item.prop })) : [];
        state.columns = [indexColumn, ...columns];
        state.loading = false;
      })
      .catch(() => {
        state.loading = false;
      });
  }
  function handleTableChange(pagination) {
    state.listQuery.currentPage = pagination.current;
    state.listQuery.pageSize = pagination.pageSize;
    initData();
  }
  function setSelectedRowKeys(selectedRowKeys, selectedRows) {
    state.selectedRowKeys = selectedRowKeys;
    state.selectedRows = selectedRows;
  }
</script>
