<template>
  <div class="home-page container-fluid">
    <div class="col py-2">
      <button
        type="button"
        class="btn btn-info btn-lg py-2"
        data-toggle="modal"
        data-target="#create-bug"
      >
        Submit New Bug
      </button>
      <CreateBugModal />
    </div>
    <div>
      <button class="btn" @click="filterBugs">Show open bugs</button>
    </div>

    <div class="row">
      <Bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
    </div>
    <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Bugz Yo</span>
    </h1>
  </div>
</template>
// v-if="state.filteredBugs"

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'HomePage',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      filteredBugs: computed(() => AppState.bugs.filter(bug => bug.closed === false))
    })
    onMounted(async () => {
      await bugsService.getAllBugs()
    })
    return {
      state,
      filterBugs() {
        AppState.bugs = state.filteredBugs
      }
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  user-select: none;
  > img {
    height: 200px;
    width: 200px;
  }
}
</style>
