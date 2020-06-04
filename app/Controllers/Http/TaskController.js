'use strict'
const Task = use('App/Models/Task')
class TaskController {
  async index ({ request, auth }) {
    const { page, perPage, search } = request.get()
    const tasks = await Task.query()
      .where('user_id', auth.user.id)
      .where(function () {
        this
          .whereRaw("LOWER(title) LIKE '%' || LOWER(?) || '%' ", search)
          .orWhereRaw("LOWER(slug) LIKE '%' || LOWER(?) || '%' ", search)
          .orWhereRaw("LOWER(description) LIKE '%' || LOWER(?) || '%' ", search)
      })
      .with('category')
      .paginate(page, perPage)
    return tasks
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description', 'category_id', 'task_start', 'task_end'])
    data.user_id = auth.user.id
    await Task.create(data)
    const tasks = await Task.query()
      .where('user_id', auth.user.id)
      .with('category')
      .paginate(1, 10)
    return tasks
  }

  async update ({ params, request, response, auth }) {
    const data = request.only(['title', 'description', 'category_id', 'task_start', 'task_end'])
    const task = await Task.query()
      .where('id', params.id)
      .where('user_id', auth.user.id)
      .first()

    if (task) {
      task.merge(data)
      await task.save()
      const tasks = await Task.query()
        .where('user_id', auth.user.id)
        .with('category')
        .paginate(1, 10)
      return tasks
    }
    return response.status(401).send({
      error: { message: 'Erro ao atualizar tarefa.' }
    })
  }

  async destroy ({ params, auth }) {
    const task = await Task.query().where('id', params.id).where('user_id', auth.user.id).first()

    await task.delete()
    const tasks = await Task.query()
      .where('user_id', auth.user.id)
      .with('category')
      .paginate(1, 10)
    return tasks
  }
}

module.exports = TaskController
