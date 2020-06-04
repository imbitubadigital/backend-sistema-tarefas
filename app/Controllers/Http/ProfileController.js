'use strict'
const User = use('App/Models/User')

class ProfileController {
  async store ({ request, response }) {
    const data = request.only([
      'username',
      'email',
      'password',
      'password_confirmation'
    ])

    delete data.password_confirmation

    const user = await User.create(data)

    return user
  }

  async update ({ request, response, auth }) {
    const data = request.only(['username'])

    const user = await User.query()
      .setVisible(['id', 'username', 'email'])
      .where('id', auth.user.id)
      .first()

    if (!user) {
      return response.status(400).send({
        error: { message: 'Usuário não localizado para atualização' }
      })
    }

    user.merge(data)
    await user.save()

    return user
  }
}

module.exports = ProfileController
