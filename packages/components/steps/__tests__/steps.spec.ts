import { mount } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxSteps from '../src/Steps.vue'
import IxStep from '../src/Step.vue'

const TestComponent = {
  components: { IxSteps, IxStep },
  template: `
  <IxSteps :active="active">
    <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
    <ix-step title="In Progress" description="This is a description."></ix-step>
    <ix-step title="Waiting" description="This is a description."></ix-step>
  </IxSteps>
  `,
  props: {
    active: Number,
  },
}

describe('Steps.vue', () => {

  renderWork(TestComponent)

  test('mode work', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.findAll('.ix-step-process').length).toBe(1)

    // await wrapper.setProps({ mode: 'dashed' })
  })
})
