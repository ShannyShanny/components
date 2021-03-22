<template>
    <ix-steps :active="active" @change="onChange">
        <ix-step title="Finished" subTitle="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
    </ix-steps>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    let active = ref(1)
    const onChange = (item) => {
        active.value = item.active
    }

    return {
        active,
        onChange
    }
  },
})
</script>