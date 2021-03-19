import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

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

  async delete(id) {
    const bug = await dbContext.Bug.findOneAndUpdate({ _id: id }, { closed: true })
    if (!bug) {
      throw new BadRequest('DONT TOUCH ME')
    }
    return bug
  }

  async edit(id, body) {
    const bug = await dbContext.Bug.findOneAndUpdate({ _id: id, creatorId: body.creatorId, closed: false }, body
    )
    if (!bug) {
      throw new BadRequest('Error Dude, you cant touch this guy')
    }
    return bug
  }
}

export const bugsService = new BugsService()
