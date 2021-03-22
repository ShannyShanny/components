<script lang="ts">
import { SetupContext, VNode } from 'vue'
import type { StepInstance } from './types'
import { stepsContextInjectionKey } from './steps'
import { defineComponent, h, provide, ref, watch } from 'vue'
import { PropTypes } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxSteps',
  props: {
    active: PropTypes.number.def(0),
    direction: PropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
    placement: PropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
    percent: {
      type: Number,
      validator: function (value: number) {
        return value <= 100 && value >= 0
      },
    },
    progressDot: PropTypes.bool.def(false),
    size: PropTypes.oneOf(['medium', 'small'] as const).def('medium'),
    status: PropTypes.oneOf(['wait', 'process', 'finish', 'error'] as const).def('process'), // 当前步骤的状态
  },
  render () {
    const progressDotSlot = this.$slots?.progressDot?.()
    let defaultSlots = this.$slots?.default?.() || []
    const direction = this.$props.direction   
    let items: VNode[] = []

    defaultSlots = (defaultSlots.length && defaultSlots[0].children) || defaultSlots // 用v-for生成的slot，数组长度为1，step在该元素的children下

    defaultSlots.forEach((item, index) => {
      items.push(
        h(item, null, { progressDot: (status) => progressDotSlot})
      )
    })
    
    return h('div', {class: 'ix-steps ix-steps-' + direction}, items)
  },
  setup(props, context: SetupContext) {
    const steps = ref([])

    watch(steps, () => {
      steps.value.forEach((instance: StepInstance, index: number) => {        
        instance.setIndex(index)
      })
    })

    provide(stepsContextInjectionKey, { context, steps })

    return {
      slots: context.slots,
    }
  },
})
</script>