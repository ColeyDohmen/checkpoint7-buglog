<template>
  <div class="activebugpage text-center container-fluid">
    <p></p>
    <div class="row justify-content-center">
      <div class="col">
        <div class="card">
          <h1 class="p-4" id="titleText">
            {{ state.bug.title }}
          </h1>
          <h3>
            {{ state.bug.description }}
          </h3>
          <p>- {{ state.user.email }}</p>
          <div class="text-center">
            <img :src="state.user.picture" class="profile-picture my-2" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4>Notes:</h4>
        <!-- <form @submit.prevent="createNote"> -->
        <div class="form-group py-2 mx-2">
          <input
            type="text"
            name="body"
            id="body"
            class="form-control"
            placeholder="Enter new note"
            aria-describedby="helpId"
            v-model="state.newNote.body"
          />
          <button class="btn btn-success py-2 mx-2 my-2" @click="createNote">
            Submit
          </button>
        </div>
        <!-- </form> -->
      </div>
      <!-- {{ state.notes }} -->
      <Notes v-for="note in state.notes" :key="note.id" :note="note" />
    </div>
    <h5></h5>
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
.profile-picture {
  height: 40vh;
  width: 40vh;
}
</style>
