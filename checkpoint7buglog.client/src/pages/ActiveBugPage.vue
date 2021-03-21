<template>
  <div class="activebugpage">
    <p>bugs</p>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'ActiveBugPage',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
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
