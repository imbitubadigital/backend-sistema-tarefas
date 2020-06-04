'use strict'
const Category = use('App/Models/Category')
class CategorySelectController {
  async index ({ auth }) {
    const categories = await Category.query()
      .where('user_id', auth.user.id)
      .setVisible([
        'id',
        'name'
      ])
      .orderBy('name', 'asc').fetch()
    return categories
  }
}

module.exports = CategorySelectController
