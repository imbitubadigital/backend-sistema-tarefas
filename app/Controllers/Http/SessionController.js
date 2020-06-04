'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    try {
      const { email, password } = request.all()
      const token = await auth.attempt(email, password)

      const user = await User.query()
        .setVisible([
          'id',
          'username',
          'email'
        ])
        .where('email', email)
        .first()

      return { ...token, user }
    } catch (err) {
      return response.status(401).send({
        error: {
          message: 'Email e/ou senha não conferem!'
        }
      })
    }
  }
}

module.exports = SessionController
