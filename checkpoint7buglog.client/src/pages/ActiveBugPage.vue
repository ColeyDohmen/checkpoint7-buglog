<template>
  <div class="activebugpage text-center container-fluid">
    <p></p>
    <div class="card">
      <h1 class="p-4" id="titleText">
        {{ state.bug.title }}
      </h1>
      <h3>
        {{ state.bug.description }}
      </h3>
      <p>- {{ state.user.email }}</p>
      <div>{{ state.user.picture }}</div>
    </div>
    <div class="row">
      <h4>Notes:</h4>
      <Notes v-for="note in state.notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { useRoute } from 'vue-router'
export default {
  name: 'ActiveBugPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.newBug),
      notes: computed(() => AppState.notes),
      newNote: {}
    })
    onMounted(async () => {
      await bugsService.getBug(route.params.id)
      await notesService.getBugNotes(route.params.id)
    })
    return {
      state,
      route,
      async createNote() {
        state.newNote.bug = state.bug
        state.newNote.user = state.user
        await notesService.createNote(state.newNote)
        state.newNote = {}
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
