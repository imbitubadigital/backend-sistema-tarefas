'use strict'
const Category = use('App/Models/Category')
const Task = use('App/Models/Task')
class CategoryController {
  async index ({ auth }) {
    const categories = await Category.query()
      .where('user_id', auth.user.id)
      .with('tasks')
      .orderBy('name', 'asc').fetch()
    return categories
  }

  async store ({ request, response, auth }) {
    const data = request.only(['name'])
    const isExits = await Category.query()
      .where('user_id', auth.user.id)
      .where('name', data.name)
      .orderBy('name', 'asc').first()
    if (isExits) {
      return response.status(401).send({
        error: { message: 'Já existe uma categoria cadastrada com esse nome!' }
      })
    }

    data.user_id = auth.user.id
    await Category.create(data)
    const categories = await Category.query()
      .where('user_id', auth.user.id)
      .with('tasks')
      .orderBy('name', 'asc').fetch()
    return categories
  }

  async show ({ params, auth }) {
    const category = await Category.query()
      .where('user_id', auth.user.id)
      .where('id', params.id)
      .with('tasks')
      .first()
    return category
  }

  async update ({ params, request, response, auth }) {
    const name = request.input('name')
    const isExits = await Category.query()
      .where('user_id', auth.user.id)
      .where('name', name)
      .whereNot('id', params.id)
      .first()

    if (isExits) {
      return response.status(401).send({
        error: { message: 'Já existe uma categoria cadastrada com esse nome!' }
      })
    }

    const category = await Category.query()
      .where('user_id', auth.user.id)
      .where('id', params.id)
      .first()

    if (category) {
      category.name = name
      await category.save()

      const categories = await Category.query()
        .where('user_id', auth.user.id)
        .with('tasks')
        .orderBy('name', 'asc').fetch()
      return categories
    }
    return response.status(401).send({
      error: { message: 'Erro ao atualizar categoria.' }
    })
  }

  async destroy ({ params, response, auth }) {
    const task = await Task.query()
      .where('category_id', params.id)
      .first()

    if (task) {
      return response.status(401).send({
        error: { message: 'Para deletar esta categoria primeiramente suas respectivas tarefas devem ser excluídas!' }
      })
    }

    const category = await Category.query()
      .where('user_id', auth.user.id)
      .where('id', params.id)
      .first()

    await category.delete()
    const categories = await Category.query()
      .where('user_id', auth.user.id)
      .with('tasks')
      .orderBy('name', 'asc').fetch()
    return categories
  }
}

module.exports = CategoryController
