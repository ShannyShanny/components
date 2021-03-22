import { mount } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxStep from '../src/Step.vue'
import IxSteps from '../src/Steps.vue'
import { nextTick, Ref, ref } from 'vue'

const TestComponent = {
  components: { IxSteps, IxStep },
  template: `
  <IxSteps :active="1">
    <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
    <ix-step title="In Progress" description="This is a description."></ix-step>
    <ix-step title="Waiting" description="This is a description."></ix-step>
  </IxSteps>
  `
}

describe('Steps.vue', () => {

  renderWork(TestComponent)

  test('active work', async () => {
    const active = ref(1) as Ref<number>
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active }
      },
    })

    expect(wrapper.findAllComponents({ name: 'IxStep' })[active.value].classes()).toContain('ix-step-process')

    active.value = 2

    await nextTick()

    expect(wrapper.findAllComponents({ name: 'IxStep' })[active.value].classes()).toContain('ix-step-process')
  })  
  
  test('direction work', async () => {
    const active = ref(1) as Ref<number>
    const direction = ref('vertical') as Ref<string>
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :direction="direction">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, direction }
      },
    })

    expect(wrapper.findAll('.ix-step-vertical').length).toBe(3)
  })

  test('percent work', async () => {
    const active = ref(1) as Ref<number>
    const percent = ref(25) as Ref<number>
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :percent="percent">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, percent }
      },
    })

    expect(wrapper.findAll('.ix-step-head-percent-circle')[0].attributes().style).toBe('transform: rotate(135deg);');
  
    percent.value = 50
    await nextTick()
    expect(wrapper.findAll('.ix-step-head-percent-circle')[0].attributes().style).toBe('transform: rotate(225deg);');
  
  
    percent.value = 75
    await nextTick()
    expect(wrapper.findAll('.ix-step-head-percent-circle')[0].attributes().style).toBe('transform: rotate(225deg);');
    expect(wrapper.findAll('.ix-step-head-percent-circle')[1].attributes().style).toBe('transform: rotate(135deg);');
  
    percent.value = 100
    await nextTick()
    expect(wrapper.findAll('.ix-step-head-percent-circle')[0].attributes().style).toBe('transform: rotate(225deg);');
    expect(wrapper.findAll('.ix-step-head-percent-circle')[1].attributes().style).toBe('transform: rotate(225deg);');
  
  })

  test('direction work', async () => {
    const active = ref(1) as Ref<number>
    const progressDot = ref(true) as Ref<boolean>
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :progressDot="progressDot">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, progressDot }
      },
    })

    expect(wrapper.findAll('.ix-step-dot').length).toBe(3)
  })
  
  test('size work', async () => {
    const active = ref(1) as Ref<number>
    const size = ref('small') as Ref<string>
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :size="size">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, size }
      },
    })

    expect(wrapper.findAll('.ix-step-small').length).toBe(3)
  })

  test('steps(status) work', async () => {
    const active = ref(1) as Ref<number>
    const status = ref('error') as Ref<string>
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :status="status">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, status }
      },
    })

    expect(wrapper.findAllComponents({ name: 'IxStep' })[active.value].classes()).toContain('ix-step-' + status.value)
  })

  test('icon work', async () => {
    const active = ref(1) as Ref<number>
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active">
        <ix-step icon="user" title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step icon="verified" title="In Progress" description="This is a description."></ix-step>
        <ix-step icon="loading" title="Waiting" description="This is a description."></ix-step>
        <ix-step icon="smile" title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active }
      },
    })

    expect(wrapper.find('.ix-icon-user').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-verified').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-loading').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-smile').exists()).toBe(true)
  })

  test('step(status) work', async () => {
    const active = ref(1) as Ref<number>
    const status = ref('error') as Ref<string>
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step :status="status" title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, status }
      },
    })

    
    expect(wrapper.findAllComponents({ name: 'IxStep' })[1].classes()).toContain('ix-step-' + status.value)
  })

})
