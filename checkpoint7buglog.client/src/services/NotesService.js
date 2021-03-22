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
      await api.post('api/notes', newNote)
      // AppState.notes.push(res.data)
      this.getBugNotes(newNote.bug)
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteNote(id, bugId) {
    if (window.confirm('But are you sure?')) { await api.delete('api/notes/' + id) }
    this.getBugNotes(bugId)
  }
}
export const notesService = new NotesService()
