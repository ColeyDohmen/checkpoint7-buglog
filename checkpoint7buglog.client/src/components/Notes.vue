<template>
  <div class="notes">
    <p>{{ notes.body }}</p>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Notes',
  props: { list: { type: Object, required: true } },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.newBug),
      notes: computed(() => AppState.notes)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
