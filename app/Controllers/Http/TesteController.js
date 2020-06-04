'use strict'
const Task = use('App/Models/Task')
class TaskController {
  async get () {
    const task = await Task.all()

    return { task, teste: 'Show' }
  }
}

module.exports = TaskController
