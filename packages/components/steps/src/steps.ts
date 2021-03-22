import { InjectionKey } from 'vue'
import type { StepsComponent } from './types'

export const stepsContextInjectionKey: InjectionKey<StepsComponent> = Symbol()