import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async find(query = {}) {
    return await dbContext.Note.find(query).populate('creator')
  }

  async findById(id) {
    const note = await dbContext.Note.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(body) {
    return await dbContext.Note.create(body)
  }

  async delete(id) {
    const note = await dbContext.Note.findOneAndRemove({ _id: id })
    if (!note) {
      throw new BadRequest('Oi, you cant do that')
    }
    return note
  }
}

export const notesService = new NotesService()
