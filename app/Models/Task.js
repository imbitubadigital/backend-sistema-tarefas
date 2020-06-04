'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Lucid/Slugify', {
      fields: {
        slug: 'title'
      },
      strategy: 'dbIncrement',
      disabledUpdats: false
    })
  }

  category () {
    return this.hasOne('App/Models/Category', 'category_id', 'id')
  }
}

module.exports = Task
