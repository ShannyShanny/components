import type { DefineComponent } from 'vue'

interface StepOriginalProps {
    title?: string
    subTitle?: string
    description?: string
    disabled?: boolean
    icon?: string
    status?: string
}

interface StepsOriginalProps {
    active?: number
    direction?: string
    placement?: string
    percent?: number
    progressDot?: boolean
    size?: string
    status?: string
}

interface StepBindings {
    curStatus: string
    setIndex: (val: number) => void
}

export type StepProps = Readonly<StepOriginalProps>

export type StepInstance = StepBindings

export type StepComponent = InstanceType<DefineComponent<StepProps, StepBindings>>

export type StepsProps = Readonly<StepsOriginalProps>

export type StepsComponent = InstanceType<DefineComponent<StepsProps>>