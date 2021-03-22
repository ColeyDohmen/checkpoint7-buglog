<template>
  <div class="container-fluid">
    <div class="row" v-if="note.creator">
      <div class="notes col-12 text-center">
        <div class="card my-2">
          <div class="card-body">
            <h5>{{ note.body }}</h5>
            <p>{{ note.creator.email }}</p>
            <img :src="note.creator.picture" />
            <i
              id="deleteButton"
              type="button"
              class="fas fa-skull text-danger float-right"
              @click="deleteNote"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import { useRoute } from 'vue-router'
export default {
  name: 'Notes',
  props: {
    note: { type: Object, required: true }
  },

  setup(props) {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.newBug),
      newNote: {}
    })
    return {
      state,
      route,
      async deleteNote() {
        await notesService.deleteNote(props.note.id, route.params.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.card {
  // opacity: 0.5;
}
</style>
