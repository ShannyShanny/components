<template>
  <div class="ix-step" :class="stepClass" @click="emitChange">
    <div class="ix-step-tail"></div>
    <div class="ix-step-head">
      <!-- 进度环 -->
      <div v-if="canShowPercent" class="ix-step-head__percent">
        <div class="ix-step-head__percent--right">
          <div class="ix-step-head__percent__circle" :style="{ transform: 'rotate(' + rightDeg + 'deg)' }"></div>
        </div>
        <div class="ix-step-head__percent--left">
          <div class="ix-step-head__percent__circle" :style="{ transform: 'rotate(' + leftDeg + 'deg)' }"></div>
        </div>
      </div>

      <span v-if="isDot" class="ix-step-head__dot"></span>
      <span v-else-if="hasIconSlot" class="ix-step-head__icon">
        <slot name="icon"></slot>
      </span>
      <ix-icon v-else-if="iconName" class="ix-step-head__icon" :name="iconName" />
      <ix-icon v-else-if="isFinish" class="ix-step-head__icon" name="check" />
      <ix-icon v-else-if="isError" class="ix-step-head__icon" name="close" />
      <span v-else class="ix-step-head__text">{{ stepNumber }}</span>
    </div>
    <div class="ix-step-content">
      <div class="ix-step-title">
        <slot name="title">{{ title }}</slot>
        <span class="ix-step-subtitle">
          <slot name="subTitle">
            <span>{{ subTitle }}</span>
          </slot>
        </span>
      </div>
      <div class="ix-step-description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { SetupContext } from 'vue'
import type { StepProps, StepsProps, StepInstance } from './types'
import { PropTypes, hasSlot } from '@idux/cdk/utils'
import { stepsContextInjectionKey } from './steps'
import { defineComponent, inject, computed, Ref, watchEffect, reactive, ref } from 'vue'
import { isUndefined, isNumber } from '@idux/cdk/utils/typeof.ts'

interface IxStepsInject {
  steps: Ref<StepInstance[]>
  context: {
    props: StepsProps
    emit: Function
  }
}

export default defineComponent({
  name: 'IxStep',
  props: {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    description: PropTypes.string,
    disabled: PropTypes.bool.def(false),
    icon: PropTypes.string,
    status: PropTypes.oneOf(['wait', 'process', 'finish', 'error'] as const),
  },
  setup(props: StepProps, { slots }: SetupContext) {
    const parent: IxStepsInject = inject(stepsContextInjectionKey)
    const stepsProps: StepsProps = parent.context.props
    let index = ref()
    let percent = ref()
    let leftDeg = ref()
    let rightDeg = ref()

    const hasIconSlot = computed(() => hasSlot(slots, 'icon'))

    const curStatus = computed(() => {
      if (props.status) {
        return props.status
      }
      if (stepsProps.active! > index.value) {
        return 'finish'
      }

      if (stepsProps.active! === index.value) {
        return stepsProps.status!
      }
      return 'wait'
    })

    const isActive = computed(() => curStatus.value === 'process')

    const iconName = computed(() => props.icon)

    const isFinish = computed(() => curStatus.value === 'finish')

    const isError = computed(() => curStatus.value === 'error')

    const isVertical = computed(() => stepsProps.direction === 'vertical')

    const isDot = computed(() => stepsProps.progressDot)

    const placement = computed(() => (isDot.value ? 'horizontal' : stepsProps.placement))

    const stepClass = computed(() => {
      return {
        [`ix-step--${stepsProps.size!}`]: true,
        [`ix-step--${curStatus.value!}`]: true,
        'ix-step--vertical-placement': placement.value === 'vertical',
        'ix-step--custom': hasIconSlot.value || iconName.value,
        'ix-step--vertical': isVertical.value,
        'ix-step--dot': isDot.value,
      }
    })

    const stepNumber = computed(() => {
      if (isUndefined(index.value)) {
        return
      }
      return index.value! + 1
    })

    const setIndex = (i: number) => {
      index.value = i
    }
    const stepItemState = reactive({
      curStatus,
      setIndex,
    })
    parent.steps.value = [...parent.steps.value, stepItemState]

    watchEffect(() => {
      percent.value = stepsProps.percent
      let deg = usePercent(percent.value, isActive.value, isError.value)
      leftDeg.value = deg.leftDeg
      rightDeg.value = deg.rightDeg
    })

    // 点状或自定义图标，都不支持展示进度环
    const canShowPercent = computed(() => isNumber(percent.value) && isActive.value && !isDot.value && !hasIconSlot.value)

    const emitChange = () => {
      if (props.disabled) {
        return
      }
      parent.context.emit('change', { active: index.value })
    }

    return {
      hasIconSlot,
      isActive,
      iconName,
      isFinish,
      isError,
      isVertical,
      isDot,
      percent,
      leftDeg,
      rightDeg,
      canShowPercent,
      placement,
      stepClass,
      stepNumber,
      setIndex,
      emitChange,
    }
  },
})

function usePercent(percent: number | undefined, isActive: boolean, isError: boolean) {
  if (!isNumber(percent) || !isActive || isError) {
    return {}
  }

  const maxDeg = 225 // 每个半圆最大只能旋转到225度
  const baseDeg = 45 // 默认2个半圆已经旋转了45度
  const halfRoundDeg = 180
  let leftDeg = baseDeg
  let rightDeg = baseDeg

  let curDeg = Math.round((percent! / 100) * 360)

  debugger
  console.log(curDeg)
  if (curDeg + baseDeg > maxDeg) {
    // 超过50%
    rightDeg = maxDeg
    leftDeg += curDeg - halfRoundDeg
    leftDeg = leftDeg > maxDeg ? maxDeg : leftDeg
  } else {
    rightDeg += curDeg
  }

  return {
    leftDeg,
    rightDeg,
  }
}
</script>