'use strict'

class UpdateCategory {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required'
    }
  }

  get messages () {
    return {
      'name.required': 'Informe o nome da categoria!'
    }
  }
}

module.exports = UpdateCategory
