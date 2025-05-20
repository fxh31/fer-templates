<script lang="ts">
  import type { CSSProperties, PropType } from 'vue';

  import { Tooltip } from 'ant-design-vue';
  import { defineComponent, computed, unref, h } from 'vue';
  import { QuestionCircleFilled } from '@ant-design/icons-vue';
  import { getPopupContainer } from '@/utils';
  import { isString, isArray } from '@/utils/is';
  import { getSlot } from '@/utils/helper';
  import { useDesign } from '@/hooks/web/useDesign';

  const props = {
    maxWidth: { type: String, default: '600px' }, // 文本最大宽度 - Help text max-width
    showIndex: { type: Boolean }, // 是否显示序号 - Whether to display the serial number
    color: { type: String, default: '#ffffff' }, // 文本字体颜色 - Help text font color
    fontSize: { type: String, default: '14px' }, // 文本字体大小 - Help text font size
    placement: { type: String, default: 'top' }, // 显示位置 - Help text list
    text: { type: [Array, String] as PropType<string[] | string> }, // 文本列表 - Help text list
  };

  export default defineComponent({
    name: 'BasicHelp',
    components: { Tooltip },
    props,
    setup(props, { slots }) {
      const { prefixCls } = useDesign('basic-help');

      const getTooltipStyle = computed((): CSSProperties => ({ color: props.color, fontSize: props.fontSize }));
      const getOverlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }));

      function renderTitle() {
        const textList = props.text;

        if (isString(textList)) {
          return h('p', textList);
        }

        if (isArray(textList)) {
          return textList.map((text, index) => {
            return h('p', { key: text }, [props.showIndex ? `${index + 1}. ` : '', text]);
          });
        }
        return null;
      }

      return () => {
        return h(
          Tooltip,
          {
            overlayClassName: `${prefixCls}__wrap`,
            title: h('div', { style: unref(getTooltipStyle) }, renderTitle()),
            autoAdjustOverflow: true,
            overlayStyle: unref(getOverlayStyle),
            placement: props.placement as 'right',
            getPopupContainer: () => getPopupContainer(),
          },

          {
            default: () => [h('span', { class: prefixCls }, [getSlot(slots) || h(QuestionCircleFilled)])],
          },
        );
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-help';

  .@{prefix-cls} {
    display: inline-block;
    margin-left: 4px;
    font-size: 14px;
    color: @text-color-secondary;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }

    &__wrap {
      p {
        margin-bottom: 0;
      }
    }
  }
</style>
