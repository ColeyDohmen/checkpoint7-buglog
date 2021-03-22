<template>
  <div class="component">
    <div class="card py-2 mx-2" style="width: 18rem">
      <div class="col-12">
        <h3 id="textTitle">
          <b>{{ bug.title }}</b>
        </h3>
        <p>{{ bug.creatorId.email }}</p>
        <div class="div">
          STATUS:
          <p v-if="bug.closed == true" class="text-danger">CLOSED</p>
          <p v-if="bug.closed == false" class="text-success">OPEN</p>
        </div>
      </div>
      <router-link :to="{ name: 'ActiveBugPage', params: { id: bug.id } }">
        <button type="button" class="btn btn-primary">
          Open bug<i class="fas fa-chevron-right"></i>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Bug',
  props: {
    bug: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.bugs)
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
