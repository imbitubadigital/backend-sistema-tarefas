'use strict'
const Task = use('App/Models/Task')
class TaskStatusController {
  async update ({ params, request, response, auth }) {
    const status = request.input('status')
    const task = await Task.query().where('id', params.id).where('user_id', auth.user.id).first()

    if (task) {
      task.status = status !== 0 ? 0 : 1
      await task.save()
      await task.load('category')
      return task
    }
    return response.status(401).send({
      error: { message: 'Erro ao atualizar tarefa.' }
    })
  }
}

module.exports = TaskStatusController
