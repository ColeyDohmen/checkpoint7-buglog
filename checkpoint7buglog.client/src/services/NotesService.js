import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getBugNotes(id) {
    try {
      const res = await api.get('api/bugs/' + id + '/notes')
      AppState.notes = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async createNote(newNote) {
    try {
      const res = await api.post('api/notes', newNote)
      AppState.notes.push(res.data)
    } catch (error) {
      logger.log(error)
    }
  }
}
export const notesService = new NotesService()
