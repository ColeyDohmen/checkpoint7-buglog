<template>
  <div class="activebugpage text-center container-fluid">
    <p></p>
    <div class="row justify-content-center">
      <div class="col">
        <div class="card" v-if="state.bug.creator">
          <i
            v-if="state.bug.creator.email == state.user.email"
            id="deleteButton"
            type="button"
            class="fas fa-skull text-danger float-right my-2"
            @click="deleteBug"
          ></i>
          <h1 class="p-4" id="titleText">
            {{ state.bug.title }}
          </h1>
          <h3>
            {{ state.bug.description }}
          </h3>
          <p>- {{ state.bug.creator.email }}</p>
          <div class="text-center">
            <img
              :src="state.bug.creator.picture"
              class="profile-picture my-2"
            />
          </div>
          <div>
            <p v-if="state.bug.closed == true" class="text-danger">CLOSED</p>
            <p v-if="state.bug.closed == false" class="text-success">OPEN</p>
          </div>
          <div>Last updated: {{ fixDate(state.bug.updatedAt) }}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4>Notes:</h4>
        <form @submit.prevent="createNote">
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
            <button class="btn btn-success btn-lg py-2 mx-2 my-2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <!-- {{ state.notes }} -->
      <Notes v-for="note in state.notes" :key="note.id" :note="note" />
    </div>
    <!-- <Bug :bug="bug" /> -->
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
  props: {
    bug: { type: Object, required: true }
  },
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
        state.newNote.bug = state.bug.id
        await notesService.createNote(state.newNote)
        state.newNote = {}
      },
      async deleteBug() {
        await bugsService.deleteBug(route.params.id)
      },
      fixDate(update) {
        const year = update.slice(0, 4)
        const day = update.slice(5, 7)
        const month = update.slice(8, 10)
        return day + '-' + month + '-' + year
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.profile-picture {
  height: 20vh;
  width: 20vh;
}
</style>

 <!-- <p>slice0-4updateddate closed date</p> v-if!state.bug.closed -->
