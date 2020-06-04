'use strict'

class RecoverController {
  async update ({ request, response, auth }) {
    try {
      const data = request.only(['password', 'old_password', 'password_confirmation'])
      const email = auth.user.email
      delete data.password_confirmation

      await auth.attempt(email, data.old_password)

      delete data.old_password
      delete data.password_confirmation
      const { user } = auth
      user.merge(data)
      await user.save()
      return true
    } catch (err) {
      return response.status(401).send({
        error: { message: 'Senha antiga não confere!' }
      })
    }
  }
}

module.exports = RecoverController
