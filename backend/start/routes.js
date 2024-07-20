'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
const Helpers = use('Helpers')
Route.get('/fotografias/:filename', async ({ params, response }) => {
  const filepath = Helpers.publicPath('fotografias/' + params.filename)
  response.download(filepath)
})

Route.get('fotografias/:filename', 'ProductoController.verFoto')
Route.resource('users', 'UserController').apiOnly();
Route.post('login', 'UserController.login');
Route.post('logout', 'UserController.logout');
Route.post('profile', 'UserController.profile');
Route.resource('productos', 'ProductoController').apiOnly();
Route.post('cargar_foto/:id', 'ProductoController.cargarFoto')
Route.group(() =>{

}).middleware('auth');
