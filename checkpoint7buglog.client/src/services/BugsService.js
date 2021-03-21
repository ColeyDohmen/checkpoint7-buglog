import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      logger.error(AppState.bugs)
    }
  }

  async createBug(bugData) {
    try {
      const res = await api.post('api/bugs', bugData)
      AppState.bugs.push(res.data)
      return res.data.id
    } catch (error) {
      logger.log(error)
    }
  }

  async getBug(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
    } catch (error) {
      logger.log(error)
    }
  }
}

export const bugsService = new BugsService()
