<template>
  <div class="ix-steps" :class="['ix-steps--' + direction]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { SetupContext } from 'vue'
import { stepsContextInjectionKey } from './steps'
import type { StepInstance } from './types'
import { defineComponent, provide, ref, watch } from 'vue'
import { PropTypes } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxSteps',
  props: {
    active: PropTypes.number.def(0),
    direction: PropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
    placement: PropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
    percent: {
      type: Number,
      validator: function(value: number) {
        return value <= 100 && value >= 0
      }
    },
    progressDot: PropTypes.bool.def(false),
    size: PropTypes.oneOf(['medium', 'small'] as const).def('medium'),
    status: PropTypes.oneOf(['wait', 'process', 'finish', 'error'] as const).def('process'), // 当前步骤的状态
  },
  setup(props, context: SetupContext) {
    const steps = ref([])

    watch(steps, () => {
      steps.value.forEach((instance: StepInstance, index) => {
        instance.setIndex(index)
      })
    })
    
    provide(stepsContextInjectionKey, { context, steps })
  }
})
</script>