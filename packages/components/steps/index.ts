import { installComponent } from '@idux/components/core/utils'
import IxStep from './src/Step.vue'
import IxSteps from './src/Steps.vue'

IxStep.install = installComponent(IxStep)
IxSteps.install = installComponent(IxSteps)

export { IxStep, IxSteps }
export * from './src/types'
