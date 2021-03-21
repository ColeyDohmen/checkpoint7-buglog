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
      <p>-{{ state.user.email }} {{ state.user.picture }}</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
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
    })
    return {
      state,
      route
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
