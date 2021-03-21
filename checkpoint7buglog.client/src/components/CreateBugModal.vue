<template>
  <div class="create-bug-modal">
    <div
      class="modal fade"
      id="create-bug"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Submit a New Bug</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createBug">
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  placeholder="Enter bug title..."
                  aria-describedby="helpId"
                  v-model="state.newBug.title"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-success" @click="createBug">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { bugService } from '../services/BugsService'
export default {
  name: 'CreateBugModal',
  setup() {
    const router = useRouter()
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      async createBug() {
        try {
          const bugId = await bugService.createBug(state.newBug)
          $('#create-bug').modal('hide')
          state.newBug.user = state.user
          router.push({ name: 'ActiveBugPage', params: { id: bugId } })
          state.newBug = {}
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
