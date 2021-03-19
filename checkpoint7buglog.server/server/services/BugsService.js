import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

function sanitizeBody(body) {
  const writable = {
    closed: body.closed
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

  async edit(id, userId, body) {
    const update = sanitizeBody(body)
    const bug = await dbContext.Bug.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true, runValidators: true })
    if (!bug) {
      throw new BadRequest('Error Dude, you cant touch this guy')
    }
    return bug
  }
}

export const bugsService = new BugsService()
