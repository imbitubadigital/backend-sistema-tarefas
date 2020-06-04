'use strict'

class Recover {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      old_password: 'required',
      password: 'required|min:6|confirmed'
    }
  }

  get messages () {
    //  return Antl.forLocale('pt').list('validation')
    return {
      'old_password.required': 'Informe sua senha antiga!',
      'password.required': 'Informe sua nova senha secreta!',
      'password.min': 'A senha deve conterno mínimo 6 caracteres!',
      'password.confirmed': 'A senha e repetição da senha não conferem!'
    }
  }
}

module.exports = Recover
