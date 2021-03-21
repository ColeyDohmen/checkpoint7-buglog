<template>
  <div class="activebugpage">
    <p>bugs</p>
    <h1 class="p-4" id="titleText">
      {{ state.bug.title }}
    </h1>
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
      bugs: computed(() => AppState.bugs),
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      newList: {}
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
