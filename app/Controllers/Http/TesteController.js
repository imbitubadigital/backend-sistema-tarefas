'use strict'
const Task = use('App/Models/Task')
class TesteController {
  async index () {
    const task = await Task.all()

    return { task, teste: 'Show' }
  }
}

module.exports = TesteController
