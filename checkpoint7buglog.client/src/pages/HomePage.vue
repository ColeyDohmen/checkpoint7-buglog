<template>
  <div class="home-page container-fluid">
    <div class="col">
      <button
        type="button"
        class="btn btn-info btn-lg"
        data-toggle="modal"
        data-target="#create-bug"
      >
        Submit New Bug
      </button>
      <CreateBugModal />
    </div>
    <div class="row">
      <Bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
    </div>
    <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Bugz Yo</span>
    </h1>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugService } from '../services/BugsService'
export default {
  name: 'HomePage',
  setup() {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs)
    })
    onMounted(async () => {
      await bugService.getBugs(route.params.id)
    })
    return {
      state,
      route
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
