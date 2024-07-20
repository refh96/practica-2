'use strict'

const Producto = use('App/Models/Producto')
const { validateAll } = use('Validator')
const Helpers = use('Helpers')

class ProductoController {
  
  async index ({ request, response }) {
    const input = request.all()
    if (input.txtBuscar != undefined) {
      return await Producto.query()
        .where('categoria', 'like', '%' + input.txtBuscar + '%')
        .fetch()
    }
    return await Producto.all()
  }

  // POST
  async store ({ request, response }) {
    const input = request.all()

    // Validaciones
    const validation = await this.validar(input)
    if (validation.fails()) {
      return validation.messages()
    }
    await Producto.create(input)

    return response.json({
      res: true,
      message: "registro insertado correctamente"
    })
  }

  async show ({ params, request, response }) {
    return await Producto.findOrFail(params.id)
  }

  // PUT
  async update ({ params, request, response }) {
    const input = request.all()

    await Producto.query().where('id', params.id).update(input)

    return response.json({
      res: true,
      message: "registro modificado correctamente"
    })
  }

  async destroy ({ params, request, response }) {
    const producto = await Producto.findOrFail(params.id)
    await producto.delete()

    return response.json({
      res: true,
      message: "registro eliminado correctamente"
    })
  }

  async validar(input, id = null){
    return await validateAll(input, {
      'nombre_producto': 'required|min:3|max:50',
      'description': 'required|min:3|max:100',
      'categoria':'required|min:4|max:20',
      'precio': 'required'
    })
  }

  async cargarFoto({request, response, params}){
    const avatar = request.file('avatar', {
      types: ['image'],
      size: '2mb'
    })
    const nombreArchivo = params.id + "." + avatar.extname
    await avatar.move('./public/fotografias', {
      name: nombreArchivo,
      overwrite: true
    })
    if (!avatar.moved()) {
      return response.status(422).send({
        res: false,
        message: avatar.error()
      })
    }
    const producto = await Producto.findOrFail(params.id)
    producto.url_foto = nombreArchivo
    await producto.save()

    return response.json({
      res: true,
      message: 'foto registrada correctamente'
    })
  }

  async verFoto({ params, response }) {
    const filepath = Helpers.publicPath('fotografias/' + params.filename)
    return response.download(filepath)
  }
}

module.exports = ProductoController
