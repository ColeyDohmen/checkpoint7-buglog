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

  async createBug(newBug) {
    try {
      const res = await api.post('api/bugs', newBug)
      AppState.bugs.push(res.data)
      return res.data.id
    } catch (error) {
      logger.log(error)
    }
  }

  async getBug(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.newBug = res.data
    } catch (error) {
      logger.log(error)
    }
  }
}

export const bugsService = new BugsService()
