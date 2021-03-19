import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .get('/:id/notes', this.getAllNotesbyBugId)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await bugsService.findBug(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      return res.send(await bugsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugsService.edit(req.params.id, req.userInfo.id, req.body), { new: true, runValidators: true })
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesbyBugId(req, res, next) {
    try {
      return res.send(await notesService.findById({ note: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
