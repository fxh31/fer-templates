import { Modal } from 'ant-design-vue';
import { defineComponent, toRefs, unref, useAttrs, h } from 'vue';
import { basicProps } from '../props';
import { useModalDragMove } from '../hooks/useModalDrag';
// import { useAttrs } from '@/hooks/core/useAttrs';
import { extendSlots, getSlot } from '@/utils/helper/index';

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup(props, { slots, emit }) {
    const { open, draggable, destroyOnClose } = toRefs(props);
    const attrs = useAttrs();
    useModalDragMove({
      open,
      destroyOnClose,
      draggable,
    });

    const onCancel = (e: Event) => {
      emit('cancel', e);
    };

    return () => h(Modal, { ...unref(attrs), ...props, onCancel }, extendSlots(slots));
  },
});
