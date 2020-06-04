'use strict'

class UserUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required'
    }
  }

  get messages () {
    //  return Antl.forLocale('pt').list('validation')
    return {
      'username.required': 'Informe seu nome!'
    }
  }
}

module.exports = UserUpdate
