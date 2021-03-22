<template>
  <div class="notes">
    <p>{{ note.body }}</p>
    <form @submit.prevent="createNote">
      <div class="form-group">
        <input
          type="text"
          name="body"
          id="body"
          class="form-control"
          placeholder="Enter new note"
          aria-describedby="helpId"
          v-model="state.newNote.body"
        />
      </div>
    </form>
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
