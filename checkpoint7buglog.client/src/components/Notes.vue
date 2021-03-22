<template>
  <div class="container-fluid">
    <div class="row">
      <div class="notes col-12 text-center">
        <p>{{ note.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Notes',
  props: {
    note: { type: Object, required: true }
  },

  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.newBug),
      newNote: {}
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
