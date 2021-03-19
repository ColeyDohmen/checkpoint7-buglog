import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

function sanitizeBody(body) {
  const writable = {
    title: body.title,
    description: body.description
  }
  return writable
}

class BugsService {
  async findBug(query = {}) {
    return await dbContext.Bug.find(query).populate('creator')
  }

  async findById(id) {
    const bug = await dbContext.Bug.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(body) {
    return await dbContext.Bug.create(body)
  }

  async delete(id, userId) {
    const bug = await dbContext.Bug.findOneAndUpdate({ _id: id, creatorId: userId }, { closed: true })
    if (!bug) {
      throw new BadRequest('DONT TOUCH ME')
    }
    return bug
  }

  async edit(id, body) {
    const update = sanitizeBody(body)
    const bug = await dbContext.Bug.findOneAndUpdate({ _id: id, creatorId: body.creatorId },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true })
    if (!bug) {
      throw new BadRequest('Error Dude, you cant touch this guy')
    }
    return bug
  }
}
// { _id: id, creatorId: userId }, body, { $set: update }, { new: true, runValidators: true }

export const bugsService = new BugsService()
