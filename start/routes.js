'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('teste', 'TesteController.index')
Route.post('session', 'SessionController.store')
Route.post('users', 'ProfileController.store').validator('User/UserCreate')

Route.group(() => {
  Route.get('category', 'CategoryController.index')
  Route.get('category-select', 'CategorySelectController.index')
  Route.post('category', 'CategoryController.store').validator('Category/CreateCategory')
  Route.get('category/:id', 'CategoryController.show')
  Route.put('category/:id', 'CategoryController.update').validator('Category/UpdateCategory')
  Route.delete('category/:id', 'CategoryController.destroy')

  Route.get('task', 'TaskController.index')
  Route.post('task', 'TaskController.store').validator('Task/Task')
  Route.put('task/:id', 'TaskController.update').validator('Task/Task')
  Route.delete('task/:id', 'TaskController.destroy')
  Route.put('task-status/:id', 'TaskStatusController.update')

  Route.put('profile', 'ProfileController.update').validator('User/UserUpdate')
  Route.put('recover', 'RecoverController.update').validator('Password/Recover')
}).middleware('auth')
